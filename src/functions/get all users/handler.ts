// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
// import schema from './schema';

import { DynamoDB } from '../../libs/dynamodb';
import { Handler } from 'aws-lambda';

export const getAllUser: Handler = async () => {
  try {
    
    const all_user = await DynamoDB.getAllUsers();
    return formatJSONResponse({
      message: all_user
    });
  } catch (error) {
    console.log(error);
  }

}

export const main = middyfy(getAllUser);
