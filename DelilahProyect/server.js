// LIBRARIES
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require ('sequelize');

// IMPORT ROUTES
const gettersRoute = require('./appRoutes/get')
const logInRoute = require('./appRoutes/logIn')
const signInRoute = require('./appRoutes/signIn')
const updateRoute = require('./appRoutes/upDate')
const deleteRoute = require('./appRoutes/deleter')

// APP USE
app.use(cors());
app.use(bodyParser.json());
app.use('/get',gettersRoute);
app.use('/api',logInRoute);
app.use('/signIn',signInRoute);
app.use('/update',updateRoute);
app.use('/deleter',deleteRoute);

// SERVER
app.listen(3030, () => {
    console.log("Server initiated...");
});

