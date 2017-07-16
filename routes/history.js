'use strict';
const express = require("express"),
      router = express.Router();

const Search = require("../models/searchSchema");


router.route('/api/latest/imagesearch').get(function(req, res) {

Search.find({})
  .sort('-when')
  .limit(10)
  .exec(function(err, docs){
    res.send(docs)
   });

})

module.exports = router
