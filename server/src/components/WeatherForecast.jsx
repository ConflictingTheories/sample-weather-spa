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
import { collect, store } from "react-recollect";

// RSuite UI Library
import {
  Container,
  Panel,
  Content,
  Row,
  Col,
  Notification,
  Placeholder,
  FlexboxGrid,
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

// Weather Service
import {
  getDailyForecastByLatLng,
  getDailyForecast,
  kelvinToCelsius,
} from "../services/weather";
import colors from "../styles/colors";
import withSplashScreen from "./utils/splashScreen";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const { Paragraph } = Placeholder;

class WeatherForecast extends Component {
  constructor(props) {
    super(props);

    // methods
    this.fetchByCity = this.fetchByCity.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.requestLocation = this.requestLocation.bind(this);
    this.renderForecast = this.renderForecast.bind(this);
    this.renderPanelBody = this.renderPanelBody.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);
    this.renderFog = this.renderFog.bind(this);

    // State
    this.state = {
      loading: true,
      currentTab: "Calgary",
      position: store.position || null,
      location: store.location || {
        city: "Calgary",
        country: "CA",
      },
      forecast: store.forecast || null,
      current: store.current || null,
      renderHeader: props.renderHeader || this.renderPanelHeader,
      renderBody: props.renderBody || this.renderPanelBody,
    };
  }

  async componentDidMount() {
    // Fetch Location on Load (if Permission Given)
    // await this.requestLocation();
    await this.fetchByCity();
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
    this.setState({ loading: true });
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
              {
                position,
                forecast: result.forecast,
                current: result.current,
                loading: false,
              },
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
    this.setState({ loading: true });
    const { location } = this.state;
    if (location) {
      const result = await getDailyForecast(location.country, location.city);
      this.setState(
        { forecast: result.forecast, current: result.current, loading: false },
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

  // Return Appropriate Class for Styling Background
  weatherClass() {
    let date = new Date();
    if (date.getHours() > 18 || date.getHours() < 6) return "clearNight swirl";
    else return "clearDay swirl";
  }

  // Render Fog
  renderFog() {
    const { current } = this.state;
    if (current && current.weather && current.weather[0]) {
      switch (current.weather[0].icon) {
        // Clear
        case "01n":
        case "02n":
        case "02d":
        case "01d":
          return null;
        // Cloudy
        case "03n":
        case "04n":
        case "03d":
        case "04d":
          return (
            <React.Fragment>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
            </React.Fragment>
          );
        // Stormy
        case "09n":
        case "10n":
        case "11n":
        case "09d":
        case "10d":
        case "11d":
          return (
            <React.Fragment>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
            </React.Fragment>
          );

        // Smoke / Snow
        case "50d":
        case "13d":
        case "50n":
        case "13n":
          return (
            <React.Fragment>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
              <div className={"foglayer"}>
                <div className={"image"} />
              </div>
            </React.Fragment>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  // Render Weather Icon
  renderIcon(iconCode) {
    return <img src={require(`../assets/icons/${iconCode}.png`)} />;
  }

  // Generate Details for Display
  renderForecast() {
    const { current, forecast, loading, location } = this.state;
    let today = new Date();
    let output = [];
    // If Loaded
    if (!loading) {
      output = forecast.list
        .map((t) => {
          let temp = kelvinToCelsius(t.main.temp);
          let min = kelvinToCelsius(t.main.temp_min);
          let max = kelvinToCelsius(t.main.temp_max);
          let icon = t.weather[0].icon;
          let date = new Date(t.dt * 1000);
          let isNoon = t.dt_txt.match(/12:00:00/i);
          let index = date.getUTCDate() - today.getUTCDate();
          if (!!isNoon && index > 0) {
            console.log(isNoon, index);
            return { min, max, temp, date, icon };
          } else return null;
        })
        .filter((x) => x);
    }
    return (
      <div className={"details"}>
        {/* Today  */}
        <Row>
          <Col md={24} lg={24} sm={24}>
            {/* // Loading */}
            {loading ? (
              <Panel bordered className={"loading"}>
                <Placeholder.Paragraph rowHeight={6} graph="image" />
              </Panel>
            ) : (
              // Loaded
              <Panel className={"frosted"} bordered>
                <h5>Today</h5>
                <div>
                  {this.renderIcon(current.weather[0].icon)}
                  <h3
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                      display: "inline",
                    }}
                  >
                    <div style={{ fontSize: "0.75em", float: "right" }}>
                      {location.city + ", " + location.country}
                      <br />
                      {(" " + current.weather[0].description)
                        .toLowerCase()
                        .replace(/\b./g, function (match, chr) {
                          return ("" + match).toUpperCase();
                        })}
                    </div>
                    {kelvinToCelsius(current.main.temp).toFixed(1) + "°C"}
                  </h3>
                </div>
              </Panel>
            )}
          </Col>
        </Row>
        {/* Four Days Out */}
        <Row>
          {/* // Loading */}
          {loading
            ? [1, 2, 3, 4].map((x) => {
                return (
                  <Col md={6} lg={6} sm={6}>
                    <Panel
                      style={{ textAlign: "center" }}
                      bordered
                      className={"loading"}
                    >
                      <Placeholder.Paragraph rowHeight={6} graph="image" />
                    </Panel>
                  </Col>
                );
              })
            : // Loaded
              output.slice(0, 4).map((day, index) => {
                let dayOfWeek = (today.getDay() + index + 1) % 7;
                return (
                  <Col md={6} lg={6} sm={6}>
                    <Panel
                      className={"frosted"}
                      style={{ textAlign: "center" }}
                      bordered
                    >
                      <h5>{days[dayOfWeek]}</h5>
                      <div>
                        {this.renderIcon(day.icon)}
                        <h3
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            display: "inline",
                          }}
                        >
                          {day.temp.toFixed(1) + "°C"}
                        </h3>
                      </div>
                    </Panel>
                  </Col>
                );
              })}
        </Row>
      </div>
    );
  }

  // Render Search Bar
  renderSearchBar() {
    const { location } = this.state;
    return (
      <Callout
        title={
          <React.Fragment>
            Enter Search
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
            <br />
            <br />
          </React.Fragment>
        }
      />
    );
  }

  // Panel City Select Header
  renderPanelHeader() {
    return (
      <Nav
        appearance={"subtle"}
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
  renderPanelBody() {
    return (
      <Container>
        <Content
          style={{
            padding: "0.2em 0.3em",
            minWidth: "55vw",
            maxHeight: "65vh",
            width: "55vw",
            padding: "1em",
          }}
        >
          {/* SEARCH */}
          {this.state.currentTab === "search" ? this.renderSearchBar() : null}
          {/* BODY */}
          <Container>{this.renderForecast()}</Container>
        </Content>
      </Container>
    );
  }

  // Component
  render() {
    return (
      <Container>
        <Content>
          <div
            style={{ position: "fixed", height: "100%", width: "100%" }}
            className={this.weatherClass()}
          ></div>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={24}>
              <div
                className={"App-splash"}
                style={{ background: "transparent" }}
              >
                {/* Fog Effect - for certain weather patterns */}
                {this.renderFog()}
                <Panel>
                  {/* City Nav */}
                  {this.renderPanelHeader()}
                  <br />
                  <br />
                  <br />
                  <br />
                  <Panel shaded bordered bodyFill className={"glitter swirl"}>
                    {/* Forecast */}
                    {this.renderPanelBody()}
                  </Panel>
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
