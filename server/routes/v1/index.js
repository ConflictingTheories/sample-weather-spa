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

// Third-party Libraries
const express = require("express");
const router = express.Router({ mergeParams: true });

// Feature Flags
const FF = require("../../config/featureFlags");

// Export Route
module.exports = (DB) => {
  const authRoute = require("./auth")(DB);
  const weatherRoute = require("./weather")(DB);
  // API Routes (V1)
  if (FF.ENABLE_AUTH) router.use("/auth", authRoute);
  if (FF.ENABLE_WEATHER) router.use("/weather", weatherRoute);
  // Return Router
  return router;
};
