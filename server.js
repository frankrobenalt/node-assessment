const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//creating own live-server - need to add '/public/' folder and index.html inside of it and inside public folder put any angular folders, etc
app.use(express.static(__dirname + '/public/'));

//using express-session for secret - create config.js and put secret in it - go to gitignore and put config.js
// app.use(session({
//   secret,
//   saveUninitialized: true,
//   resave: true
// }))

const usersCtrl = require('./usersCtrl.js');

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:usersid', usersCtrl.getUsersId);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:userType', usersCtrl.getUserByType);
app.put('/api/users/:usid', usersCtrl.changeUser);
app.post('/api/users', usersCtrl.addUser);
app.delete('/api/users/:userId', usersCtrl.deleteUser);



app.listen(port, ()=>{
    console.log(`listening on ${port}`);
  })