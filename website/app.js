/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&APPID=7377aa6bc1faebdaa0973753889935ff";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'/'+ d.getDate()+'/'+ d.getFullYear();



// POST Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        });
};

const createData = async () => {
    const feelings = document.querySelector('#feelings').value;
    const zip = document.querySelector('#zip').value;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        console.log('RESPONSE OUTPUT:')
        console.log(response);
        console.log('RESPONSE OUTPUT OVER:')
        const data = await response.json();
        console.log(data);
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateUI();
    } catch (error) {
        console.error("error", error);
    }
};


const updateUI = async () => {
    const projectData = await getData('/data');
    document.querySelector('#date').innerHTML = `${projectData.date}`;
    document.querySelector('#temp').innerHTML = `${projectData.temperature} &#8451`;
    document.querySelector('#content').innerHTML = projectData.feelings;
    document.querySelector('#name').innerHTML = projectData.name;
    console.log(projectData);
    
    
};

const getData = async (url = '') => {
    try {
        const res = await fetch(url);
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};



document.querySelector('#generate').addEventListener('click', createData);