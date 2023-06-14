import AWS from "aws-sdk";
import awsConfig from '../awsConfig.js';
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = async (params) => {
    
    try {
        let results = await docClient.put(params).promise();
        console.log('user written',results);
    } catch (e) {
        console.log("error",e);
    }
}

export default save;