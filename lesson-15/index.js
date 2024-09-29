let tempUnitsSymbol;
let windMeasureUnits;
let tempLanguage;
const weatherDictionary = {
  ru: {
    temperature: "Температура",
    feelsLike: "Ощущается как",
    wind: "Ветер",
    gust: "Порывы до",
    rain1h: "Дождь ближайший час",
    rain3h: "Дождь ближайшие 3 часа",
    noRain: "Осадков не ожидается",
  },
  en: {
    temperature: "Temperature",
    feelsLike: "Feels like",
    wind: "Wind",
    gust: "Gust for",
    rain1h: "Rain 1 hour",
    rain3h: "Rain 3 hours",
    noRain: "No rain expected",
  },
};
const weatherParamsForm = document.querySelector("#weatherParamsForm");
const makeRequestUrl = (weatherParams) => {
  const appId = "bebd6bfe7d59167a059b9df6d795f07e";
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

const prepareWeatherData = (data) => {
  return {
    date: new Date(data.dt * 1000),
    main: {
      temp: Math.round(data.main.temp) + tempUnitsSymbol,
      tempMin: Math.round(data.main.temp_min) + tempUnitsSymbol,
      tempMax: Math.round(data.main.temp_max) + tempUnitsSymbol,
      feelsLike: Math.round(data.main.feels_like) + tempUnitsSymbol,
    },
    sunrise: data.sunrise,
    sunset: data.sunset,
    weather: {
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },
    wind: data.wind,
    clouds: data.clouds,
    rain: data.rain,
    snow: data.snow,
  };
};

const prepareForecastData = (data) => {
  return data.list.map((weatherItem) => prepareWeatherData(weatherItem));
};

const getWeatherIconPath = (iconCode) =>
  "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

const createWeatherCard = (data, isForecast) => {
  const weatherCardTemplate = document.querySelector(
    "#weatherCardTemplate"
  )?.content;
  if (!weatherCardTemplate) throw new Error("weatherCardTemplate not found");

  const weatherCard = weatherCardTemplate.cloneNode(true);

  const currentWeatherIcon = weatherCard.querySelector(".card-icon");
  currentWeatherIcon.src = getWeatherIconPath(data.weather.icon);
  currentWeatherIcon.alt = data.weather.description;

  weatherCard.querySelector(".card-description").textContent =
    data.weather.description;

  weatherCard.querySelector(
    ".card-temperature"
  ).textContent = `${weatherDictionary[tempLanguage].temperature} ${data.main.temp}`;

  weatherCard.querySelector(
    ".card-feels-like"
  ).textContent = `${weatherDictionary[tempLanguage].feelsLike} ${data.main.feelsLike}`;

  weatherCard.querySelector(
    ".card-wind"
  ).textContent = `${weatherDictionary[tempLanguage].wind} ${data.wind.speed} ${windMeasureUnits} ${weatherDictionary[tempLanguage].gust} ${data.wind.gust} ${windMeasureUnits}`;

  const rainContainer = weatherCard.querySelector(".card-rain");
  if (data.rain) {
    if (data.rain["1h"])
      rainContainer.textContent = `${weatherDictionary[tempLanguage].rain1h} ${data.rain["1h"]} mm`;
    else
      rainContainer.textContent = `${weatherDictionary[tempLanguage].rain1h} ${data.rain["3h"]} mm`;
  } else {
    rainContainer.textContent = `${weatherDictionary[tempLanguage].noRain}`;
  }

  const localeOptions = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };

  if (isForecast) {
    localeOptions.hour = "numeric";
    localeOptions.minute = "numeric";
  }

  const formattedDate = data.date.toLocaleString(tempLanguage, localeOptions);

  weatherCard.querySelector(".card-date").textContent = formattedDate;

  return weatherCard;
};

const makeCurrentWeatherApp = (data) => {
  const weatherAppRoot = document.querySelector("#weatherAppRoot");
  const weatherCard = createWeatherCard(data);

  weatherAppRoot.innerHTML = "";
  console.log(data);
  weatherAppRoot?.append(weatherCard);
};

const makeForecastApp = (data) => {
  const weatherRoot = document.querySelector("#weatherAppRoot");

  weatherRoot.innerHTML = "";
  console.log(data);

  const weatherCards = data.map((dataItem) =>
    createWeatherCard(dataItem, true)
  );
  weatherRoot?.append(...weatherCards);

  console.log(data);
};

const setUpLocalWeatherParams = (weatherParams) => {
  if (weatherParams.units === "imperial") {
    tempUnitsSymbol = "\u00B0F";
    windMeasureUnits = "mph";
  } else {
    tempUnitsSymbol = "\u00B0C";
    windMeasureUnits = "м/с";
  }
  tempLanguage = weatherParams.lang;
};

const startApp = async (e) => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  console.log(elements);

  const weatherParams = getWeatherParams(elements);
  console.log(weatherParams);

  const weatherApiURL = makeRequestUrl(weatherParams);
  console.log(weatherApiURL);

  const data = await getWeather(weatherApiURL);
  console.log(data);

  setUpLocalWeatherParams(weatherParams);

  if (weatherParams.isForecast) makeForecastApp(prepareForecastData(data));
  else makeCurrentWeatherApp(prepareWeatherData(data));
};

weatherParamsForm?.addEventListener("change", startApp);

weatherParamsForm.dispatchEvent(new Event("change"));
