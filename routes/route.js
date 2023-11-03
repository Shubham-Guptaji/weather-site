const express = require('express');
const router = express.Router();
const weather = require("../components/weather");
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.weatherApiKey;
const locationApi = process.env.locationApi;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const ipAddress = "27.58.192.217" || req.ip;
  const weatherData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ipAddress}&days=3`);
  weather.weatherapp(req, res, weatherData.data);
});

router.post("/", async (req, res) => {
  const weatherData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${req.body.Address}&days=3`);
  weather.weatherapp(req, res, weatherData.data);
});

router.post('/zcsgtouzewrjbrwq', async (req, res) => {
  const { latitude, longitude } = req.body;
  const coordLocation = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${locationApi}`);
  const [city, cityCountry] = [coordLocation.data[0].name,coordLocation.data[0].country];
  const weatherData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city},${cityCountry}&days=3`);
  weather.weatherapp(req, res, weatherData.data);
});

router.get("/:name", (req, res) => {
  const header = {
    title: req.params.name,
    description: "You have searched for a wrong page.",
    keyword: "Alcodemy, Wrong Alcodemy"
  };
  res.status(404).render("error", { header: header });
});

module.exports = router;
