const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json()); //for parse and after this will not get body as undefind
app.use(express.text());

app.get("/", (req, res) => {
  res.send("you are at home page");
});

app.get("/lecture", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.send("you are at lecture page");
});

app.post("/lecture", (req, res) => {
  console.log(req.body);
  res.send("lecture notes...");
});

app.get("/posts", (req, res) => {
  fs.readFile("./posts.json", "utf-8", (err, posts) => {
    if (err) {
      return res.send("Something went wrong please try again later");
    }
    res.send(posts);
  });
});

// Query and Param

app.get("/welcome", (req, res) => {
  //   console.log(req.query);
  const user = req.query.q || "user";
  const eligible =
    req.query.age > 18 ? "eligible" : "not eligible" || "not eligible";
  res.send("Welcome" + " " + user + " " + eligible);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
