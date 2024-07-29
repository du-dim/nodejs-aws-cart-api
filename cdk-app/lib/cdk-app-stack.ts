import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Создание VPC для RDS
    const vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 2, // Количество AZ для высокой доступности
    });

    // Создание Security Group для RDS
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'RDSSecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });

    rdsSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'Allow PostgreSQL traffic');

    // Создание секрета для хранения пароля RDS
    const dbPasswordSecret = new secretsmanager.Secret(this, 'DBPasswordSecret', {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'dbuser' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
      },
    });

    // Создание RDS инстанса
    const dbInstance = new rds.DatabaseInstance(this, 'PostgresInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_16_3 }), // Используйте доступную версию PostgreSQL
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO), // Используйте поддерживаемый тип экземпляра
      vpc,
      credentials: rds.Credentials.fromSecret(dbPasswordSecret),
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(7),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: 'NestServiceDB',
      securityGroups: [rdsSecurityGroup],
      publiclyAccessible: true,
    });

    // Создание Lambda функции
    const nestServiceLambda = new lambda.Function(this, 'NestServiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset('../dist'),
      environment: {
        DB_HOST: dbInstance.instanceEndpoint.hostname,
        DB_PORT: dbInstance.instanceEndpoint.port.toString(),
        DB_USERNAME: 'dbuser',
        DB_SECRET_NAME: dbPasswordSecret.secretName,
      },
      vpc,
    });

    // Разрешение доступа Lambda к секретам и RDS
    dbPasswordSecret.grantRead(nestServiceLambda);
    dbInstance.connections.allowDefaultPortFrom(nestServiceLambda);
    // dbInstance.grantConnect(nestServiceLambda)
    const api = new apigateway.RestApi(this, "NestServiceApi", {
      deploy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders:apigateway.Cors.DEFAULT_HEADERS,
      }
    });

    // Создание API Gateway и связывание с Lambda
    api.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(nestServiceLambda, { proxy: true }),
    });

    new cdk.CfnOutput(this, "NestServiceApiUrl", {
      value: api.url,
    });
  }
}
