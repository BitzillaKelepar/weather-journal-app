/* Global Variables */
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// OpenWeatherMap API Call
const _APICall = "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid={API key}&units=imperial";

generate.addEventListener("click", updateInfo);

// Update displayed weather data
function updateInfo(e) {
    e.preventDefault();
    const newZip = zip.value;
    const content = feelings.value;

    getWeather(baseURL, newZip, apiKey)
        .then(function (data) {
            // add data to POST request
            postData("http://localhost:8008/add", {
                name: data.name,
                date: newDate,
                temp: data.main.temp,
                content
            }).then(function () {
                updateUI() 
            });
        })
}

// Get the weather information
const getWeather = async (baseURL, newZip, apiKey) => {
    try {
        const res = await fetch(baseURL + newZip + apiKey);
        const data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("error").innerHTML = "City not found. Enter a valid zip code.";
            document.getElementById("entryHolder").style.display = "none";

        } else {
            document.getElementById("error").innerHTML = "";
            document.getElementById("entryHolder").style.display = "block";
            return data;
        }
    } catch (error) {
        console.log("error", error);
    }
};

// Post data function
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Update UI function
const updateUI = async () => {
    const req = await fetch("http://localhost:8008/all");
    try {
        const allData = await req.json();
        // update DOM
        document.getElementById("name").innerHTML = allData.name;
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML = allData.temp + " °F";
        document.getElementById("content").innerHTML = allData.content;
    } catch (error) {
        console.log("error", error);
    }
};