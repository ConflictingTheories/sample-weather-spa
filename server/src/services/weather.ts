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
  return ApiHelper.get(`/weather/${country}/${city}`).then((forecast: any) => {
    if (forecast) {
      console.log(forecast);
    }
    return {
      forecast,
    };
  });
}

// GET /weather/geo/:lat/:lng
export async function getForecastByLatLng(lat: number, lng: number) {
  return ApiHelper.get(`/weather/geo/${lat}/${lng}`).then((forecast: any) => {
    if (forecast) {
      console.log(forecast);
    }
    return {
      forecast,
    };
  });
}

