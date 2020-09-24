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
import { collect, store, batch } from "react-recollect";

// RSuite UI Library
import { Container, Content } from "rsuite";
// Main Weather Panel
import WeatherForecast from "../components/WeatherForecast";

class Dashboard extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          minHeight: "100vh",
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <Container>
            <Content>
              <WeatherForecast />
            </Content>
          </Container>
        </div>
      </div>
    );
  }
}

export default collect(Dashboard);
