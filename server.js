// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cors for cross origin allowance
const cors = require("cors");

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8008;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`server is running on localhost: ${port}`);
}

// Define routes
function postData(req, res) {
    projectData['name'] = req.body.name;
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
}
app.post("/add", postData);

function getData(req, res) {
    res.send(projectData);
}

app.get("/all", getData);

