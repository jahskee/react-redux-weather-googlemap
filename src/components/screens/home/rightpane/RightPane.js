import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, NavLink } from "react-router-dom";

import WeatherToday from "./weather-today/WeatherToday";
import Forecast from "./forecast/Forecast";
import History from "./history/History";
import store from "../../../redux/store/store";
import * as actionRepo from "../../../redux/action/actions";

export const RightPane = () => {
  return (
    <div
      id="right-pane"
      style={{
        backgroundColor: "lightblue",

        padding: "5px 10px",
        height: "82vh"
      }}
    >
      <div>
        <WeatherToday />
      </div>
      <div
        id="nav-buttons"
        style={{ float: "left", clear: "both", marginBottom: "5px" }}
      >
        <NavButtons />
      </div>

      <div style={{ clear: "left" }}>
        <Route exact path="/" render={() => <Forecast />} />
        <Route path="/forecast" render={() => <Forecast />} />
        <Route path="/history" render={() => <History />} />
      </div>
    </div>
  );
};

const NavButtons = () => {
  const clickForecast = () => {
    store.dispatch(actionRepo.updateData({ buttons: ["selected-button", ""] }));
  };

  const clickHistory = () => {
    store.dispatch(actionRepo.updateData({ buttons: ["", "selected-button"] }));
  };

  const buttons = store.getState().data.buttons;
  return (
    <div>
      <NavLink to="/forecast/page1" style={{ padding: `5px` }}>
        <button className={buttons[0]} onClick={clickForecast}>
          Forecast
        </button>
      </NavLink>
      <NavLink to="/history/page1">
        <button className={buttons[1]} onClick={clickHistory}>
          History
        </button>
      </NavLink>
    </div>
  );
};
