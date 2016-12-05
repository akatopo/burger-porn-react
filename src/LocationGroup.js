/* global window: false */

import React, { Component } from 'react';
import { createFocusLostObservable } from './observables';

const API_KEY = 'AIzaSyCOmQoeVtIKV5xyAVIe3BnFFejQgHEjv0I';
const maps = require('google-maps-api')(API_KEY, ['places'])();

class LocationGroup extends Component {
  componentDidMount() {
    const { loc } = this.props;

    createFocusLostObservable(this.groupRef)
      .forEach((/* target */) => {
        const { isExpanded, onFocusLost } = this.props;
        if (isExpanded) {
          onFocusLost();
        }
      });

    maps
      .then((mapsApi) => {
        this.loadMap(mapsApi, loc);
      })
      .catch((err) => window.console.error(err));
  }

  componentDidUpdate(prevProps) {
    const oldLoc = prevProps.loc;
    const { loc } = this.props;

    if (oldLoc.placeId === loc.placeId) {
      return;
    }

    maps
      .then((mapsApi) => {
        this.loadMap(mapsApi, loc);
      })
      .catch((err) => window.console.error(err));
  }

  loadMap(mapsApi, loc) {
    if (!loc) {
      return;
    }

    let latLong = loc.latLong.map(parseFloat);
    latLong = new mapsApi.LatLng(latLong[0], latLong[1]);
    const mapDiv = this.mapRef;
    const map = new mapsApi.Map(mapDiv, {
      center: latLong,
      zoom: 17,
      mapTypeId: mapsApi.MapTypeId.ROADMAP,
      navigationControl: true,
      navigationControlOptions: {
        style: mapsApi.NavigationControlStyle.SMALL,
      },
    });
    const request = { placeId: loc.placeId };
    const infowindow = new mapsApi.InfoWindow();
    const placesService = new mapsApi.places.PlacesService(map);

    placesService.getDetails(request, placeHandler.bind(undefined, loc));

    function placeHandler(fallbackLoc, place, status) {
      const placeStatus = status === mapsApi.places.PlacesServiceStatus.OK;
      const name = placeStatus ? place.name : fallbackLoc.name;
      const address = placeStatus ? place.formatted_address : fallbackLoc.address;
      const marker = new mapsApi.Marker({
        map,
        position: place.geometry.location,
      });

      infowindow.setContent(
        `<p class="u-bold u-titleCase">${name}</p>
         <p class="u-titleCase">${address}</p>`
      );

      const openInfoWindow = infowindow.open.bind(infowindow, map, marker);
      openInfoWindow();
      mapsApi.event.addListener(marker, 'click', openInfoWindow);
    }
  }

  render() {
    const { isExpanded, onClick } = this.props;

    return (
      <div
        className={`bp-location-group bp-popoverContainer ${isExpanded ? 'is-expanded' : ''}`}
        ref={(node) => (this.groupRef = node)}
      >
        <button
          className="bp-btn bp-btn--round"
          onClick={onClick}
        >
          <svg className="bp-svg location-icon">
            <use xlinkHref="#location-icon" />
          </svg>
        </button>
        <div className="bp-banner bp-popover bp-popover--bottomRight">
          <div className="bp-map" ref={(node) => (this.mapRef = node)} />
        </div>
      </div>
    );
  }
}

export default LocationGroup;
