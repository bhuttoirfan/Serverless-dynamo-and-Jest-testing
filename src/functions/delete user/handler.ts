import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';

import { DynamoDB } from '../../libs/dynamodb';

export const deleteUser: Handler = async (event) => {
  try {
    const { email } = event.pathParameters;

    const params = {
      TableName: 'User-Table-Irfan',
      Key: { email: email }
    }

    await DynamoDB.deleteUser(params);

    return formatJSONResponse({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.log(error);
  }

}

export const main = middyfy(deleteUser);
