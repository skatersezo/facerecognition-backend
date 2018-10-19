const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/Register');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');
const signin = require('./controllers/Signin');

// Check Heroku doc for stablishing the connection to DB
const db = knex({
        client: 'pg',
        connection: {
          connectionString : process.env.DATABASE_URL,
          ssl: true
        }
    });


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is working'));

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
}) 
