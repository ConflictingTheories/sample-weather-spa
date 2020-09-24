/*                                            *\
** ------------------------------------------ **
**           Sample - Weather SPA    	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

const express = require("express");
const axios = require("axios");
const router = express.Router({
  mergeParams: true,
});

// Error Helper
const Error = require("../../../lib/Error");

// Open Weather API
const WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = process.env.WEATHER_API_KEY;

// Models
const Lookup = require("../../../models/Lookup");

module.exports = (() => {
  // GET /:country/:city (default current forecast settings)
  router.get("/:country/:city", async (req, res) => {
    try {
      const { country, city } = req.params;
      const lookup = await lookupByCityCountry(city, country);
      let status = {
        status: 200,
        msg: lookup,
      };
      res.json(status);
    } catch (e) {
      Error.setError("Error", 500, e);
      Error.sendError(res);
    }
  });

  // GET /geo/:lat/:lng (default current forecast settings)
  router.get("/geo/:lat/:lng", async (req, res) => {
    try {
      const { lat, lng } = req.params;
      const lookup = await lookupByLatLng(lat, lng);
      let status = {
        status: 200,
        msg: lookup,
      };
      res.json(status);
    } catch (e) {
      Error.setError("Error", 500, e);
      Error.sendError(res);
    }
  });

  // GET /forecast/:country/:city (default current forecast settings)
  router.get("/forecast/:country/:city", async (req, res) => {
    try {
      const { country, city } = req.params;
      const [current,forecast] = await Promise.all([lookupByCityCountry(city, country),lookupForecastByCityCountry(city, country)]);
      let status = {
        status: 200,
        current,
        forecast,
      };
      res.json(status);
    } catch (e) {
      console.log(e);
      Error.setError("Error", 500, e);
      Error.sendError(res);
    }
  });

  // GET /forecast/geo/:lat/:lng (default current forecast settings)
  router.get("/forecast/geo/:lat/:lng", async (req, res) => {
    try {
      const { lat, lng } = req.params;
      const [current,forecast] = await Promise.all([lookupByLatLng(lat, lng),lookupForecastByLatLng(lat, lng)]);
      let status = {
        status: 200,
        current,
        forecast,
      };
      res.json(status);
    } catch (e) {
      console.log(e);
      Error.setError("Error", 500, e);
      Error.sendError(res);
    }
  });

  return router;
})();

// Log Database Entry of Lookup
async function storeLookup(lookupData) {
  try {
    console.log(lookupData);
    const date = new Date();
    await Lookup.create({
      ...lookupData,
      createdAt: date,
      updatedAt: date,
    });
  } catch (err) {
    console.error(err);
  }
}
// Lookup Current Weather - Lat/Lng
async function lookupByLatLng(lat, lng) {
  await storeLookup({ lat, lng });
  const url = `${WEATHER_ENDPOINT}?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  const { data } = await axios(url);
  return data;
}
// Lookup Current Weather - City/County
async function lookupByCityCountry(city, country) {
  await storeLookup({ city, country });
  const url = `${WEATHER_ENDPOINT}?q=${city},${country}&appid=${API_KEY}`;
  const { data } = await axios(url);
  return data;
}
// Lookup 5 Day Forecast Lat/Lng
async function lookupForecastByLatLng(lat, lng) {
  await storeLookup({ lat, lng });
  const url = `${FORECAST_ENDPOINT}?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  const { data } = await axios(url);
  return data;
}
// Lookup 5 Day City/County
async function lookupForecastByCityCountry(city, country) {
  await storeLookup({ city, country });
  const url = `${FORECAST_ENDPOINT}?q=${city},${country}&appid=${API_KEY}`;
  const { data } = await axios(url);
  return data;
}
