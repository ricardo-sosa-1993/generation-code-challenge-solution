import React from "react";
import { Row, Col, Nav, NavItem, Glyphicon, Navbar } from "react-bootstrap";

class Favorites extends React.Component {
	constructor(props) {
		super(props);
		this.renderFavorites = this.renderFavorites.bind(this);
	}

	renderFavorites() {
		return this.props.markers
			.filter(marker => {
				return marker.favorite})
			.map((favorite, index) => {
				return (
					<NavItem
						key={index}
						className="centerText"
						style={{ width: "100%" }}
						onClick={() => this.selectMarker(favorite)}
					>
						<Row>
							<Glyphicon className="favoriteIcon" glyph="star" />
						</Row>
						<Row>
							<h5>
								{favorite.name}
							</h5>
						</Row>
						<Row>
							{favorite.direccion}
						</Row>
					</NavItem>
				);
			});
	}

	selectMarker(favorite){
		this.props.selectMarker(favorite.key);
	}

	render() {
		return (
			<Col xs={12} md={3} className="noPadding favMaxHeight">
				<Navbar fluid inverse collapseOnSelect className="noPadding favMaxHeight" >
					<Navbar.Header>
						<Navbar.Brand>
							<h1>Favorite Stores</h1>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav bsStyle="pills" stacked  className="noPadding favMaxHeight">
							{this.renderFavorites()}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Col>
		);
	}
}

export default Favorites;
