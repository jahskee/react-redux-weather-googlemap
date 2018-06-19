/* jshint esversion: 6 */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
//import { loadState, saveState } from "./util/persist";
import * as utils from "../../utils/utils";

import * as actionRepo from "../action/actions";

import rootReducer from "../reducer/reducers";

export function configureStore() {
  // const persistedState = loadState();
  const persistedState = {};
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk, createLogger())
  );
  return store;
}

const store = configureStore();

/*
store.subscribe(() => {
  saveState(store.getState());
});
*/

//if (store.getState().searchLocation === undefined) {

const lat = 38.8473;
const long = -77.0588;
const address = "Alexandria, VA, USA";

let currentDay = new Date();
currentDay.setDate(currentDay.getDate() + 1);

const pageNo = 1;
const today = new Date();

// apply styling to buttons
let buttons = ["selected-button", ""];
if (window.location.pathname.startsWith("/history")) {
  buttons = ["", "selected-button"];
}

// pages[0] is unused
let forecastPages = utils.generateEmptyArray(7);
forecastPages[1] = "selected-button";

// pages[0] is unused
let pastPages = utils.generateEmptyArray(7);
pastPages[1] = "selected-button";

store.dispatch(actionRepo.updateData({ buttons, forecastPages, pastPages }));

// initial redux data for current weather
store.dispatch(
  actionRepo.updateCurrentLocation({ coordinate: { lat, long }, address })
);
store.dispatch(actionRepo.updateCurrentWeather({ lat, long }, currentDay)); // current Weather

loadPreviousWeathers(pageNo, today);
loadFutureWeathers(pageNo, today);

function loadPreviousWeathers(pageNo, today) {
  // initial redux data for previous weathers
  let pastDates = utils.getPrevious30Dates(today);
  pastDates = utils
    .paginateRecords(pastDates) // ser config.recordsPerPage
    .filter(date => date.page === pageNo);

  pastDates.forEach(date => {
    store.dispatch(
      actionRepo.updatePastWeather({ lat, long }, date.date, pageNo)
    ); // current Weather
  });
}

function loadFutureWeathers(pageNo, today) {
  // initial redux data for future weathers
  let futureDates = utils.getFuture30Dates(today);
  futureDates = utils
    .paginateRecords(futureDates) // ser config.recordsPerPage
    .filter(date => date.page === pageNo);

  futureDates.forEach(date => {
    store.dispatch(
      actionRepo.updateFutureWeather({ lat, long }, date.date, pageNo)
    ); // current Weather
  });
}
//}

export default store;
