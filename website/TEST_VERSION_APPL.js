/* Global Variables */

const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&APPID=7377aa6bc1faebdaa0973753889935ff";



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'/'+ d.getDate()+'/'+ d.getFullYear();


/*callback function to call async GET request with the parameters:
base url
user entered zip code (see input in html with id zip)
personal API key which is all combined in apiUrl*/

const toExecute = async () =>{
    
    if (zip!='' && 1<zip<99999){
        const zip = document.querySelector('#zip').value;
        const feelings = document.querySelector('#feelings').value;
        fetch(`${url}${zip}${apiKey}`)
            .then(response => response.json())
             .then(function(data){
                 console.log(data);
                 data.feelings = feelings;
                 data.date = newDate;
                 
                  postData('/incoming',{date: data.date ,temp: data.main.temp, content:data.feelings, name:data.name});
                  updateUI();
            })
       
    }else{
          alert("Enter a valid ZIP code");
        
    }
}


//standart boilerplate PostData function from the lesson
const postData = async (url = '', data={})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };


  /* Another async function that is called after the completed POST request.
   This function retrieves data from our app, selects the necessary elements on the DOM (index.html),
    and then updates their necessary values to reflect the dynamic values for:
    Date
    Temperature
    User input
    Location name
    */
  const updateUI = async () => {
    const request = await fetch('/Json');
    try {
      const projectData = await request.json();
      console.log(projectData);
    document.querySelector('#date').innerHTML = `${projectData.date}`;
    document.querySelector('#temp').innerHTML = `${projectData.temp} &#8451`;
    document.querySelector('#content').innerHTML = projectData.content;
    document.querySelector('#name').innerHTML = projectData.name;
    } catch(error) {
      console.log("error", error);
    }
  }

  //an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
  document.querySelector('#generate').addEventListener('click', toExecute);





  
  /*    try{
        const zip = document.querySelector('#zip').value;
        const feelings = document.querySelector('#feelings').value;
        fetch(`${url}${zip}${apiKey}`)
            .then(response => response.json())
             .then(function(data){
                 console.log(data);
                 data.feelings = feelings;
                 data.date = newDate;
                 
                  postData('/incoming',{date: data.date ,temp: data.main.temp, content:data.feelings, name:data.name});
                  updateUI();
            })
       
    }catch(error){
          alert("Enter a valid ZIP code");
          console.log("error", error);
        
    }
};*/