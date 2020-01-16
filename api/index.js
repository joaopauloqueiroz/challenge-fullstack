const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require('./src/routes/routes')

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json())

//connect mongo
mongoose.connect(
  "mongodb+srv://ideas:200*technology@cluster0-jqlte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true  }
);
app.use(routes)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});