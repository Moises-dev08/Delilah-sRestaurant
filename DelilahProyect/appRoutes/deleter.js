// LIBRARIES
const deleter = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('../appRoutes/mySequelize');
const signature = 'my_secret_password';

// DELETER USE
deleter.use(bodyparser.json());

// PATH  '/delete/user'  #The token must belong to the Admin.

deleter.delete('/user', async(req,res)=> {
    if (!req.query.token) { res.status(400).send('Error: You need a token.'); }
        let customer = jwt.verify(req.query.token, signature, function(err, user) {
            if (err) { res.status(401).send({ error: 'Invalid token' })
            } else { return (user) ;}
    });

    let userId = req.body.id;
    let administratorValidation = (customer.user_type === 'administrator')

    if (administratorValidation !== true || !userId) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (userId) {
        let data = await sequelize.query('DELETE FROM customers WHERE id = ?',
        { replacements: [userId] })
        .then(function(result) {
            return result;
    });
        res.status(200).send('User deleted');
    } else {
        res.status(500).send('Missing or invalid parameters');
    };
});

// PATH  '/delete/product'  #The token must belong to the Admin.

deleter.delete('/product', async(req,res)=> {
    if (!req.query.token) { res.status(400).send('Error: You need a token.'); }
        let customer =  jwt.verify(req.query.token, signature, function(err, user) {
            if(err) { res.status(401).send({ error: 'Invalid token' })
            } else { return(user) ;}
    });

    let productId = req.body.id;
    let administratorValidation = (customer.user_type === 'administrator');

    if (administratorValidation !== true || !productId ) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (productId) {
        let data = await sequelize.query('DELETE FROM products WHERE id = ?',
        { replacements: [productId] })
        .then(function(result) {
            return result;
    });
        res.status(200).send('Product deleted');
    } else {
        res.status(500).send('Missing or invalid parameters');
    };
});

// PATH  '/delete/order'  #The token must belong to the Admin.

deleter.delete('/order', async(req,res)=> {
    if(!req.query.token) { res.status(400).send('Error: You need a token.'); }
        let customer =  jwt.verify(req.query.token, signature, function(err, user) {
            if (err) { res.status(401).send({ error: 'Invalid token' })
            } else { return(user) ;}
    });

    let orderId = req.body.id;
    let administratorValidation = (customer.user_type === 'administrator');

    if (administratorValidation !== true || !orderId ) {
        res.status(500).send('Error: Missing or invalid parameters');
    } else if (orderId) {
        let data = await sequelize.query('DELETE FROM orders WHERE id = ?',
        { replacements: [orderId] })
        .then(function(result) {
            return result;
    });
        res.status(200).send('Order deleted');
    } else {
        res.status(500).send('Missing or invalid parameters');
    };
});

// EXPORT MODULE
module.exports = deleter