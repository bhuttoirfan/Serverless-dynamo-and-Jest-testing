import * as AWS from 'aws-sdk';

const dynamo_db = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
});


export const DynamoDB = {
    async addUser (params) {

        await dynamo_db.put(params).promise();
    },

    async updateUser(params) {
        
        await dynamo_db.update(params).promise();
    },

    async getUser(params) {
        const user = await dynamo_db.get(params).promise();
        return user;
    },

    async deleteUser(params) {
        await dynamo_db.delete(params).promise();
    },

    async getAllUsers() {
        const all_users = await dynamo_db.scan({TableName: 'User-Table-Irfan'}).promise();
        return all_users;
    },

    async runQuery(params) {
        const user = await dynamo_db.query(params).promise();
        return user;
    }
}

