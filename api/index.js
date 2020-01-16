const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})