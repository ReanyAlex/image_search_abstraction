const mongoose = require('mongoose');


let searchSchema =  mongoose.Schema({
  term: String,
  when: String
});


module.exports = mongoose.model("Search", searchSchema);
