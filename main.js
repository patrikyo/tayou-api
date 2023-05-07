const cors = require("cors");
const express = require("express");
const app = express();
const contacRoute = require("./routes/contact");
require("dotenv").config();
const mongoose = require("mongoose");

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
app.use(cors(corsOptions)); // allows localhost and tayo domain
app.use(express.json()); // allows req.body on json

app.use("/api", contacRoute);
