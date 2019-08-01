const express = require('express')
const fetch = require('node-fetch');
const app = express()
const cors = require('cors')
const port = 3000

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());


app.get('*', (req, res) => {
    var fullUrl = req.originalUrl;
    console.log(fullUrl);
    fetch('https://dev-api.truist.com' + fullUrl, {method: 'GET', headers: {
        'Authorization': req.headers.authorization,
    }})
    .then(resp=> resp.text()).then(body => {
        res.send(body);
    }) ; 
});

app.post('*', (req, res) => {
    var fullUrl = req.originalUrl;
    console.log(fullUrl);
    fetch('https://dev-api.truist.com' + fullUrl, {method: 'POST', body: JSON.stringify(req.body), headers: {
        'Authorization': req.headers.authorization,
        'Accept': req.headers.accept,
        //'Origin': 'http://localhost:4200',
        'Content-Type': 'application/json',
        //'Referer': 'http://localhost:4200/donate/confirm',
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
    }})
    .then(resp=> resp.text()).then(body => {
        res.send(body);
    }) ; 
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))   
