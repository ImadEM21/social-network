const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost/social-network', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(() => console.log("connexion à MongoDB échouée"));

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', postRoute);
app.use('/api', userRoute);


module.exports = app;