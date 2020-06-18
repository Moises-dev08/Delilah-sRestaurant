// LIBRARIES
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sequelize = require('../appRoutes/mySequelize');
const signature = 'my_secret_password';

// PATH  '/update/orders'          
 
 router.patch('/orders', async (req, res) => {  
    if (!req.query.token) { res.status(400).send('Error: You need a token') }
    
    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });

    if (!req.body.id, !req.body.status) {
        res.status(501).send('Error: Missing parameters');
        return;
    }

    let statusValidation;

    if (req.body.status == 'NEW '|| req.body.status == 'IN PROCESS' || req.body.status == 'SENDED '|| req.body.status == 'CANCELED'
        || req.body.status == 'DELIVERED') { statusValidation = true } else { res.status(406).send('Error: Wrong parameters')} 
    if (customer.user_type === 'admin' || statusValidation === true) {
        let update = await sequelize.query('UPDATE orders SET status = ? WHERE id = ?', 
                { replacements: [req.body.status, req.body.id] })
                .then(function(result) {
                    return result;
                }); 
        res.status(201).send('Your order has been succesfully updated');

    } else {res.status(500).send('Error: The user has no permission to perform this action');}   
});

// PATCH  '/update/products'            

router.patch('/products', async (req, res) => {  
    if (!req.query.token) { res.status(400).send('Error: You need a token') }
    
    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });
    
    let administratorValidation = (customer.user_type === 'administrator');
    
    if (administratorValidation !== true || !req.body.id || !req.body.field || !req.body.value) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (req.body.id && (req.body.field == 'product_name' || req.body.field == 'price' || req.body.field == 'image_url') && req.body.value){
         let updateData = await sequelize.query('UPDATE products set '+ req.body.field +' = ? where id = ?',
            { replacements: [req.body.value, req.body.id] })
            .then(function(result){
                return result;
            });
            res.status(201).send('Product has been succesfully updated');
        } else { return}
});

// PATCH  '/update/users'

router.patch('/users', async (req, res) => {   
    if (!req.query.token) { res.status(400).send('Error: You need a token') }
    
    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });
    
    let administratorValidation = (customer.user_type === 'administrator');

    if (administratorValidation !== true || !req.body.id || !req.body.field || !req.body.value) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (req.body.id && (req.body.field == 'user_name' || req.body.field == 'last_name' 
                || req.body.field == 'user_name' || req.body.field == 'email' || req.body.field == 'phone' 
                || req.body.field == 'adress' || req.body.field == 'user_type' || req.body.field == 'password' ) && req.body.value){
        let updateData = await sequelize.query('UPDATE customers set '+ req.body.field +' = ? where id = ?',
            { replacements: [req.body.value, req.body.id] })
            .then(function(result){
                return result
            });
            res.status(201).send('The user has been succesfully update');
    } else { res.status(500).send('Error: Missing or invalid parameters'); }
});

// PATCH  '/update/newAdministrator'

router.patch('/newAdministrator', async (req, res) => {   
    if (!req.query.token) { res.status(400).send('Error: You need a token') }
    
    let customer = jwt.verify(req.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });
    
    let administratorValidation = (customer.user_type === 'administrator');
    
    if (administratorValidation !== true || !req.body.id || !req.body.field || !req.body.value) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (req.body.id && (req.body.field == 'user_type') && req.body.value){
        let updateData = await sequelize.query('UPDATE customers set '+ req.body.field +' = ? where id = ?',
            { replacements: [req.body.value, req.body.id] })
            .then(function(result){
                return result
            });
            res.status(201).send('The user has been succesfully update');
    } else { res.status(500).send('Error: Missing or invalid parameters'); }
});

 








// EXPORT MODULE
module.exports = router 