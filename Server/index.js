const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("you are at home page");
  }
  if (req.url === "/product") {
    fs.readFile("./lorem.txt", "UTF-8", (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      }
      res.end(data);
    });
  }
  if (req.url === "/uploadprofile" && req.method === "POST") {
    let str = "";

    req.on("data", (data) => {
      str += data;
    });
    req.on("end", () => {
      console.log(str);
    });
    res.write("data successfuly uploaded");
  } else if (req.url === "/uploadprofile" && req.method === "GET") {
    res.write(
      "Please refer API Documentation and use POST request to upload your profile"
    );
    res.end();
  }
});

server.listen(8081, () => {
  console.log("server Started on 8081");
});
