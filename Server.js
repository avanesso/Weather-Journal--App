// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
//Spin up server

const server = app.listen(port, ()=>{console.log(`server running\nrunning on localhost: ${port}`)});

/*const server = app.listen(port, listening);
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};*/

// GET route
app.get('/data', (req, res) => {
    console.log('GET request');
    res.send(projectData);
});

// POST route
app.post('/', (req, res) => {
    projectData.date = req.body.date;
    projectData.temperature = req.body.main.temp;
    projectData.feelings = req.body.feelings;
    projectData.name= req.body.name;
    console.log('POST request');
    res.end();
});
