
const title = "Alcodemy Weather";
const description = "Get the latest updates of current weather";
const keyword = "Alcodemy, Weather Alcodemy, weather, weather today, weather current location";

const weatherobj = {
  weatherapp: async (req, res, weatherData) => {

    const location = weatherData.location.name;
    const country = weatherData.location.country;
    const currentTemperature = weatherData.current.temp_c;
    const humidity = weatherData.current.humidity;
    const gustsKph = weatherData.current.gust_kph;
    const condition = weatherData.current.condition.text;
    const currentIcon = weatherData.current.condition.icon;
    const avgtemp = weatherData.forecast.forecastday[0].day.avgtemp_c;
    const visibility = { kms: weatherData.current.vis_km, miles: weatherData.current.vis_miles };
    const raintotal = weatherData.forecast.forecastday[0].day.totalprecip_in;
    const uvIndex = weatherData.current.uv;
    const currentWindSpeedKph = weatherData.current.wind_kph;
    const rainchances = weatherData.forecast.forecastday[0].day.daily_will_it_rain;

    function getUVDescription(uvIndex) {
      if (uvIndex >= 0 && uvIndex <= 2) {
        return "Low (Good)";
      } else if (uvIndex <= 5) {
        return "Moderate";
      } else if (uvIndex <= 7) {
        return "High (Bad)";
      } else if (uvIndex <= 10) {
        return "Very High";
      } else {
        return "Extreme";
      }
    }
    const uvDescription = getUVDescription(uvIndex);

    const responseData = {
      title,
      description,
      keyword,
      current: {
        location,
        country,
        temperature: currentTemperature,
        humidity,
        gustsKph,
        condition,
        visibility,
        currentIcon,
        avgtemp,
        raintotal,
        rainchances,
        uvIndex,
        uvDescription,
        windSpeedMph: currentWindSpeedKph,
      },
      hourlyForecast: {

      },
      dailyForecast: {

      }
    };

    var hourlyTime;
    var hourlytemp;

    for (let i = 2; i < 24; i += 3) {
      hourlyTime = weatherData.forecast.forecastday[0].hour[i].time.slice(-5);
      hourlyIcon = weatherData.forecast.forecastday[0].hour[i].condition.icon;
      hourlytemp = Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c);
      responseData.hourlyForecast["a" + i] = {
        hourlyTime,
        hourlytemp,
        hourlyIcon
      }
    }

    for (let i = 0; i < 3; i++) {
      const mintemp = Math.round(weatherData.forecast.forecastday[i].day.mintemp_c);
      const maxtemp = Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c);
      const date = weatherData.forecast.forecastday[i].date.slice(-2) + "/" + weatherData.forecast.forecastday[i].date.slice(5, 7);
      const dayIcon = weatherData.forecast.forecastday[i].day.condition.icon;
      const newDate = new Date(weatherData.forecast.forecastday[i].date);
      const day = newDate.toLocaleString('en-US', { weekday: 'long' }).slice(0, 3);
      responseData.dailyForecast["b" + i] = {
        date,
        day,
        dayIcon,
        mintemp,
        maxtemp,
      }
    }
    res.render("index", responseData)
  }

}

module.exports = weatherobj