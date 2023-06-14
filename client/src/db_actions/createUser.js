import write from './write.js';

let ID = 1;

var user_input = {
  "email_address": "w@w.com",
  "user_id": ID,
  "password": "3uey373y16et454tew02oi4u7t7y5y"
}

var params = {
  TableName: `users`,
  Item: user_input
};

export default write;