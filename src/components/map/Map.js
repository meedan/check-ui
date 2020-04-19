import PropTypes from 'prop-types';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import equal from 'fast-deep-equal';
import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: this.props.marker || {},
      center: null,
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { index, places } = this.props;

    if (index > -1 && index < places.length && index !== nextProps.index) {
      const marker = places[index];

      if (marker && this.map) {
        const { viewport, zoom, type } = marker;
        const { lat, lng } = type === 'marker' ? marker : marker.polygon[0];

        this.setState({ marker, center: { lat, lng }, zoom: zoom });

        this.map.panTo({ lat, lng });
        if (zoom) this.map.setZoom(zoom);
        if (viewport) {
          this.map.panToBounds(viewport);
        }

        // // this.map.setCenter({ lat, lng });
        // this.map.panTo({ lat, lng });
        // if (zoom) this.map.setZoom(zoom);
        // if (viewport) setTimeout(() => this.map.panToBounds(viewport), 500);
      }

      return false;
    }

    return !equal(this.props.places, nextProps.places);
  }

  onLoad = map => {
    this.map = map;
  };

  handleMarkerClick(time) {
    // FIXME
    // this.props.seekTo({ seekTo: time, transport: 'map' });
  }

  render() {
    const { places, isCompact } = this.props;
    const { marker } = this.state;

    let center = places
      .reduce(
        (acc, d) => {
          const coords = d.type === 'marker' ? [{ lat: d.lat, lng: d.lng }] : d.polygon;
          return [...coords, ...acc];
        },
        [{ lat: 0, lng: 0 }]
      )
      .reverse()
      .pop();

    if (this.state.center) center = this.state.center;
    if (marker && marker.lat && marker.lng) center = { lat: marker.lat, lng: marker.lng };

    if (this.map && this.map.center) center = this.map.center;

    let zoom = isCompact ? 10 : 2.5;
    if (this.state.zoom) center = this.state.zoom;

    return (
      <GoogleMap
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        onLoad={this.onLoad}
        options={{
          draggableCursor: 'grab',
          zoomControl: isCompact ? false : true,
          streetViewControl: isCompact ? false : true,
          mapTypeControl: isCompact ? false : true,
          scaleControl: isCompact ? false : true,
          rotateControl: isCompact ? false : true,
          fullscreenControl: isCompact ? false : true,
        }}
        zoom={zoom}>
        {places
          .filter(d => d.type === 'marker')
          .map(({ lat, lng, time }, i) => (
            <Marker
              key={`m-${i}`}
              draggable={false}
              // animation={window.google && window.google.maps.Animation.DROP}
              position={{ lat, lng }}
              // onClick={() => this.handleMarkerClick(time)}
            />
          ))}
        {this.props.places
          .filter(d => d.type === 'polygon')
          .map((polygon, i) => (
            <Polygon
              key={`p-${i}`}
              path={polygon.polygon}
              options={polygonOptions}
              // onClick={() => this.handleMarkerClick(polygon.time)}
            />
          ))}
      </GoogleMap>
    );
  }
}

const polygonOptions = {
  clickable: true,
  draggable: false,
  editable: false,
  fillColor: '000',
  fillOpacity: 0.1,
  geodesic: false,
  // strokeColor: color.brand, // FIXME @pio
  strokeOpacity: 1,
  strokeWeight: 2,
  zIndex: 1,
};

Map.propTypes = {
  index: PropTypes.number,
  places: PropTypes.array,
  isCompact: PropTypes.bool,
};

Map.defaultProps = {
  index: -1,
  places: [],
  isCompact: false,
};

export default Map;
