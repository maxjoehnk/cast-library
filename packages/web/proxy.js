const express = require('express');
const Bundler = require('parcel');
const proxy = require('http-proxy-middleware');

const bundler = new Bundler(__dirname + '/src/index.html');
const app = express();

app.use('/api', proxy('http://localhost:8080/api'));
app.use(bundler.middleware());

app.listen(1234);