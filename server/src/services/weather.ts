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

import ApiHelper from "../helpers/apiHelper";

// GET /weather/:country/:city
export async function getForecast(country: string, city: string) {
  const forecast = await ApiHelper.get(`/weather/${country}/${city}`);
  if (forecast) {
    console.log(forecast);
  }
  return {
    forecast: forecast.msg,
  };
}

// GET /weather/geo/:lat/:lng
export async function getForecastByLatLng(lat: number, lng: number) {
  const forecast = await ApiHelper.get(`/weather/geo/${lat}/${lng}`);
  if (forecast) {
    console.log(forecast);
  }
  return {
    forecast: forecast.msg,
  };
}

export function kelvinToCelsius(kelvin:number) {
  return kelvin - 273.15;
}

export function kelvinToFarenheit(kelvin:number) {
  return (kelvin - 273.15) * (5 / 9) + 32;
}
