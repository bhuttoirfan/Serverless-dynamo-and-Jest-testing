import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

import { DynamoDB } from '../../libs/dynamodb';

const getQueryResults: ValidatedEventAPIGatewayProxyEvent<typeof schema>  = async (event) => {
  try {
    const email = event.body.email;
    const password = event.body.password;
    const user_name = event.body.userName;

    /***** QUERY FORMAT */
    // {
    //   TableName: "Music",
    //   KeyConditionExpression: "Artist = :a and SongTitle = :t",
    //   ExpressionAttributeValues: {
    //       ":a": "No One You Know",
    //       ":t": "Call Me Today"
    //   }
    // }

    const login_params = {
      TableName: 'User-Table-Irfan',
      
      KeyConditionExpression : "email = :e",
      FilterExpression: "userName = :uName and password = :p",
      ExpressionAttributeValues: {
        ":uName": user_name,
        ":e": email,
        ":p": password
      }
    }

    const same_pass = {
      TableName: 'User-Table-Irfan',

      KeyConditionExpression : "email = :e",
      FilterExpression: "password = :p",
      ExpressionAttributeValues: {
        ":e": email,
        ":p": password
      }     
    }

    const login_user = await DynamoDB.runQuery(login_params);
    const result_same_pass = await DynamoDB.runQuery(same_pass)
    
    
    
    
    return formatJSONResponse({
      login_user,
      msg: "Users witg same passwords",
      result_same_pass
    });

  } catch (error) {
    console.log(error);
  }

}

export const main = middyfy(getQueryResults);
