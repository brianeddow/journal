import AWS from "aws-sdk";
import awsConfig from "../awsConfig.js";
AWS.config.update(awsConfig);

let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const createJournal = async (id) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "entry_id",
        AttributeType: "S",
      }, 
      // {
      //   AttributeName: "user_id",
      //   AttributeType: "S",
      // }
    ],
    KeySchema: [
      {
        AttributeName: "entry_id",
        KeyType: "HASH",
      },
      // {
      //   AttributeName: "user_id",
      //   KeyType: "RANGE",
      // }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: `journal_${id}`,
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  try {
    let results = await ddb.createTable(params).promise();
    console.log('table created',results);
  } catch (e) {
    console.log("error",e);
  }
}

createJournal(2);

export default createJournal;