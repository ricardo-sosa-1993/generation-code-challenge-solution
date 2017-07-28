import React from "react";
import { Col } from "react-bootstrap";
/*global google*/

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.renderChildren = this.renderChildren.bind(this);
	}
	componentDidMount() {
		this.map = new google.maps.Map(this.refs.map, {
			zoom: 13,
			center: {
				lat: 19.432608,
				lng: -99.133209
			}
		});
	}

	renderChildren() {
		const { children } = this.props;
		return React.Children.map(children, child => {
			return React.cloneElement(child, {
				map: this.map,
				selected: this.props.selectedKey === Number(child.key)
			});
		});
	}

	render() {
		return (
			<Col xs={12} md={9} className="noPadding maxHeight">
				<div ref="map" className="map">
					{this.renderChildren()}
				</div>
			</Col>
		);
	}
}

export default Map;
