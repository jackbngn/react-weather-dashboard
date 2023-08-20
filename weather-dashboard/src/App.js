import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(null);

	useEffect(() => {
		const city = 'Fountain Valley';
		const apiKey = '755e0b14b164c0f68364b9b8b3215515';
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setWeatherData(data);

				const weatherCondition = data.weather[0].main.toLowerCase();
				const unsplashApiKey = 'aeQGPpR97aDz-J2g-9kWSq71mJsx6mwrfQl3hr1WDsM';
				const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${weatherCondition}&client_id=${unsplashApiKey}`;

				return fetch(unsplashApiUrl);
			})
			.then((response) => response.json())
			.then((data) => {
				setBackgroundImage(data.urls.regular);
			})
			.catch((error) => console.log('Error Fetching Data', error));
	}, []);

	return (
		<div
			className="main"
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="weather-card">
				{weatherData ? (
					<div>
						<h2>Weather Dashboard</h2>
						<div className="weather-info">
							<p>City: {weatherData.name}</p>
							<p>Temperature: {weatherData.main.temp}°F</p>
							<p>Weather: {weatherData.weather[0].main}</p>
							<p>Humidity: {weatherData.main.humidity}%</p>
							<p>Wind: {weatherData.wind.speed}</p>
							{/* Display other relevant weather information here */}
						</div>
					</div>
				) : (
					<p>Loading weather data...</p>
				)}
			</div>
		</div>
	);
}

export default App;
