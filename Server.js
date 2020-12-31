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

// Create Server: Adding a console.log() to the server callback function for testing purposes
const port = 8000;
const server = app.listen(port, ()=>{console.log(`server running\nrunning on localhost: ${port}`)});

   
// GET route: Adding a GET route that returns the projectData object in server code 
app.get('/Json', (req, res) => {
    console.log('GET request');
    res.send(projectData);
});

// POST route: Adding a POST route that adds incoming data to projectData
app.post('/incoming', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content']= req.body.content;
    projectData['name']= req.body.name;
    res.send(projectData);
    console.log('POST request');
  });
 

