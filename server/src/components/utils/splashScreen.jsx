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

// ASSETS & APP STYLES
import logo from "../../assets/logo.svg";
import "../../styles/App.less";

// Splash Screen
function SplashScreen(loadingMessage) {
  return (
    <div className="App">
      <header className="App-splash">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{loadingMessage}</p>
      </header>
    </div>
  );
}

// Splash Screen
export default function withSplashScreen(
  WrappedComponent,
  loadingMessage = "Please, wait a moment while we load the application."
) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      if (this.state.loading) return SplashScreen(loadingMessage);
      return <WrappedComponent {...this.props} />;
    }
  };
}
