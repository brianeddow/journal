import * as _save from './write.js';

// grab user ID from resource
let ID = 1;

var journal_input = {
  "index": "7",
  "email_address": "example@yahoo.com",
  "keywords": "confusionssss",
  "title": "whuuuuh",
  "date": new Date().toString(),
  "mood": "spinning",
  "entry": "this is difficult"
}
var params = {
  TableName: `journal_${ID}`,
  Item: journal_input
};

_save(params);