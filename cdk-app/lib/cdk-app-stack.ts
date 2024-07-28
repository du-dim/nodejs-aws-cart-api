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
      databaseName: 'CartServiceDB',
    });

    // Создание Lambda функции
    const cartServiceLambda = new lambda.Function(this, 'CartServiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'cart-lambda.handler',
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
    dbPasswordSecret.grantRead(cartServiceLambda);
    dbInstance.connections.allowDefaultPortFrom(cartServiceLambda);

    // Создание API Gateway и связывание с Lambda
    new apigateway.LambdaRestApi(this, 'CartServiceApi', {
      handler: cartServiceLambda,
      proxy: true,
    });
  }
}
