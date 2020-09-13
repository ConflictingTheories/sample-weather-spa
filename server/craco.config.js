/*                                            *\
** ------------------------------------------ **
**           Sample - Weather SPA    	        **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

const CracoLessPlugin = require('craco-less');

module.exports = {
  // LESS Support
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@background': '#282c34' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};