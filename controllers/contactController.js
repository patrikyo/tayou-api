const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

const contact_create = (req, res) => {
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
};

module.exports = contact_create;
