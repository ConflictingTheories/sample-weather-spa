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

import Env from "../config/runtime.json";
var location: Location;

// API Helper Class
class ApiHelper {
  static host: string = Env.apiHost || "http://localhost";
  static port: number = parseInt(Env.apiPort || "8081");
  static ver: string = Env.apiVer || "v1";

  // GET Request
  static get = async (path: string, queryObj: any = {}) => {
    const requestOptions = {
      method: "GET",
    };
    let query =
      Object.keys(queryObj)
        .map((x) => "" + x + "=" + queryObj[x])
        .join("&") || "";
    return fetch(
      `${ApiHelper.host}:${ApiHelper.port}/api/${ApiHelper.ver}${path}?${query}`,
      requestOptions
    ).then(handleResponse);
  };

  // POST Request
  static post = async (path: string, bodyObj: any = {}) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    };
    return fetch(
      `${ApiHelper.host}:${ApiHelper.port}/api/${ApiHelper.ver}${path}`,
      requestOptions
    ).then(handleResponse);
  };

  // put

  // delete

  // head
}

async function handleResponse(response: Response) {
  return response.text().then(async (text) => {
    const data = text && JSON.parse(text);
    // Check for Errors or Future Auth (if appl.)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export default ApiHelper;
