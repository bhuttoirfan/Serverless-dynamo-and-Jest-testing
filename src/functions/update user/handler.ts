import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import { DynamoDB } from '../../libs/dynamodb';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
// import schema  from './schema';
// ValidatedEventAPIGatewayProxyEvent<typeof schema>
export const updateUser: Handler = async (event) => {
  try {

    const email = event.body.email;
    let name, password;

    const get_user_params = {
      TableName: 'User-Table-Irfan',
      Key: { email: email }
    }
    const user = await DynamoDB.getUser(get_user_params);
    event.body.userName ? name = event.body.userName : name = user.Item.userName;
    event.body.password ? password = event.body.password : password = user.Item.password;

    const params = {
      TableName: 'User-Table-Irfan',
      Key: { email: email },
      UpdateExpression: "set userName= :name, password= :password ",
      ExpressionAttributeValues: {
        ":name": name,
        ":password": password
      }
    }

    await DynamoDB.updateUser(params);

    return formatJSONResponse({
      message: 'User successfully updated'
    });
  } catch (err) {
    console.log(err);
  }
}

export const main = middyfy(updateUser);
