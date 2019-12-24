const mongoose = require("mongoose");
const question = require("../models/question.js");
// mongoose.connection.on("connected", function() {
//   console.log("Mongoose default connection is open");
// });

const db = mongoose.connection;

const controller = {
  getQuestionById: function(req, res) {
    question
      .getQuestion(Number(req.params.product_id))
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err));
  },
  postQuestion: function(req, res) {
    question
      .postQuestion(req)
      .then(data => res.sendStatus(200))
      .catch(err => console.log(err));
  }, 
  getAnswers: function(req, res){},
  postAnswer: function(req, res){}, 
  markQuestionHelpful: function(req, res){}, 
  reportQuestion: function(req, res){}, 
  markAnswerHelpful: function(req, res){}, 
  reportAnswer: function(req, res){}
};

module.exports = controller;
