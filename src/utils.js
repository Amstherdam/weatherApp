import { addSeconds, fromUnixTime, format } from "date-fns";

/* formatTime: time convert 
      This function calculate to local time 

      param data: This is the unix time at the location where the search was made.

      use: data-fns 

      return: some local current time value 
*/
function formatTime(data) {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const offset = data / 3600;
  const localUnixTime = utc + 3600000 * offset;
  const currentTime = new Date(localUnixTime).toLocaleTimeString();

  let clock = format(localUnixTime, " hh:mm aa");
  let theHour = format(localUnixTime, "h");
  let theTime = format(localUnixTime, `EEEE, do MMM yy `);
  let realHour = Number(format(localUnixTime, 'HH'))
  
  let theslice = currentTime.slice(0, 2);
  
  return { clock, theHour, theTime, currentTime, theslice, realHour };
}

/* setAndRise : Calculates the location's sunrise and sunset times

*/
function setAndRise(sunrise, sunset, timeSet) {
  let sunsetTime = addSeconds(
    fromUnixTime(sunset),
    timeSet + new Date().getTimezoneOffset() * 60
  );
  let sunriseTime = addSeconds(
    fromUnixTime(sunrise),
    timeSet + new Date().getTimezoneOffset() * 60
  );

  sunsetTime = Number(format(sunsetTime, "HH"));
  sunriseTime = Number(format(sunriseTime, "HH"));
    
  return { sunriseTime, sunsetTime };
}

// wild speed convert metric/sec --> km/h
function wildConvert(value) {
  value = (value * 3600) / 1000;
  return value;
}

// capitalize to Words
function capitalize(words) {
  const seperateWord = words.toLowerCase().split(" ");

  for (let i = 0; i < seperateWord.length; i++) {
    seperateWord[i] =
      seperateWord[i].charAt(0).toUpperCase() + seperateWord[i].substring(1);
  }

  return seperateWord.join(" ");
}

/*  dailyForecastTime :  This funtion covert unix time to current time 
  ( Because we need day of current time )

  param val : daily unix time 
  param addVal : location time offset

  return : Time (onyl day name)
*/
function dailyForecastTime(val, addVal) { 
  let covertUnixTime = addSeconds( fromUnixTime(val), addVal);
  let result = format( covertUnixTime, `EEEE`)

  return result
}


/* celsiusFahrenheit:  this function covert temperature celcius to fahrenheit */
function celsiusFahrenheit (value) { 
  let f = (value*1.8) + 32
  f = Math.round(f)
  return f
}

function fahrenheitCelsius (value) { 
  let c = (value - 32) / 1.8
  c = Math.round(c)
  return c
}

console.log(fahrenheitCelsius(50))

export { formatTime, wildConvert, capitalize, setAndRise, dailyForecastTime, celsiusFahrenheit, fahrenheitCelsius };

