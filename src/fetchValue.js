
/* getWeather: It takesthe coordinates with the first request from the APi and sends the second request.

city: city name is come from the input

return :
      weatherInformationData1: firs API request

      weatherInformationData2: second API request
*/
async function getWeather(city) {
  const API = "20f7632ffc2c022654e4093c6947b4f4";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
  let weatherInformationData2;
  let weatherInformationData1;

  try {
    const response = await fetch(API_URL);
    weatherInformationData1 = await response.json();
    const theLat = weatherInformationData1.coord.lat;
    const theLon = weatherInformationData1.coord.lon;

    weatherInformationData2 = await weatherCelsius(theLat, theLon, API);
  } catch (error) {
    return;
  }

  return { weatherInformationData1, weatherInformationData2 };
}

// https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&exclude={part}&appid=${API}


/*  weatherCelsius: This function sends a request to the second API. */
async function weatherCelsius(lat, lon, API) {
  const API_URL_LOCATION = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API}`;
  try {
    const responseCelsius = await fetch(API_URL_LOCATION);
    const responseCelsius2 = await responseCelsius.json();
    return responseCelsius2;
  } catch (error) {
    console.log(error, "bu");
  }
}

export default getWeather;
