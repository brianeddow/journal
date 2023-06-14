import AWS from "aws-sdk";
import awsConfig from "../awsConfig.js";
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const getItem = async (id) => {

  // to grab specific key/journal entry
  // really just need a specific params object
  // with defined primary and sortKey
  var params = {
    TableName: 'users',
    Key: {
      'email_address': id,
    },
    ProjectionExpression: 'entries'
  };

  try {
    let results = await docClient.get(params).promise();
    return results.Item.entries;
  } catch (e) {
    console.log('Error from getItem() in readItem.js ',e);
  }
}

getItem('y@y');

export default getItem;
