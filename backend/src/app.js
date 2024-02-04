const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/connection");
const Register = require("./models/user");

const port = process.env.PORT || 8800;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/registration", (req, res) => {
  res.render("registration");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/login", (req, res) => {
  res.render("index");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
app.get("/service_tab", (req, res) => {
  res.render("service_tab");
});

app.post("/registration", async (req, res) => {
  try {
    const password = req.body.password;
    const conpassword = req.body.conpassword;
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    console.log(`${loginEmail} and ${loginPassword}`);

    if (password === conpassword) {
      const resgisteruser = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });

      const registered = await resgisteruser.save();
      res.status(201).render("profile");

    } else {
        res.send("Re-enter the password");
    }
  } catch (error) {
      res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({email:email});

    if(useremail.password === password){
      res.status(201).render("profile");
    }else{
      res.send("Password not matching");
    }

  }catch(error){
    res.status(400).send("Invalid Email")
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
