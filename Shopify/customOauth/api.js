const express = require('express');
const cluster = require('cluster');
const bodyParser = require('body-parser');
const {authorize,redirect} = require('./shopifyOauthHelper');

require('dotenv').config();

const port = 4000;

process.env.NODE_NO_WARNINGS = 1; 

let cCPUs = 1;


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    });

app.get('/api/shopify/authorize', async (req, res) => {
    return res.redirect(await authorize(req.query.shop));
})

app.get('/api/shopify/redirect', async (req, res) => {
    return res.json(await redirect(req.query.code, req.query.shop));
})
