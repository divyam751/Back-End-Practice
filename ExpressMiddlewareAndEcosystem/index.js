const express = require("express");
const fs = require("fs");

const app = express();

//Middelware

// function logger(req, res, next) {
//   console.log(req.method + " " + req.url);
//   next();
// }

// app.use(logger);

//=============Custom middleware===============

function timer(req, res, next) {
  let startTime = new Date().getTime();
  next();
  let endTime = new Date().getTime();
  console.log(req.method + " " + req.url + " ");
  console.log(endTime - startTime);
}
app.use(timer);

//====================================================
app.get("/", (req, res) => {
  res.send("home route");
});
app.get("/details", (req, res) => {
  fs.readFile("./bigFile.txt", "utf-8", (err, data) => {
    if (err) {
      return res.send("somethig went wrong");
    }
    res.send(data);
  });
});

app.listen(8500, () => {
  console.log("Server started on port 8500");
});
