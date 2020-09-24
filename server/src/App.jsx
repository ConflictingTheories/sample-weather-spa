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

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// External Style Frameworks (RSuite / BlueprintJS)
import "rsuite/dist/styles/rsuite-default.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "./styles/less/App.less";

// HELPERS
import withSplashScreen from "./components/utils/splashScreen";

// SCREENS
import HomeScreen from "./modules/dashboard";

// APP
const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="*" component={HomeScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default withSplashScreen(App, "Loading Weather Forecast...");
