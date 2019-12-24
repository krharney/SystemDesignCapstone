const express = require("express");
const mongoose = require("mongoose");
const dbURL = require("../config.js").dbURL;

//connect to db then server
const connectToMongo = () => {
  let tries = 0;
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(data => {
      console.log("CONNECTED TO MONGO");
      app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
      );
    })
    .catch(err => {
      console.log("NOT CONNECTED... TRYING AGAIN IN 5 SEC");
      tries++;
      if (tries < 25) setTimeout(connectToMongo, 5000);
    });
};
connectToMongo();

mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// middleware
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// router
const router = require("./routes.js");

const port = 8000;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", router);
