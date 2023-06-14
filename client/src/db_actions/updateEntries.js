import AWS from "aws-sdk";
import awsConfig from '../awsConfig.js';
import randomstring from 'randomstring';
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let updateEntries = (email,entry_id,entry) => {
    
    var params = {
      TableName: "users",
      Key: { "email_address": `${email}` },
      UpdateExpression: `set entries.${entry_id} = :entry`,
      ExpressionAttributeValues: {
        ":entry": { ...entry }
      },
      ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("entries::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("entries::update::success "+JSON.stringify(data) );
        }
    });
}

// let date = new Date();

// updateEntries('y@y',randomstring.generate({charset:'alphabetic'}),{
//   date: date.toDateString(),
//   email_address: 'y@y',
//   entry: "It's been on my mind...",
//   keywords: ['unsure','cyclical thoughts','seeking groundedness'],
//   mood: 'quizzical',
//   title: 'oh man'
// })

export default updateEntries;