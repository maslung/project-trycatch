const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//TAHAP 1
const mysql= require('mysql')
const session = require('express-session')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project1'
});

// Definisi environtmen secara global (.env)
require('dotenv').config(); 

//TAHAP 2 SESSION
app.use(session ({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

// Convert data ke JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Memanggil route karyawan & jabatan
const appRoute = require('./src/routers');
const { user } = require('./src/configs/database');
app.use('/', appRoute);

app.post('/login', function (req, res) {

  let username = req.body.username;
  let password = req.body.password;
   
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
    function (error, results, fields){
      
      if (error) throw error;
      if (results.length > 0) {

        req.session.loggedin  = true;
        req.session.username  = username;
        req.session.password  = password;

        res.send({
          success: true,
          message: 'Login Berhasil !',
        });
      } else {
        res.send({
          succsess: false,
          message: 'Login Gagal !'
        });
      }
    } 

    )}else{
      res.send({
        success: true,
        message:'Please enter Username and Password'
      });
    }

});

// Menjalankan server sesuai dengan port yang terdaftar di .env (8080)
app.listen(process.env.APP_PORT, () => {
  console.log(`Server Berjalan http://localhost:${process.env.APP_PORT}`);
});
