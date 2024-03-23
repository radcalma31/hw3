// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('weatherForm');
    const weatherInfo = document.getElementById('weatherInfo');
    
    form.addEventListener('submit', async (e) => {
    	e.preventDefault();
	    	
        try {
                const city = form.city.value.trim();
        	const response = await fetch(`/weather?city=${city}`);
        	const data = await response.json();
        		displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:',error);
                weatherInfo.textContent = 'Failed to fetch weather data.';
            }	
            
    });
    
    
    function displayWeather(data) {
        const { name, main, weather, wind, sys } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        weatherInfo.innerHTML = `
            <p>Temperature in ${name}: ${temperature}°C (${convertToFahrenheit(temperature)}°F)</p>
            <p>Weather: ${description}</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Sunrise: ${formatTime(sys.sunrise)}</p>
            <p>Sunset: ${formatTime(sys.sunset)}</p>
        `;
    }
    
    function convertToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }

    function formatTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString();
    }

});

