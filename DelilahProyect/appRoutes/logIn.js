// LIBRARIES
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const signature = 'my_secret_password';
const sequelize = require('../appRoutes/mySequelize');
const hasher = require('./Hash');


// PATH  '/api/logIn'

router.post('/logIn', async (req, res) => {
    let user_nameInput = req.body.user_name;
    let passwordInput = req.body.password;

    let data = await sequelize.query('SELECT * FROM customers where user_name = ?',
        { replacements: [user_nameInput], type: sequelize.QueryTypes.SELECT }
    ).then(res => {
        return (res);
    });

    if (data[0] == null) {
        res.status(400).send("Error: Incorrect user name or password. Please try again");
    } else if (data[0].user_name !== user_nameInput) {
        res.status(400).send("Error: Incorrect user name or password. Please try again");
    } else {
        let validation = await hasher.passwordTest(passwordInput, data[0].password);
        if (validation === true) {
            console.log(data[0]);
            let toSign = {
                "id": data[0].id,
                "user_name": data[0].user_name,
                "user_type": data[0].user_type,
                "password": data[0].password
            };
            let signed = await jwt.sign(toSign, signature);
           
            res.json('Token:' + signed );
        } else { res.status(400).send("Error: Incorrect user name or password. Please try again"); }
    }
});

// EXPORT MODULE
module.exports = router;
