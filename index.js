const express = require("express");
const cookieParser = require('cookie-parser');
const csrf = require("csurf");

const app = express();
app.use(cookieParser());

const csrfProtection = csrf({cookie: true});
app.use(csrfProtection);

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render('index',{users});
});

app.get("/create", (req, res) => {
  res.render('create', {csrfToken: req.csrfToken()});
});

// app.post("/create", (req, res) => {
//   res.render('create', {csrfToken: req.csrfToken()});
// });

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
