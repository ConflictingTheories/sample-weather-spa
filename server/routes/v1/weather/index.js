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

// Models
const Lookup = require("../../../models/Lookup");

// Open Weather API
const WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.WEATHER_API_KEY;

module.exports = (DB) => {
  // GET /:country/:city (default forecast settings)
  router.get("/:country/:city", async (req, res) => {
    const { country, city } = req.params;
    // Lookup using Open Weather API
    const lookup = await lookupByCityCountry(city, country);
    const date = new Date();
    // Post to DB Log
    await DB.sync();
    await Lookup.create({
      country,
      city,
      createdAt: date,
      updatedAt: date,
    });
    // Return Data
    let status = {
      status: 200,
      msg: lookup,
    };
    res.json(status);
  });

  // GET /geo/:lat/:lng (default forecast settings)
  router.get("/geo/:lat/:lng", async (req, res) => {
    const { lat, lng } = req.params;
    // Lookup using Open Weather API
    const lookup = await lookupByLatLng(lat, lng);
    // Post to DB Log
    await DB.sync();
    await Lookup.create({
      lat,
      lng,
      createdAt: date,
      updatedAt: date,
    });
    // Return Data
    let status = {
      status: 200,
      msg: lookup,
    };
    res.json(status);
  });

  return router;
};

// Lookup Lat/Lng
async function lookupByLatLng(lat, lng) {
  return await axios(
    `${WEATHER_ENDPOINT}?lat=${lat}&lng${lng}&appid=${API_KEY}`
  );
}
// Lookup City/County
async function lookupByCityCountry(city, country) {
  return await axios(
    `${WEATHER_ENDPOINT}?q=${city},${country}&appid=${API_KEY}`
  );
}
