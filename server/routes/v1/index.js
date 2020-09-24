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
module.exports = (() => {
  const weather = require("./weather");
  if (FF.ENABLE_WEATHER) router.use("/weather", weather);
  return router;
})();
