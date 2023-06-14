const _fetchOneByKey = require("./db_actions/read.js");
const _save = require("./db_actions/write.js");
const _modify = require("./db_actions/update.js");
const _remove = require("./db_actions/delete.js");

let ID = 0;

var journal_input = {
  "index": ++ID,
  "user_id": "1",
  "email_address": "brian.eddow@gmail.com",
  "keywords": "confusion",
  "title": "whuuuuh",
  "date": new Date().toString(),
  "mood": "spinning",
  "entry": "this is difficult"
};

var user_input = {
  "user_id": "1",
  "email_address": "example@yahoo.com"
}
var params = {
  TableName: "journal",
  Item: journal_input
};

_save(params);