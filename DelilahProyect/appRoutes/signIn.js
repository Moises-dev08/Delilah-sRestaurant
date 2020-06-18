// LIBRARIES
const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../appRoutes/mySequelize');
const router = express.Router();
const hasher = require('./Hash');
const signature = 'my_secret_password';

// PATH '/signIn/newUser'  #Create a new user

router.post('/newUser', async (req, res) => { 
    if (req.body.name == null || req.body.last_name == null || req.body.user_name == null || req.body.email == null
        || req.body.phone == null || req.body.adress == null || req.body.password == null || req.body.user_type == null) {
        res.status(500).send('Missing parameters.')
    }

    let checked = await validation(req.body.user_name, res);
    let administratorChecked = await AdministratorValidation(req.body.user_type, res);
    if (checked === true || administratorChecked === true) {
       let permission = await hasher.hash(req.body.password)
       createNewUser(req.body.name,req.body.last_name, req.body.user_name, req.body.email, req.body.phone,req.body.adress,req.body.user_type, permission);
       res.status(201).send('User registred.');
    } else { 
        res.status(400).send(checked); 
    }
});

// CREATE NEW USER FUNCTION  #Create a new user in the Data Base

async function createNewUser (name, last_name, user_name, email, phone, adress, user_type, password) {
    let data = await sequelize.query('INSERT INTO customers (name, last_name, user_name, email, phone, adress, user_type, password) VALUES (?,?,?,?,?,?,?,?)',
        {replacements: [name,last_name, user_name, email, phone, adress, user_type, password]})
        .then(function (result) {   
            console.log(result) 
    });
}
    
// VALIDATION FUNCTION  #validate (user_name) with the Data Base. 

async function validation(user_name, res) {
    let usernameOk;
    
    let data = await sequelize.query('SELECT * FROM customers where user_name = ?',
            { replacements: [user_name], type: sequelize.QueryTypes.SELECT })
            .then(res => {
                if (res[0] == null) { usernameOk = true } else { usernameOk = false }
                    return
                });
    
    if (usernameOk === false) { return res.status(400).send("User already registred")  } else { return true }
}    

// ADMINISTRATOR VALIDATION FUNCTION  #validate (user_type) with the Data Base. 

async function AdministratorValidation(user_type, res) {
    let usertypeOk;
    console.log(res[0]);
    console.log(res);
    
    let data = await sequelize.query('SELECT * FROM customers where user_type = ?',
            { replacements: [user_type], type: sequelize.QueryTypes.SELECT })
            .then(res => {
                if (res[0] == null) { usertypeOk = true } else { usertypeOk = false }
                    return
                });
    
    if (usertypeOk === false) { return res.status(400).send("Administrator already registred")  } else { return true }
}    


// PATH '/signIn/products'  #Upload products by the admin.

router.post('/products', async (req, res) => {
    if (!req.query.token) { res.status(400).send('Error: You need a token') }

    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });
    
    if (!req.body.name || !req.body.price || !req.body.image_url) {
        res.status(501).send('Error: Missing parameters');
    }
    if ( customer.user_type == 'admin') {
        let productsData = await sequelize.query('INSERT INTO products VALUES(null, ?, ?, ?)',
            { replacements: [req.body.product_name, req.body.price, req.body.image_url] })
            .then(function (result) {
                res.status(201).send('Your product has been succesfully uploaded');
            });
    } else {
        res.status(401).send('Invalid token' );
    }
});


// PATH  '/signIn/orders'  #Add new order by the user.

router.post('/orders', async (req, res) => {
    if (!req.query.token) { res.status(400).send('Error: You need a token') }
    
    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })            
        } else { return (user); }
    });
    
    if (!req.body.productId || !customer) { res.status(400).send('Error: Missing parameters'); }
    
    let products = req.body.productId;

    if (!products.length > 0) { res.status(400).send('Error: Not the right way to make an order'); }
    
    else {
        let today = new Date();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let orderData = await sequelize.query('INSERT INTO orders VALUES (null ,?, ?, ?, ?, ?)',
            { replacements: ['NEW', time, 'pending', customer.id, today] })
            .then(function (result) {
                    return result;
            });
        for (let i = 0; i < products.length; i++) {
            let productsData = await sequelize.query('INSERT INTO orders_by_products VALUES(null, ?, ?)',
                { replacements: [orderData[0], products[i]] })
                .then(function (result) {
                    return result;
                });
        }
        res.status(201).send('Your order has been succesfully registred.');
    }
});

// EXPORT MODULE
module.exports = router