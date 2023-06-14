import AWS from "aws-sdk";
import awsConfig from "../awsConfig.js";
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = async (params) => {
  
  try {
    let results = await docClient.get(params).promise();
    return results;
  } catch (e) {
    console.log('Error from get() in read.js ',e);
  }
}

var params = {
    TableName: "journal_1",
    Key: {
        "index": "9"
    }
};

export default fetchOneByKey;