const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const nodemailer = require("nodemailer");

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
    .then((result) => {
      res.json(result);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "patrikyoussef@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "patrikyoussef@gmail.com",
        to: "patrik_youssef@hotmail.com",
        subject: `ansökan till tayo ${req.body.name}`,
        text: req.body.message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.send("Email sent");
        }
      });
    })
    .catch((err) => console.log("misslyckades"));
  console.log("req", req.body);
});
