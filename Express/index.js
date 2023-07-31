const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json()); //for parse and after this will not get body as undefind
app.use(express.text());

app.get("/", (req, res) => {
  res.send("you are at home page");
});

// app.get("/lecture", (req, res) => {
//   // console.log(req.url);
//   // console.log(req.method);
//   res.send("you are at lecture page");
// });

// app.post("/lecture", (req, res) => {
//   console.log(req.body);
//   res.send("lecture notes...");
// });

// app.get("/posts", (req, res) => {
//   fs.readFile("./posts.json", "utf-8", (err, posts) => {
//     if (err) {
//       return res.send("Something went wrong please try again later");
//     }
//     res.send(posts);
//   });
// });

// Query and Param
// http://localhost:8000/welcome?q=masai&age=28
app.get("/welcome", (req, res) => {
  //   console.log(req.query);
  const user = req.query.q || "user";
  const eligible =
    req.query.age > 18 ? "eligible" : "not eligible" || "not eligible";
  res.send("Welcome" + " " + user + " " + eligible);
});
// app.get("/welcome", (req, res) => {
//   res.setHeader("Server", "Local Server");
//   res.send("welcome with header");
// });

//Params
//http://localhost:8000/lecture/5

// app.get("/lecture/:lecture_id", (req, res) => {
//   console.log(req.params);
//   // res.send("lecture notes for" + " " + req.params.lecture_id);
//   fs.readFile(
//     `./sample/lecture${req.params.lecture_id}.txt`,
//     "utf-8",
//     (err, data) => {
//       err
//         ? res.status(500).send("something went wrong") //status code 500 => error from server side
//         : res.status(200).send(data); //status  code 200 => everything is okay
//     }
//   );
// });

//==========CRUD=============

app.get("/lectures", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.send("Something went wrong");
    }
    let parseData = JSON.parse(data); //without parse we can not access object in JSON format
    res.send(parseData.lectures);
  });
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
