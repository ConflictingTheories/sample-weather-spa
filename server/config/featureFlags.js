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

module.exports = () => {
  return {
    // Enable /auth API Route
    ENABLE_AUTH: parseInt(process.env.ENABLE_AUTH),
    ENABLE_WEATHER: true,
  };
};
