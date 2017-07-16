'use strict';
const express = require("express"),
      router = express.Router(),
      fetch = require('node-fetch');

const Search = require("../models/searchSchema")


router.route('/').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
})

router.route('/api/imagesearch/*').get(function(req, res) {
  let api_key = '5718845-9e66a1a01955196d8ea6ee318'
  let search = req.params[0];
  let numPerPage = req.query.offset;

  // delete once copied below
  let newSearch = {
    term: search,
    when: new Date()
    };
  Search.create(newSearch, function(err, newsearch) {
    if (err) {
      console.log(err);
    } else {
      // res.redirect("/index")
    }
  })

  let url = `https://pixabay.com/api/?key=${api_key}&q=${search}&image_type=photo&per_page=${numPerPage}`

  //getting image result data and formatting into json
  fetch(url).then((res) => res.json()).then(function(json) {

    let jsonFormated = [];

    for (let i = 0; i < numPerPage; i++) {
      let siteUrl = json.hits[i].webformatURL,
        snippet = json.hits[i].tags,
        thumbnail = json.hits[i].previewURL,
        context = json.hits[i].pageURL

      jsonFormated.push({
        url: siteUrl,
        snippet: snippet,
        thumbnail: thumbnail,
        contect: context
      });
    }

    res.send(jsonFormated)

  });
});

module.exports = router
