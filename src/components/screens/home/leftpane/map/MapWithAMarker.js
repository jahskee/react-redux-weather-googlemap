import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from "react-redux";
import { updateCurrentLocation } from "../../../../redux/action/actions";

const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{
      lat: props.currentLocation.coordinate.lat,
      lng: props.currentLocation.coordinate.long
    }}
    center={{
      lat: props.currentLocation.coordinate.lat,
      lng: props.currentLocation.coordinate.long
    }}
  >
    <Marker
      position={{
        lat: props.currentLocation.coordinate.lat,
        lng: props.currentLocation.coordinate.long
      }}
    />
  </GoogleMap>
));

// ---------- Setup Redux -------------
const mapStateToProps = store => ({
  currentLocation: store.currentLocation,
  store
});

const mapDispatchToProps = {
  updateCurrentLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapWithAMarker);
