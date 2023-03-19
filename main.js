const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contact");

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWROD}@tayo.psao2tn.mongodb.net/tayo?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((res) => {
    app.listen(process.env.PORT || 9000);
    console.log("lyckades anslutna till DB");
  })
  .catch((err) => console.log(err, "misslyckades ansluta till DB"));
var corsOptions = {
  origin: ["http://localhost:3000", "https://tayo.onrender.com"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); // allows all domains
app.use(express.json()); // allows req.body on json

app.post("/api/contact", (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  contact
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log("misslyckades"));
  console.log("req", req.body);
});
