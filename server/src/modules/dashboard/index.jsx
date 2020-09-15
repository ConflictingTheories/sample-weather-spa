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
import { collect } from "react-recollect";

// RSuite UI Library
import {
  Container,
  Content,
  Row,
  Col,
  Notification,
  Placeholder,
  Steps,
} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";

// BLUEPRINT STYLES
import {
  Button,
  Tabs,
  Tab,
  NonIdealState,
  ControlGroup,
  InputGroup,
  Intent,
  Callout,
} from "@blueprintjs/core";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

import NavBar from "../../components/nav";
import SideMenu from "../../components/menu";

import {
  getForecastByLatLng,
  getForecast,
  kelvinToCelsius,
  kelvinToFarenheit,
} from "../../services/weather";

// ASSETS & APP STYLES
import "../../styles/App.less";
import "../../styles/weather.less";

// List of Countries
import countries from "../../assets/countries.json";
import weatherTypes from "../../assets/weatherTypes.json";

const ICON_API = "http://openweathermap.org/img/wn/";

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // methods
    this.fetchByCity = this.fetchByCity.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.renderDashboardTabs = this.renderDashboardTabs.bind(this);
    this.requestLocation = this.requestLocation.bind(this);
    // Store
    this.store = props.store;
    // State
    this.state = {
      currentStep: 0,
      position: this.store.position || null,
      location: this.store.location || {
        city: "",
        country: "CA",
      },
      forecast: this.store.forecast || null,
    };
  }

  // Request Location from Browser
  async requestLocation() {
    const _that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          if (position && position.coords) {
            const result = await getForecastByLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            _that.setState({ position, forecast: result.forecast }, () => {
              _that.store.position = position;
              _that.store.forecast = result.forecast;
            });
          }
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }

  // Fetch by City Lookup
  async fetchByCity() {
    const { location } = this.state;
    if (location) {
      const result = await getForecast(location.country, location.city);
      this.setState({ forecast: result.forecast, currentStep: 1 }, () => {
        this.store.forecast = result.forecast;
      });
    }
  }

  // Update Handler
  updateCity(x) {
    const { location } = this.state;
    location.city = x.target.value;
    this.setState({ location }, () => {
      this.store.location = location;
    });
  }

  // Handler
  updateCountry(x) {
    const { location } = this.state;
    location.country = x.target.value;
    this.setState({ location }, () => {
      this.store.location = location;
    });
  }

  // Render Weather Icon
  renderIcon(iconCode) {
    return <img src={`${ICON_API}/${iconCode}@2x.png`} />;
  }

  // Search Location if available
  async componentDidMount() {
    // Fetch Location on Load (if Permission Given)
    await this.requestLocation();
    // ...
    // Do Other Stuff Like City / Etc.
    // ...
    // Provide "Notification"
    setTimeout(
      () =>
        Notification.open({
          title: "Storm Warning 🐙👾 - WOOOH!!",
          description: <Paragraph width={320} rows={3} />,
        }),
      ~~(Math.random() * 10000)
    );
  }

  // Render Search & Weather Details
  renderDashboardTabs() {
    const { location, currentStep, forecast } = this.state;
    return (
      <React.Fragment>
        <Callout
          intent={Intent.SUCCESS}
          title={
            <React.Fragment>
              Weather SPA Template - Loaded ✓ ::
              {forecast ? `Lookup For: ${forecast.name}` : "Enter Search"},
              <br />
              <hr />
              <ControlGroup fill>
                <InputGroup
                  placeholder={"City"}
                  value={location.city || ""}
                  onChange={this.updateCity}
                />
                <select
                  placeholder={"Country"}
                  className={"bp3-fill bp3-large"}
                  onChange={this.updateCountry}
                >
                  {countries.map((x) =>
                    x.code == location.country ? (
                      <option selected value={x.code}>
                        {x.value}
                      </option>
                    ) : (
                      <option value={x.code}>{x.value}</option>
                    )
                  )}
                </select>
                <Button onClick={() => this.fetchByCity()}>Lookup</Button>
              </ControlGroup>
            </React.Fragment>
          }
        />
        <div className={"weather"}>
          <ul>
            {weatherTypes.map((type) => {
              return forecast &&
                forecast.weather &&
                forecast.weather[0] &&
                (forecast.weather[0].icon == type[0].code ||
                  forecast.weather[0].icon == type[1].code) ? (
                // Active
                <li className={"active"}>
                  {this.renderIcon(type[0].code)}
                  <div className={"details"}>
                    <Callout intent={Intent.SUCCESS}>
                      <p>
                        Temperature: {kelvinToCelsius(forecast.main.temp)} C
                      </p>
                      <p>
                        Min:{" "}
                        {kelvinToCelsius(forecast.main.temp_min).toFixed(2)} C
                      </p>
                      <p>
                        Max:{" "}
                        {kelvinToCelsius(forecast.main.temp_max).toFixed(2)} C
                      </p>
                      <p>
                        Weather:{" "}
                        {forecast.weather[0].description || type[0].desc}
                      </p>
                    </Callout>
                  </div>
                </li>
              ) : (
                // Not Active
                <li>{this.renderIcon(type[0].code)}</li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

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
        <SideMenu
          activeKey={"1"}
          style={{ flex: 1, flexShrink: 1, flexGrow: 0 }}
        />
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <Container>
            <NavBar
              isLogin={false}
              renderBrand={this.renderClientSelect}
              renderBar={() => null}
              renderRight={() => null}
            />
            <Content>{this.renderDashboardTabs()}</Content>
          </Container>
        </div>
        {/* sidebar */}
      </div>
    );
  }
}

export default collect(Dashboard);
