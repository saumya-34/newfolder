const express = require('express')();
const expressClass = require('express');
const bodyparser = require('body-parser');
const port = 3000;
const router = require('./router/student.js');

express.use(bodyparser.json());

express.use('/student',router);
express.listen(port);

