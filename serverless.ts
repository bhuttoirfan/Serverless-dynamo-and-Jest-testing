import type { AWS } from '@serverless/typescript';

import { 
  addUser, 
  deleteUser, 
  getAllUsers, 
  getUser, 
  getQueryResults, 
  updateUser 
} from '@functions/index'; 

const serverlessConfiguration: AWS = {
  service: 'crud-dynamo-offline',
  frameworkVersion: '2',
  custom: {

    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        migrate: true,
        seed: true
      }
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },

  resources: {
    Resources: {
      userTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "User-Table-Irfan",
          AttributeDefinitions: [
            {AttributeName: "email", AttributeType: "S"}
          ],
          KeySchema: [
            {AttributeName: "email", KeyType: "HASH"}
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  },

  // import the function via paths
  functions: { addUser, updateUser, getUser,deleteUser, getAllUsers, getQueryResults },
};

module.exports = serverlessConfiguration;
