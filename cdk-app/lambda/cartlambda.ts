import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { createNestServer } from '../../dist/src/main'; 
import { SecretsManager } from 'aws-sdk';

const expressApp = express();
let cachedServer: ReturnType<typeof awsServerlessExpress.createServer>;

const bootstrapServer = async (): Promise<ReturnType<typeof awsServerlessExpress.createServer>> => {
  const app = await createNestServer(expressApp);
  return awsServerlessExpress.createServer(expressApp);
};

// Функция для получения секрета из AWS Secrets Manager
const getSecretValue = async (secretName: string) => {
  if (!secretName) {
    throw new Error('Secret name is undefined');
  }

  const client = new SecretsManager();
  const secretValue = await client.getSecretValue({ SecretId: secretName }).promise();

  if ('SecretString' in secretValue && secretValue.SecretString) {
    return JSON.parse(secretValue.SecretString);
  }
  
  throw new Error('SecretString is undefined or Secret not found');
};

export const handler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!cachedServer) {
    const secretName = process.env.DB_SECRET_NAME;
    if (!secretName) {
      throw new Error('DB_SECRET_NAME is not defined in environment variables');
    }

    const secrets = await getSecretValue(secretName);
    console.log(secrets.password)
    process.env.DB_PASSWORD = secrets.password;   
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE').promise;
};
