'use strict';

const mongoose = require("mongoose"),
      express = require('express'),
      fetch = require('node-fetch'),
      app = express(),
      fs = require('fs');

//Routes
const imagesearchRoutes = require("./routes/imgsearch");
const historyRoutes = require("./routes/history");


//Models
const Search = require("./models/searchSchema")




if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));
const url = process.env.DATABASEURLTD
console.log(process.env.DATABASEURLTD);
// || "mongodb://localhost/image_search_app"
mongoose.connect(url);

app.use(imagesearchRoutes);
app.use(historyRoutes);

// Respond not found to all the wrong routes
app.use(function(req, res, next) {
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500).type('txt').send(err.message || 'SERVER ERROR');
  }
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});
