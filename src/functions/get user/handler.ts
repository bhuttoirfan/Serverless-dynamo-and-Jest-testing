// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
// import schema from './schema';

import { DynamoDB } from '../../libs/dynamodb';

// ValidatedEventAPIGatewayProxyEvent<typeof schema>
export const getUser: Handler  = async (event) => {
  try {
    const { email } = event.pathParameters;

    const params = {
      TableName: 'User-Table-Irfan',
      Key: { email: email }
    }

    const user = await DynamoDB.getUser(params);
    
    return formatJSONResponse({
      user
    });
  } catch (error) {
    console.log(error);
  }

}

export const main = middyfy(getUser);
