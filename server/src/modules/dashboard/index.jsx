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
} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";

// BLUEPRINT STYLES
import {
  Button,
  Tabs,
  Tab,
  NonIdealState,
  Intent,
  Callout,
} from "@blueprintjs/core";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

import NavBar from "../../components/nav";
import SideMenu from "../../components/menu";

import { getForecastByLatLng, getForecast } from "../../services/weather";

// ASSETS & APP STYLES
import "../../styles/App.less";

// List of Countries
import countries from "../../assets/countries.json";

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // methods
    this.fetchByCity = this.fetchByCity.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.renderDashboardTabs = this.renderDashboardTabs.bind(this);
    // Store
    this.store = props.store;
    // State
    this.state = {
      position: this.store.position || null,
      location: this.store.location || {
        city: "",
        country: "",
      },
    };
  }

  // Request Location from Browser
  async requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          this.setState(position, () => {
            this.store.position = position;
          });
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }

  // Fetch by City Lookup
  async fetchByCity() {
    const { location } = this.state;
    if (location) {
      const result = await getForecast(location.city, location.country);
      this.setState({ forecase: result }, () => {
        this.store.forecast = result;
      });
    }
  }

  // Update Handler
  updateCity(x) {
    const { location } = this.state;
    location.city = x;
    this.setState({ location }, () => {
      this.store.location = location;
    });
  }

  // Handler
  updateCountry(x) {
    const { location } = this.state;
    location.country = x;
    this.setState({ location }, () => {
      this.store.location = location;
    });
  }

  // Search Location if available
  async componentDidMount() {
    // Fetch Location on Load (if Permission Given)
    await this.requestLocation();
    const { position } = this.state;
    if (position && position.coords) {
      const result = await getForecastByLatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.setState({ forecast: result }, () => {
        this.store.forecast = result;
      });
    }

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

  renderDashboardTabs() {
    const { location } = this.state;
    return (
      <React.Fragment>
        <Callout
          intent={Intent.SUCCESS}
          title={"Weather SPA Template - Loaded ✓"}
        >
          <Paragraph width={320} rows={3} />
        </Callout>
        <div>
          <label>City</label>
          <input value={location.city || ""} onChange={this.updateCity} />

          <label>Country</label>
          <select onChange={this.updateCountry}>
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

          <h1>Lookup for: {this.state.position} </h1>
          <p>{this.state.forecast}</p>
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
        {/* MEETING sidebar */}
      </div>
    );
  }
}

export default collect(Dashboard);
