import React, { Component } from "react";
import Favorites from "./components/favorites";
import Map from "./components/map";
import Marker from "./components/marker";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { markers: [], favorites: [], selectedKey: null };
    this.getLocations = this.getLocations.bind(this);
    this.getMarker = this.getMarker.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.getLocations();
  }

  getLocations() {
    let favorites = this.getStoredFavorites();
    axios.get("http://localhost:4000/locations").then(response => {
      let locations = response.data.map((location, index) => {
        return {
          key: index,
          address: location.address,
          name: location.name,
          location: location.location,
          favorite: this.isInFavorites(favorites, location)
        };
      });
      this.setState({ markers: locations, favorites: this.getFavorites(locations)});
    });
  }

  isInFavorites(favorites, location) {
    if (favorites) {
      return Boolean(
        favorites.find(favorite => {
          return (
            favorite.location.lat === location.location.lat &&
            favorite.location.lng === location.location.lng
          );
        })
      );
    } else {
      return false;
    }
  }

  getFavorites(markers) {
    return markers.filter(marker =>  marker.favorite );
  }

  getMarker(array, marker) {
    return array.find(stateMarker => marker.key === stateMarker.key);
  }

  getStoredFavorites() {
    return JSON.parse(localStorage.getItem("favorite-stores"));
  }

  storeFavorites(favorites) {
    localStorage.setItem(
      "favorite-stores",
      JSON.stringify(favorites)
    );
  }

  addFavorite(marker) {
    let newMarkers = this.state.markers.slice();
    this.getMarker(newMarkers, marker).favorite = true;
    let favorites = this.getFavorites(newMarkers)
    this.storeFavorites(favorites);
    this.setState({ markers: newMarkers, favorites: favorites });
  }

  removeFavorite(marker) {
    let newMarkers = this.state.markers.slice();
    this.getMarker(newMarkers, marker).favorite = false;
    let favorites = this.getFavorites(newMarkers)
    this.storeFavorites(favorites);
    this.setState({ markers: newMarkers, favorites: favorites });
  }

  removeSelected() {
    this.setState({ selectedKey: null });
  }

  selectMarker(key) {
    this.setState({ selectedKey: key });
  }

  renderMarkers() {
    return this.state.markers.map(marker => {
      return (
        <Marker
          key={marker.key}
          marker={marker}
          addFavorite={marker => this.addFavorite(marker)}
          removeFavorite={marker => this.removeFavorite(marker)}
          removeSelected={() => this.removeSelected()}
        />
      );
    });
  }

  render() {
    return (
      <div className="noPadding maxHeight">
        <Favorites
          favorites={this.state.favorites}
          selectMarker={key => this.selectMarker(key)}
        />
        <Map selectedKey={this.state.selectedKey}>
          {this.renderMarkers()}
        </Map>
      </div>
    );
  }
}

export default App;
