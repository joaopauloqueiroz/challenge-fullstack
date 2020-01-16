const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect mongoose
mongoose.connect(
  "mongodb+srv://ideas:200*technology@cluster0-jqlte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true  }
);

app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});