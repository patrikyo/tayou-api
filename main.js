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

app.get("/api/animal/:name", (req, res) => {
  //req.param syftar på path params
  if (req.params.name === "meowsalot") {
    res.json({
      name: "Meowsalot",
      species: "cat",
      photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg",
      bio: "This cat is great and very vocal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque.",
    });
  } else if (req.params.name === "barksalot") {
    res.json({
      name: "Barksalot",
      species: "dog",
      photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg",
      bio: "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    });
  } else if (req.params.name === "purrsloud") {
    res.json({
      name: "Purrsloud",
      species: "cat",
      photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum.",
    });
  } else {
    res.json("Animal not found.");
  }
});

app.get("/fake-search", (req, res) => {
  console.log(req.query); // detta är för query params dvs ?name=test"&lastname="rand"
  res.json("Thank you for your request.");
});

app.post("/api/contact", (req, res) => {
  const contact = new Contact({ name: "test", email: "test", message: "test" });
  contact
    .save()
    .then((result) => res.json(result))
    .catch((err) => console.log("misslyckades"));
  console.log("req", req.body);
});
