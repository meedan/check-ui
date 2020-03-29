import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  row: {},
}));

export default function PlaceMap({ anchorRef, ...props }) {
  // const searchRef = useRef();
  const classes = useStyles();

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mode, setMode] = useState(null);
  const [zoom, setZoom] = useState(2.5);

  const onMapLoad = map => {
    console.log('onMapLoad');
    // this.map = map;

    // this.autocomplete = new window.google.maps.places.Autocomplete(this.searchRef.current, {});
    // this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    // this.map.addListener('idle', this.handleBoundsChanged);
    // // window.google.maps.event.trigger(this.searchRef.current, 'focus');

    // const { marker } = this.props;
    // if (!this.props.marker) {
    //   setTimeout(
    //     () =>
    //       this.searchRef.current.dispatchEvent(
    //         new KeyboardEvent('keydown', {
    //           keyCode: 40,
    //           which: 40,
    //           code: 'ArrowDown',
    //           key: 'ArrowDown',
    //         })
    //       ),
    //     500
    //   );
    // } else {
    //   const { type } = marker;
    //   const { lat, lng, viewport, zoom } = type === 'marker' ? marker : marker.polygon[0];

    //   setTimeout(() => {
    //     this.map.setCenter({ lat, lng });
    //     if (zoom) this.map.setZoom(zoom);
    //     this.map.panToBounds(viewport);
    //   }, 100);
    // }
  };

  const onMapClick = e => {
    if (mode === 'dropPin') {
      // const { lat, lng } = e.latLng;
      // this.setState({
      //   saved: false,
      //   marker: {
      //     lat: lat(),
      //     lng: lng(),
      //     type: 'marker',
      //   },
      // });
      console.log('onMapClick', 'dropPin', e);
    } else if (mode === 'drawPolygon') {
      // const { lat, lng } = e.latLng;
      // this.setState({
      //   saved: false,
      //   marker: {
      //     polygon: [...(this.state.marker.polygon || []), { lat: lat(), lng: lng() }],
      //     type: 'polygon',
      //   },
      // });
      console.log('onMapClick', 'drawPolygon', e);
    }
  };

  const polygonOptions = {
    clickable: true,
    draggable: false,
    editable: true,
    fillColor: '000',
    fillOpacity: 0.1,
    geodesic: false,
    strokeColor: 'orange',
    strokeOpacity: 1,
    strokeWeight: 2,
    zIndex: 1,
  };

  return (
    <GoogleMap
      id="entity-map"
      mapContainerStyle={{
        height: '240px',
        width: '400px',
      }}
      zoom={zoom}
      center={center}
      onClick={onMapClick}
      onLoad={onMapLoad}
      options={{
        draggableCursor: mode ? 'crosshair' : 'grab',
        mapTypeControl: false,
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google && window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
      }}
    />
  );
}
