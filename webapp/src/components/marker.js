import React from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
/*global google*/

const defaultIcon = "http://maps.google.com/mapfiles/marker.png";
const favIcon = "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png";

export default class Marker extends React.Component {
	constructor(props) {
		super(props);
		this.renderInfoWindow = this.renderInfoWindow.bind(this);
		this.addFavorite = this.addFavorite.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		this.renderFavoriteButton = this.renderFavoriteButton.bind(this);
	}

	componentDidMount() {
		this.marker = new google.maps.Marker({
			position: this.props.marker.location,
			map: this.props.map,
			icon: this.props.marker.favorite ? favIcon : defaultIcon
		});

		this.infoWindow = new google.maps.InfoWindow({
			content: ReactDOM.render(
				this.renderInfoWindow(),
				document.createElement("div")
			)
		});
		this.marker.addListener("click", () => {
			this.infoWindow.open(this.props.map, this.marker);
		});
	}

	componentDidUpdate(prevProps) {
		let div = document.createElement("div");
		ReactDOM.render(this.renderInfoWindow(), div);
		this.infoWindow.setContent(div);
		if (this.props.selected) {
			this.infoWindow.open(this.props.map, this.marker);
			this.props.map.setCenter(this.marker.getPosition());
			this.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(() => {
				this.marker.setAnimation(null);
			}, 1500);
		} else this.infoWindow.close();
	}

	renderInfoWindow() {
		return (
			<div>
				<h3>
					{this.props.marker.name}
				</h3>
				<p>
					{this.props.marker.address}
				</p>
				{this.renderFavoriteButton()}
			</div>
		);
	}

	renderFavoriteButton() {
		if (this.props.marker.favorite) {
			return (
				<Button bsStyle="danger" onClick={this.removeFavorite}>
					Remove from favorites
				</Button>
			);
		} else {
			return (
				<Button bsStyle="primary" onClick={this.addFavorite}>
					Add to favorites
				</Button>
			);
		}
	}

	addFavorite() {
		this.infoWindow.close();
		this.marker.setIcon(favIcon);
		this.props.addFavorite(this.props.marker);
	}

	removeFavorite() {
		this.infoWindow.close();
		this.marker.setIcon(defaultIcon);
		if (this.props.selected) this.props.removeSelected();
		this.props.removeFavorite(this.props.marker);
	}

	render() {
		return null;
	}
}
