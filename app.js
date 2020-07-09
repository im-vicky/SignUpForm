const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started at port ${3000}`);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/9898457a8e";

  const options = {
    method: "POST",
    auth: "vicky:559b791a57e8026a857c269275c2fb3c-us10",
  };

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(data);
    });
  });
  request.write(jsonData);
  request.end();
  res.redirect("/");
});
