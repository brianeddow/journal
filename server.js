import 'dotenv/config.js';

import express from 'express';
import path from 'path';
import flash from 'express-flash';
import expressSession from 'express-session';
import ConnectSQLite from 'connect-sqlite3';
import bcrypt from 'bcrypt';
import passport from 'passport';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import updateEntries from './client/src/db_actions/updateEntries.js';
import writeUser from './client/src/db_actions/createUser.js';
import table from './client/src/db_actions/table.js';
import randomstring from 'randomstring';
import { v4 as uuid } from 'uuid';
import { checkAuthenticated, checkNotAuthenticated } from './auth.js';
import initializePassport from './passportConfig.js';

const SQLiteStore = ConnectSQLite(expressSession);

// grabs Users from Dynamo
let Users;
const loadUsers = async () => {
  try {
    const _USERS = "users";
    Users = await table({ TableName: _USERS });
    Users = JSON.parse(JSON.stringify(Users.Items));
  } catch (e) {
    Users = `error in loadUsers() -- ${e}`;
  }
}
loadUsers();

initializePassport(
  passport,
  email => Users.find( user => user.email_address === email),
  id => Users.find( user => user.user_id === id)
)

const app = express();
const PORT = process.env.PORT || 3000;

// define custom __dirname to use in express.static call
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// express set/use rules
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: (30 * 86400 * 1000),
  store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// routes
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
})

app.post('/register', (req, res) => {
  try {
    const registerNewUser = async () => {
      const { email, password } = req.body;
      const table = "users";
      const hashedPassword = await bcrypt.hash(password, 10);
      var user_input = {
        "email_address": email,
        "user_id": uuid(),
        "password": hashedPassword,
        "entries": {}
      }
      var params = {
        TableName: table,
        Item: user_input
      };
      writeUser(params);
      res.redirect('/login');
    }
    registerNewUser();
  } catch (e) {
    console.log(`error in /register (POST) -- ${e}`);
  }
})

app.get('/login', checkNotAuthenticated, async (req, res) => {
  res.render('login.ejs');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    // check req object here
  }
)

app.get('/', checkAuthenticated, (req, res) => {
  res.sendFile('index.html')
})

app.get('/newEntry', checkNotAuthenticated, (req, res) => {
  res.render('newEntry');
})

app.post('/submitEntry', (req, res) => {
  let { body: { id, entry, keywords, mood, title }} = req;
  // let journal_input = {
  //   // user id at req.body.id (which is email address)
  //   "index": "29", // use UUID npm package here
  //   "email_address": "example@yahoo.com",
  //   "keywords": req.body.keywords,
  //   "title": req.body.title,
  //   "date": date.toDateString(), <-- date without time
  //   "mood": req.body.mood,
  //   "entry": req.body.entry
  // }

  updateEntries(id,randomstring.generate({charset:'alphabetic'}),{
    date: new Date().toString(),
    entry: entry,
    keywords: keywords,
    mood: mood,
    title: title
  })

  res.redirect('/newEntry');
})

app.get('/user', checkAuthenticated, (req, res) => {
  let { session: { passport: { user: { id }}}} = req;
  const _UID = id;
  res.send({ _UID });
})

app.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/login');
  })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));