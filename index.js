const express = require("express");
const cookieParser = require('cookie-parser');
const csrf = require("csurf");

const app = express();

app.use(express.urlencoded({extended: true}));
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

app.post("/create", (req, res) => {
  const errors = validateInput(req.body);
  if (errors.length) {
    res.render("create", {errors});
  } else {
    const {firstName, lastName, email, password, confirmedPassword} = req.body;
    users.push({id: users.length+1, firstName, lastName, email});
    res.redirect('/');
  }
});

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function validateInput(data) {
  const {firstName, lastName, email, password, confirmedPassword} = data;
  const errors = [];
  if (!firstName) errors.push("Please provide a first name.");
  if (!lastName) errors.push("Please provide a last name.");
  if (!email) errors.push("Please provide a email.");
  if (!password) errors.push("Please provide a password.");
  if (password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.");
  }
  return errors;
}

module.exports = app;
