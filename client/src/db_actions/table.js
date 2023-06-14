import AWS from "aws-sdk";
import awsConfig from "../awsConfig.js";
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let table = async (params) => {
  
  try {
    let results = await docClient.scan(params).promise();
    return results;
  } catch (e) {
    console.log('error in table.js',e);
  }
}
/*
  - Specify which items in the results are returned.
  FilterExpression: "Subtitle = :topic AND Season = :s AND Episode = :e",
  - Define the expression attribute value, which are substitutes for the values you want to compare.
  ExpressionAttributeValues: {
    ":topic": {S: "SubTitle2"},
    ":s": {N: 1},
    ":e": {N: 2},
  },
  - Set the projection expression, which are the attributes that you want.
  ProjectionExpression: "Season, Episode, Title, Subtitle",
  TableName: "EPISODES_TABLE"
*/
var params = {
  ExpressionAttributeValues: {
    ':entries': 'entries',
    ':user': 'user'
  },
  KeyConditionExpression: 'user = :user',
  FilterExpression: 'contains (email_address, :user)',
  TableName: "users"
};

// console.log(await table(params));

export default table;