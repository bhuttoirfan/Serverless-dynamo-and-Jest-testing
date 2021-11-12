
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import { DynamoDB } from '../../libs/dynamodb';

// import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
// import schema from '@functions/update user/schema';
// ValidatedEventAPIGatewayProxyEvent<typeof schema>

export const addUser: Handler  = async (event) => {
  try {
    const body = event.body;

    const params = {
      TableName: 'User-Table-Irfan',
      Item: {
        ...body
      }
    }

    await DynamoDB.addUser(params);

    return formatJSONResponse({
      message: 'User successfully added'
    });
  } catch (error) {
    console.log(error);
  }
  const body = event.body;

  const params = {
    TableName: 'User-Table-Irfan',
    Item: {
      ...body
    }
  }

  await DynamoDB.addUser(params);

  return formatJSONResponse({
    message: 'User successfully added'
  });
}

export const main = middyfy(addUser);

