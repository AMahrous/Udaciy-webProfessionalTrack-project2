/* Global Variables */

let city_name = "Cairo";
const API_key = "50cb8d8f87c1d0e56c798e3ceefca76f&units=imperial";
let base_url = `https://api.openweathermap.org/data/2.5/weather?q=`;

// Create a new date instance dynamically with JS
let d = new Date();
d.setMonth(d.getMonth()+1);
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
var stateCode = "";
var user_feelings = "";
document.getElementById('zip').addEventListener('input',(event) => {
        stateCode = event.target.value;
});

document.getElementById('feelings').addEventListener('input',(event) => {
        user_feelings = event.target.value;
    });

document.getElementById('generate').addEventListener('click', doSomething);

async function doSomething () {

    const data = await getWebAPIData(base_url, stateCode, API_key)
    .then(async (data) => {
        const PostedProjectData = await postData("http://localhost:8080/add",
                {
                    "temperature": data.main.temp.toString(),
                    "date": newDate,
                    "user_response": user_feelings
                }
        )
        /*.then((PostedProjectData) => {
            updateUI(PostedProjectData.temperature, PostedProjectData.date, PostedProjectData.user_response);
        });*/
        .then(async ()=>{
            const projectData = await getProjectData("http://localhost:8080/getAll","");
            updateUI(projectData.temperature, projectData.date, projectData.user_response);
        });
    });
};

/* Function to POST data */
const postData = async (url, data) => {
    const response = await fetch(url,
    {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try
    {
        const newPost = await response.json();
        //console.log(newPost);
        return newPost;
    }
    catch (error)
    {
        console.log(error);
    }
};

/* Function to GET Web API Data*/
const getWebAPIData = async (base_url, stateCode, API_key) => 
{
    const full_url = `${base_url}${city_name},${stateCode}&appid=${API_key}`;
    console.log(full_url);
    const response = await fetch(full_url);
    try 
    {
        const data = await response.json();
        //console.log(data);
        return data;
    }
    catch(error)
    {
        console.log(error);
    }

};

/* Function to GET Project Data */
const getProjectData = async (base_url) => 
{
    const response = await fetch(base_url);
    try 
    {
        const data = await response.json();
        //console.log(data);
        return data;
    }
    catch(error)
    {
        console.log(error);
    }

};

/* Function to update UI */ 
const updateUI = (temp, date, feelings) => {
    try
    {
        document.getElementById('temp').innerHTML = `Temperature: ${temp}.`;
        document.getElementById('date').innerHTML = `Date: ${date}.`;
        document.getElementById('content').innerHTML = `User feelings: ${feelings}.`;
    }
    catch(error)
    {
        console.log(error);
    }
};
