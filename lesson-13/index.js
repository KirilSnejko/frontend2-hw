const weatherParamsForm = document.querySelector("#weatherParamsForm");

const makeRequestUrl = (weatherParams) => {
  const appId = "03ceee313c0f54cae5a529c0ea737a78";
  const baseURL = "https://api.openweathermap.org/data/2.5/";
  const urlPath = weatherParams.isForecast ? "forecast" : "weather";

  const url = new URL(urlPath, baseURL);
  Object.entries(weatherParams).forEach(([key, value]) => {
    if (key !== "isForecast") url.searchParams.append(key, value);
  });
  url.searchParams.append("appid", appId);
  return url;
};

const getWeather = (url) => {
  return fetch(url)
    .then((res) => res.ok && res.json())
    .catch((e) => {
      console.error(e);
    });
};

const getWeatherParams = (elements) => {
  return [...elements].reduce((acc, el) => {
    if (el.type === "radio" || el.type === "checkbox") {
      if (el.checked) acc[el.name] = el.value;
    } else {
      if (el.type !== "submit") acc[el.name] = el.value;
    }
    return acc;
  }, {});
};

const clearWeatherData = (data) => {
  console.log(data);

  return {
    date: data.dt,
    main: data.main,
    sunrise: data.sunrise,
    sunset: data.sunset,
    weather: {
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },
    wind: data.wind,
    clouds: data.cloud,
    rain: data.rain,
    snow: data.snow,
  };
};

const makeCurrentWeatherApp = (data) => {
  console.log(data);
  const weatherCardTemplate = document.querySelector(
    "#weatherCardTemplate"
  )?.content;
  if (!weatherCardTemplate) throw new Error("weatherCardTemplate not found");
  const weatherCard = weatherCardTemplate.cloneNode(true);
  console.log(weatherCard);
};

const startApp = async (e) => {
  e.preventDefault();
  const elements = e.target.elements;
  const weatherParams = getWeatherParams(elements);
  const weatherApiURL = makeRequestUrl(weatherParams);
  const data = await getWeather(weatherApiURL);
  makeCurrentWeatherApp(clearWeatherData(data));
};

weatherParamsForm.addEventListener("submit", startApp);
