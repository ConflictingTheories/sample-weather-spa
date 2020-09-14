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

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;

    this.requestLocation = this.requestLocation.bind(this);
    this.requestLocation = this.isLocationPermissionGranted.bind(this);

    this.state = {
      position: this.store.position || null,
      location: this.store.location || {
        city: "",
        country: ""
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
          this.store.position = position;
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }

  // Fetch by Lat / Long
  async fetchByLatLng() {
    await this.requestLocation();
    if (this.store.position) {
      const result = await getForecastByLatLng(
        this.store.position.coords.latitude,
        this.store.position.coords.longitude
      );
      this.store.forecast = result;
    }
  }

  // Fetch by City Lookup
  async fetchByCity() {
    if (this.store.location) {
      const result = await getForecast(
        this.store.location.city,
        this.store.location.country
      );
      this.store.forecast = result;
    }
  }

  // Search Location if available
  async componentDidMount() {
    // Fetch Location on Load (if Permission Given)
    await this.fetchByLatLng();
  }

  renderDashboardTabs() {
    return (
      <React.Fragment>
        <Callout
          intent={Intent.SUCCESS}
          title={"Weather SPA Template - Loaded ✓"}
        >
          <Paragraph width={320} rows={3} />
        </Callout>
        <div>
          {this.store.position}
          {this.store.forecast}
        </div>
      </React.Fragment>
    );
  }

  async componentDidMount() {
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
