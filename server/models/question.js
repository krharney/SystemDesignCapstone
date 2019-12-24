const mongoose = require("mongoose");
const db = mongoose.connection;
const model = require("./model.js");

module.exports = {
  getQuestion: productId => {
    let returnObj = {};
    return db
      .collection("questions")
      .find({ product_id: productId })
      .project({
        _id: 0,
        question_id: 1,
        question_body: 1,
        question_date: 1,
        asker_name: 1,
        question_helpfulness: 1,
        reported: 1
      })
      .toArray()
      .then(questions => {
        returnObj["results"] = questions;
        let innerPromises;
        let promises = returnObj["results"].map(question => {
          let questionId = Number(question.question_id);
          return db
            .collection("answers")
            .find({ question_id: questionId })
            .project({
              _id: 0,
              id: 1,
              body: 1,
              date: 1,
              answerer_name: 1,
              helpfulness: 1
            })
            .toArray()
            .then(answers => {
              question["answers"] = {};
              innerPromises = answers.map(answer => {
                return db
                  .collection("photos")
                  .find({ answer_id: answer.id })
                  .project({
                    _id: 0,
                    url: 1
                  })
                  .toArray()
                  .then(photos => {
                    photos = photos.map(photo => photo.url);
                    question["answers"][answer.id] = answer;
                    question["answers"][answer.id].photos = photos;
                  })
                  .catch(err => console.log(err));
              });
              return Promise.all(innerPromises);
            })
            .catch(err => {
              console.log(err);
            });
        });
        return Promise.all(promises).then(() => {
          return returnObj;
        });
      })
      .catch(err => console.log(err));
  },
  postQuestion: req => {
    return db
      .collection("questions")
      .count()
      .then(count => {
        model.Question.create(
          {
            question_id: count + 1,
            product_id: Number(req.params.product_id),
            question_body: req.body.body,
            question_date: new Date(),
            asker_name: req.body.name,
            asker_email: req.body.email,
            reported: 0,
            question_helpfulness: 0
          }
          // function(err, data) {
          //   if (err) {
          //     console.log(err);
          //     res.sendStatus(500);
          //   } else res.sendStatus(201);
          // }
        );
      });
  }
};
