const mongoose = require("mongoose");
const question = require("../models/question.js");
// mongoose.connection.on("connected", function() {
//   console.log("Mongoose default connection is open");
// });

const db = mongoose.connection;

const controller = {
  getQuestionById: function(req, res) {
    question.getQuestion(Number(req.params.product_id))
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err));
  }
};

module.exports = controller;
