// LIBRARIES
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('../appRoutes/mySequelize');
const signature = 'my_secret_password';

// ROUTER USE
router.use(bodyparser.json());

// PATHS ('/users', '/products', '/product', '/orders', '/ordersbyproducts', '/orderbyproduct')
router.get('/*', async (req, res) => {
    let reqId = req.body;
    if (!req.query.token) { res.status(400).send('Error: You need a token.'); }
    if ( req.path == '/users' || req.path == '/products' || req.path == '/product' 
        || req.path == '/orders' || req.path == '/ordersbyproducts' || req.path == '/orderbyproduct') {
        const result = await getAll(req, reqId);
        if (result) {
            res.json(result);
            return
        }
        else {
            res.status(400).send('Bad request / No result.');
        }
    } else {
        res.status(400).send('Error: Bad request.');
        return; 
    }  
});

async function getAll(endPoints, reqId) {
    let data;
    let endpoint = endPoints.path;

    let customer = jwt.verify(endPoints.query.token, signature, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Invalid token' })
        } else { return (user); }
    });

    let adminValidation = (customer.user_type);
   
    if (endpoint == '/users') { 
        if (adminValidation == "admin") {
            data = await sequelize.query('SELECT * FROM customers',
                { type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
        } else {
            data = await sequelize.query('SELECT * FROM customers WHERE id = ?',
                { replacements: [customer.id], type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
            }
        return data;
    } else if (endpoint == '/products') { 
            data = await sequelize.query('SELECT * FROM products',
                { type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
            return data;
    } else if (endpoint == '/product') {  
            data = await sequelize.query('SELECT * FROM products WHERE id = ?',
                { replacements: [reqId.id], type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
            return data;    
    } else if (endpoint == '/ordersbyproducts') { 
            data = await sequelize.query('SELECT * FROM orders_by_products',
                { type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
            return data;
    } else if (endpoint == '/orderbyproduct') { 
            data = await sequelize.query('SELECT * FROM orders_by_products WHERE order_id = ?',
                { replacements: [reqId.order_id], type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
            return data;   
    } else if (endpoint == '/orders') { 
        if (adminValidation == "admin") {
            data = await sequelize.query('SELECT * FROM orders',
                { type: sequelize.QueryTypes.SELECT })
                .then(res => {
                    return (res);
                });
        } else {
            data = await sequelize.query('SELECT * FROM orders where CustomerID = ?', 
                { replacements: [customer.id], type: sequelize.QueryTypes.SELECT })
                .then(res => {
                     return (res);
                });
        }
             return data;
    } else {
        return
    }
}

// EXPORT MODULE
module.exports = router