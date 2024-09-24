const cityInput = document.getElementById('city');
const weatherInfoDiv = document.getElementById('weatherInfo');
const apiKey = '621daa1abd54aa3c89d5c6af24809ad6';
const timeInfoDiv = document.getElementById('timeInfo');
let intervalId = null; // used to store the timer ID
const capitalizeFirstLetter = (string) => {
    return string.toUpperCase();
};

document.getElementById('getWeather').addEventListener('click', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    const formattedCity = capitalizeFirstLetter(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const timezoneOffset = data.timezone ;
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            const tempMax = data.main.temp_max;
            const tempMin = data.main.temp_min;

            const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

            if (weatherInfoDiv) {
                weatherInfoDiv.style.color = 'white';
                weatherInfoDiv.innerText = `Weather in ${data.name}: ${weatherDescription.toUpperCase()}\n Temperature: ${data.main.temp}°C`;
            }

            const humidityInfo = document.getElementById('humidityInfo');
            if (humidityInfo) {
                humidityInfo.style.color = 'white';
                humidityInfo.innerText = `Humidity: ${humidity}%`;
            }

            const timeInfoDiv = document.getElementById('timeInfo');
            if (timeInfoDiv) {
                timeInfoDiv.style.color = 'white';

                // clear the previous timer
                if (intervalId) {
                    clearInterval(intervalId);
                }

                //update local time and date every second
                intervalId = setInterval(() => {
                    const localTime = new Date(Date.now() + timezoneOffset);
                    const formattedTime = localTime.toLocaleTimeString();
                    const formattedDate = localTime.toLocaleDateString();
                
                    // display time and date
                    timeInfoDiv.innerText = `${formattedCity}\n${formattedDate} ${formattedTime}`;
                    
                    // display other weather information
                    otherInfo.innerText = `Sunrise: ${sunriseTime}\nSunset: ${sunsetTime}\nMax Temperature: ${tempMax}°C\nMin Temperature: ${tempMin}°C`;
                });
                
            }

            toggleWeather(weatherDescription);
        })
        .catch(error => {
            if (weatherInfoDiv) {
                weatherInfoDiv.innerText = error.message;
            }
        });
});




let flag = true;


const mainSwitch = () => {

    const cityInput = document.getElementById('city').value.trim(); // get input by user

    //check wether cityInput empty
    if (cityInput === '') {
        alert('Please enter a city to get the weather first.');
        return; 
    }
    if (flag) { 
        $(".other").css({
            "opacity": 1, 
            "pointer-events": "auto" 
        });
        $(".main").css({
            "opacity": 0, 
            "pointer-events": "none" 
        });
   
        $(".box1").css("transform", "translateX(100%)");
        $("img").attr("src", "picture2.gif");

        flag = !flag;

    } else { 
        $(".main").css({
            "opacity": 1, 
            "pointer-events": "auto"
        });
        $(".other").css({
            "opacity": 0, 
            "pointer-events": "none" 
        });
        
        $(".box1").css("transform", "translateX(0%)");
        $("img").attr("src", "picture.gif");

        flag = !flag;
    }
}



