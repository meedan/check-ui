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
    // if (this.props.currentTime !== nextProps.currentTime) {
    //   const marker = this.props.places.find(
    //     ({ time, duration }) =>
    //       time <= nextProps.currentTime &&
    //       nextProps.currentTime < time + duration
    //   );

    //   if (marker && this.map) {
    //     const { viewport, zoom, type } = marker;
    //     const { lat, lng } = type === 'marker' ? marker : marker.polygon[0];

    //     this.setState({ marker, center: { lat, lng }, zoom: zoom });

    //     this.map.panTo({ lat, lng });
    //     if (zoom) this.map.setZoom(zoom);
    //     if (viewport) {
    //       this.map.panToBounds(viewport);
    //     }

    //     // // this.map.setCenter({ lat, lng });
    //     // this.map.panTo({ lat, lng });
    //     // if (zoom) this.map.setZoom(zoom);
    //     // if (viewport) setTimeout(() => this.map.panToBounds(viewport), 500);
    //   }

    //   return false;
    // }

    return !equal(this.props.places, nextProps.places);
  }

  onLoad = map => {
    this.map = map;
  };

  handleMarkerClick(time) {
    this.props.seekTo({ seekTo: time, transport: 'map' });
  }

  render() {
    const { classes, places, id } = this.props;
    const { marker } = this.state;

    let center = places
      .reduce(
        (acc, d) => {
          const coords =
            d.type === 'marker' ? [{ lat: d.lat, lng: d.lng }] : d.polygon;
          return [...coords, ...acc];
        },
        [{ lat: 0, lng: 0 }]
      )
      .reverse()
      .pop();

    if (this.state.center) center = this.state.center;
    if (marker && marker.lat && marker.lng)
      center = { lat: marker.lat, lng: marker.lng };

    if (this.map && this.map.center) center = this.map.center;

    let zoom = this.props.isCompact ? 10 : 2.5;
    if (this.state.zoom) center = this.state.zoom;

    return (
      <GoogleMap
        center={center}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        onClick={this.props.switchMapDisplay}
        onLoad={this.onLoad}
        options={{
          draggableCursor: 'grab',
          zoomControl: this.props.isCompact ? false : true,
          streetViewControl: this.props.isCompact ? false : true,
          mapTypeControl: this.props.isCompact ? false : true,
          scaleControl: this.props.isCompact ? false : true,
          rotateControl: this.props.isCompact ? false : true,
          fullscreenControl: this.props.isCompact ? false : true,
        }}
        zoom={zoom}>
        {this.props.places
          .filter(d => d.type === 'marker')
          .map(({ lat, lng, time }, i) => (
            <Marker
              key={`m-${i}`}
              draggable={false}
              animation={window.google && window.google.maps.Animation.DROP}
              position={{ lat, lng }}
              onClick={() => this.handleMarkerClick(time)}
            />
          ))}
        {this.props.places
          .filter(d => d.type === 'polygon')
          .map((polygon, i) => (
            <Polygon
              key={`p-${i}`}
              path={polygon.polygon}
              options={polygonOptions}
              onClick={() => this.handleMarkerClick(polygon.time)}
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
  currentTime: PropTypes.number,
  places: PropTypes.array,
};

Map.defaultProps = {
  currentTime: 0,
  places: [],
};

export default Map;
