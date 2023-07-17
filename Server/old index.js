const http = require("http");

const server = http.createServer((req, res) => {
  // res.write("Hello ");
  // res.write("World");
  // console.log(req.url);

  // res.setHeader("content-type", "application/plain");
  if (req.url === "/") {
    return res.end("Welcome to home page");
  }
  if (req.url === "/product") {
    return res.end(JSON.stringify([1, 2, 3, 4]));
  }
  res.end(".");
});

server.listen(8081, () => {
  console.log("server started on 8081 port");
});

