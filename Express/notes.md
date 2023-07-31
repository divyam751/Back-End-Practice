Express - E of the MERN stack

Expres

http module of node

Express is also built on top of http module of node itself

1. Helps us create the server and the API's in a much simpler and express way
2. Middleware ecosystem

Express
Just remember - Method + routes



Method/verb/http method/http verbs

endpoint/route/api endpoint 

we know how to create a server and API's using express

1. Params vs query
    query - api.weather.com?city=blr
    query - lectures.masaischool.com?lecture_id=3
    query - https://www.google.com/search?q=express
            http://localhost:8000/welcome?name=xyz&city=pune&age=25
    query - req.query 

    params - lectures.masaischool.com/lecture/1
    params - req.params
    params - app.get("/lectures/:param_name")

2. status codes
    404 - NOT FOUND
    500 - Internal server error
    200 - everything is okay
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.status(200).send(data)

3. headers
   headers convey additional information
   https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
   res.setHeader("Server","local server") - to send from server in response

   req.headers - to read the headers of the client

4. CRUD 

Reading part - we have to parse data, as we can't access the key directly in JSON (do try it out by making a simple json and accessing the key)
Updating part - 
                a) we need to get the entire existing JSON
                b) parse the JSON and make it normal object
                c) in the normal object, manipulate to add the new lecture
                d) stringify the normal object to make it JSON
                e) store the JSON - writeFile


when to parse 
    when we want to make any changes to JSON

when to stringify
   before storing in json file, make your object as JSON. how do you do it? - by JSON.stringify()
const { Console } = require("console")
const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("home page route")
})
//http://localhost:8000/welcome?name=nihal&age=23


app.get("/welcome", (req, res) => {
    //from the server, we want to send a header
    console.log(req.headers)
    res.setHeader("Server","local server")
    res.send("Welcome")
})

// app.get("/lecture/:lecture_day", (req, res) => {
//     console.log(req.params)
//     fs.readFile(`../day_${req.params.lecture_day}/lecture.txt`, "utf-8", (err, data) => {
//         if(err){
//             res.status(500).send("something went wrong")
//         }
//         res.status(200).send(data)
//     })
// })

// app.post("/lecture", (req, res) => {
//     res.send("lecture notes...")
// })

app.get("/posts", (req, res) => {
    fs.readFile("./posts.json", "utf-8", (err, posts) => {
        if(err){
            return res.send("something went wrong, try again")
        }
        res.send(posts)
    })
})



app.get("/lectures", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if(err){
            return res.send("something went wrong, try again")
        }
        let  parsed_data = JSON.parse(data)
        res.send(parsed_data.lectures)
    })
})

app.post("/lectures", (req, res) => {
    const new_lecture = req.body;
    console.log(new_lecture)
    fs.readFile("./db.json", "utf-8", (err, data) => {
        let  parsed_data = JSON.parse(data)
        let lectures = parsed_data.lectures
        lectures.push(new_lecture)
        let new_data = JSON.stringify(parsed_data)
        fs.writeFile("./db.json", new_data, "utf-8", (err) => {
            res.send("data uploaded successfully")
        })
    })
})

app.listen(8000, () => {
    console.log("listening on port 8000")
})




{
    "lectures": [
        {
            "id": 1,
            "name": "JS"
        },
        {
            "id": 2,
            "name": "DSA"
        },
        {
            "id": 3,
            "name": "CSBT"
        }
    ],
    "instructors": [
        {
            "id": 1,
            "name": "Nihal"
        },
        {
            "id": 2,
            "name": "Ankush"
        }
    ]
}