const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const app = express();
const PORT = process.env.PORT || 8888;

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin"
  },
  {
    id: 2,
    username: "guest",
    password: "guest"
  }
];
app.use(bodyParser.json());

app.get("/ressources", (req, res) => {
  res.status(200).send("public ressources, you can see this ! ");
});
const jwtCheck = expressJwt({ secret: process.env.SECRET_KEY });

app.get("/ressources/secret", jwtCheck, (req, res) => {
  res.status(200).send("you have special access if you can see this ! ");
});
app.get("/status", (req, res) => {
  const localtime = new Date().toLocaleDateString();
  res.status(200).send(`your server time is ${localtime}`);
});
app.get("*", (req, res) => {
  res.status(404).send("this route does not exist");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("you need a username and password");
    return;
  }
  const user = users.find(
    user => user.userName === username || user.password === password
  );
  if (!user) {
    req.status(401).send("User not found !");
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.SECRET_KEY,
    { expiresIn: "3 hours" }
  );

  res.status(200).send({ accesToken: token });
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
