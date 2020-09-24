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

import React, { Component } from "react";
import { collect, store, batch } from "react-recollect";
import withSplashScreen from "./utils/splashScreen";

// RSuite UI Library
import {
  Container,
  Icon,
  Panel,
  Content,
  Row,
  Col,
  Notification,
  Placeholder,
  FlexboxGrid,
  Header,
  Nav,
} from "rsuite";

// BLUEPRINT STYLES
import {
  Button,
  ControlGroup,
  InputGroup,
  Intent,
  Callout,
} from "@blueprintjs/core";

// List of Countries
import cities from "../assets/json/cities.json";
import countries from "../assets/json/countries.json";
import weatherTypes from "../assets/json/weatherTypes.json";

// Weather Service
import {
  getForecastByLatLng,
  getDailyForecastByLatLng,
  getForecast,
  getDailyForecast,
  kelvinToCelsius,
  kelvinToFarenheit,
} from "../services/weather";
import colors from "../styles/colors";

const { Paragraph } = Placeholder;

class WeatherForecast extends Component {
  constructor(props) {
    super(props);

    // methods
    this.fetchByCity = this.fetchByCity.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.renderDashboardTabs = this.renderDashboardTabs.bind(this);
    this.requestLocation = this.requestLocation.bind(this);
    this.genForecast = this.genForecast.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

    // State
    this.state = {
      currentTab: "search",
      position: store.position || null,
      location: store.location || {
        city: "",
        country: "CA",
      },
      forecast: store.forecast || null,
      current: store.current || null,
      renderHeader: props.renderHeader || this.renderHeader,
      renderBody: props.renderBody || this.renderBody,
    };
  }

  async componentDidMount() {
    // Fetch Location on Load (if Permission Given)
    await this.requestLocation();
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

  // Request Location from Browser
  async requestLocation() {
    const _that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (position && position.coords) {
            const result = await getDailyForecastByLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            _that.setState(
              { position, forecast: result.forecast, current: result.current },
              () => {
                store.position = position;
                store.current = result.current;
                store.forecast = result.forecast;
              }
            );
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
      const result = await getDailyForecast(location.country, location.city);
      this.setState(
        { forecast: result.forecast, current: result.current },
        () => {
          store.current = result.current;
          store.forecast = result.forecast;
        }
      );
    }
  }

  // Update Handler
  updateCity(x) {
    const { location } = this.state;
    location.city = x.target.value;
    this.setState({ location }, () => {
      store.location = location;
    });
  }

  // Handler
  updateCountry(x) {
    const { location } = this.state;
    location.country = x.target.value;
    this.setState({ location }, () => {
      store.location = location;
    });
  }

  // Render Weather Icon
  renderIcon(iconCode) {
    return <img src={require(`../assets/icons/${iconCode}.png`)} />;
  }

  // Generate Details for Display
  genForecast(forecast, details) {
    details.push(
      <div className={"details"}>
        <Callout intent={Intent.SUCCESS}>
          <p>
            <strong>{forecast.name}</strong>
          </p>
          <p>Temperature: {kelvinToCelsius(forecast.main.temp).toFixed(2)} C</p>
          <p>Min: {kelvinToCelsius(forecast.main.temp_min).toFixed(2)} C</p>
          <p>Max: {kelvinToCelsius(forecast.main.temp_max).toFixed(2)} C</p>
          <p>Weather: {forecast.weather[0].description}</p>
        </Callout>
      </div>
    );
  }

  // Render Search Bar
  renderSearchBar(forecast) {
    const { location } = this.state;
    return (
      <Callout
        title={
          <React.Fragment>
            Chaos Weather Loaded ✓ ::
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
    );
  }
  // Forecast Tabs
  renderDashboardTabs() {
    const { forecast, current } = this.state;
    const details = [];
    const listItems = weatherTypes.map((type) => {
      return current &&
        current.weather &&
        current.weather[0] &&
        (current.weather[0].icon == type[0].code ||
          current.weather[0].icon == type[1].code) ? (
        // Active
        <li className={"active"}>
          {this.renderIcon(current.weather[0].icon)}
          <h5>{current.weather[0].description || type[0].desc}</h5>
          {this.genForecast(current, details)}
        </li>
      ) : null;
    });

    return (
      <React.Fragment>
        {/* SEARCH */}
        {this.state.currentTab === "search"
          ? this.renderSearchBar(current)
          : null}
        {/* BODY */}
        {this.state.location.city !== "" || this.state.position ? (
          <Container>
            <div
              className={"swirl"}
              style={{ overflowY: "auto", background: colors.secondaryGrad }}
            >
              {details}
              <ul style={{ listStyle: "none" }}>{listItems}</ul>
            </div>
          </Container>
        ) : null}
      </React.Fragment>
    );
  }

  // Panel City Select Header
  renderHeader() {
    return (
      <Nav
        onSelect={async (eventKey, event) => {
          console.log(event, eventKey);
          if (eventKey === "search") {
            this.setState({ currentTab: eventKey }, async () => {
              await this.requestLocation();
            });
          } else {
            this.setState(
              { currentTab: eventKey.city || eventKey, location: eventKey },
              async () => {
                await this.fetchByCity();
              }
            );
          }
        }}
        justified
      >
        {cities.map((city) => {
          return (
            <Nav.Item
              eventKey={city}
              active={this.state.currentTab === city.city}
            >
              <span class={"nav-option"}> {city.city}</span>
            </Nav.Item>
          );
        })}
        <Nav.Item eventKey="search" active={this.state.currentTab === "search"}>
          <span class={"nav-option"}>Search</span>
        </Nav.Item>
      </Nav>
    );
  }

  // Panel Body
  renderBody() {
    return (
      <Container style={{ backgroundColor: colors.slateGray }}>
        <Content
          style={{
            padding: "1em",
            minWidth: "55vw",
            maxHeight: "65vh",
            width: "55vw",
            padding: "1em",
          }}
        >
          {this.renderDashboardTabs()}
        </Content>
      </Container>
    );
  }

  // Component
  render() {
    return (
      <Container style={{ background: colors.secondaryGrad }}>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={24}>
              <div
                className="App-splash"
                style={{ backgroundColor: "transparent" }}
              >
                <Panel bodyFill>
                  {this.renderHeader()}
                  {this.renderBody()}
                </Panel>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    );
  }
}

export default collect(WeatherForecast);
