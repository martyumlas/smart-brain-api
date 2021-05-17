const express = require('express')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

//database connection
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'secret',
      database : 'smart_brain'
    }
});

//middleware
app.use(express.json())
app.use(cors())

// routes
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>  {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT || 3000
console.log(PORT)

//listen
app.listen(PORT, () => {
    console.log('app is running on port '+ PORT)
})

