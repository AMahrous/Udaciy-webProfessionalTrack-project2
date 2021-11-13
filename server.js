// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
    console.log("server is running");
    console.log(`running on: localhost:${port}`);
});


app.get("/getAll", (req, res) => {
    //console.log(projectData);
    return res.send(projectData);
});

app.post("/add", (req, res) => {
    const receivedData = req.body;
    projectData = receivedData;
    //console.log(projectData);
    return res.send(JSON.stringify(projectData));
});
