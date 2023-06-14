const AWS = require("aws-sdk");
const awsConfig = require("../awsConfig");
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let remove = async (params) => {
    try {
      let results = await docClient.delete(params).promise();
      console.log('removed',results);
    } catch (e) {
      console.log('error',e);
    }
}

var params = {
    TableName: "journal",
    Key: {
        "user_id": "6"
    },
    ReturnValues: "ALL_OLD"
};

remove(params);

module.exports = remove;