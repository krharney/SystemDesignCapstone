const express = require("express");
const mongoose = require("mongoose");

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));