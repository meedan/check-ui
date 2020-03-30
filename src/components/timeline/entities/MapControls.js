import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';

import AddLocationIcon from '@material-ui/icons/AddLocation';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  input: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  iconButton: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    minWidth: 'auto',
  },
  divider: {
    height: theme.spacing(3),
  },
}));

export default function MapControls({ anchorRef, entityName, entityShape, ...props }) {
  const mapRef = useRef();
  const inputRef = useRef();
  const classes = useStyles();

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [shape, setShape] = useState(null);
  const [mode, setMode] = useState(null);
  const [zoom, setZoom] = useState(2.5);

  const onMapLoad = map => {
    setMap(map);

    // this.map = map;
    // this.autocomplete = new window.google.maps.places.Autocomplete(this.inputRef.current, {});
    // this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    // this.map.addListener('idle', this.handleBoundsChanged);
    // // window.google.maps.event.trigger(this.inputRef.current, 'focus');
  };

  const onMapClick = e => {
    const { lat, lng } = e.latLng;
    if (mode === 'marker') {
      setShape({
        lat: lat(),
        lng: lng(),
        type: 'marker',
      });
    } else if (mode === 'polygon') {
      setShape({
        polygon: [...(shape && shape.polygon ? shape.polygon : []), { lat: lat(), lng: lng() }],
        type: 'polygon',
      });
    }
  };

  const onBeforeRename = () => {
    console.log('onBeforeRename');
    props.onBeforeRename();
  };
  const onBeforePinDrop = () => {
    setShape(null);
    setMode('marker');
  };
  const onBeforePolygonDraw = () => {
    setShape(null);
    setMode('polygon');
  };
  const onDiscard = () => {
    // onClick={this.props.isCreating ? this.props.stopNewPlace : this.props.onDiscard}
    props.onDiscard();
  };
  const onConfirm = () => {
    props.onUpdate({ ...shape, viewport: viewport, zoom: zoom });
    setMode(null);
    setShape(null);
  };

  const onMarkerPositionChanged = args => {
    console.log('onMarkerPositionChanged', args);
  };

  const getCenter = () => {
    if (shape) {
      return shape.type === 'marker'
        ? { lat: shape.lat, lng: shape.lng }
        : { lat: shape.polygon[0].lat, lng: shape.polygon[0].lng };
    } else {
      return center;
    }
  };

  useEffect(() => {
    console.log({ mapRef });
    // this.map = map;
    // this.autocomplete = new window.google.maps.places.Autocomplete(this.inputRef.current, {});
    // this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    // this.map.addListener('idle', this.handleBoundsChanged);
    // // window.google.maps.event.trigger(this.inputRef.current, 'focus');
  }, [mapRef]);

  useEffect(() => {
    setShape(entityShape);
  }, [entityShape]);

  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);

  useEffect(() => {
    if (!shape) {
      inputRef.current.dispatchEvent(
        new KeyboardEvent('keydown', {
          keyCode: 40,
          which: 40,
          code: 'ArrowDown',
          key: 'ArrowDown',
        })
      );
    } else {
      const { type } = shape;
      const { lat, lng, viewport, zoom } = type === 'marker' ? shape : shape.polygon[0];
      setCenter({ lat, lng });
      setZoom(zoom);
      // this.map.panToBounds(viewport);
    }
  }, [map]);

  console.group('MapControls.js');
  // console.log('entityShape', entityShape);
  console.log('shape:', shape);
  console.groupEnd();

  const displayShape = shape ? shape : entityShape;

  return (
    <>
      <TextField
        autoFocus
        fullWidth
        inputRef={inputRef}
        defaultValue={entityName}
        InputProps={{
          classes: {
            root: classes.input,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Rename location…">
                <IconButton onClick={onBeforeRename} className={classes.iconButton}>
                  <KeyboardBackspaceIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Divider orientation="vertical" className={classes.divider} />
              <Tooltip title="Mark precise location">
                <span>
                  <IconButton
                    className={classes.iconButton}
                    color={mode === 'marker' ? 'primary' : 'default'}
                    disabled={!mode || mode === 'polygon' ? false : true}
                    onClick={onBeforePinDrop}>
                    <AddLocationIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Mark area">
                <span>
                  <IconButton
                    className={classes.iconButton}
                    color={mode === 'polygon' ? 'primary' : 'default'}
                    disabled={!mode || mode === 'marker' ? false : true}
                    onClick={onBeforePolygonDraw}>
                    <FormatShapesIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Divider orientation="vertical" className={classes.divider} />
              {mode ? (
                <Tooltip title="Save">
                  <IconButton className={classes.iconButton} color="primary" onClick={onConfirm} variant="contained">
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Discard">
                  <IconButton onClick={onDiscard} className={classes.iconButton}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </InputAdornment>
          ),
        }}
        placeholder="Locate place…"
        size="medium"
      />
      <GoogleMap
        id="entity-map"
        mapContainerStyle={{
          height: '240px',
          width: '400px',
        }}
        zoom={zoom}
        center={getCenter()}
        onClick={onMapClick}
        onLoad={onMapLoad}
        ref={mapRef}
        options={{
          draggableCursor: mode ? 'crosshair' : 'grab',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          streetViewControlOptions: {
            position: window.google && window.google.maps.ControlPosition.LEFT_BOTTOM,
          },
        }}>
        {shape && shape.type === 'polygon' && shape.polygon.length > 0 ? (
          <Polygon
            editable={mode === 'polygon'}
            // onLoad={polygon => (this.polygon = polygon)}
            options={{
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
            }}
            path={shape.polygon}
          />
        ) : null}
        {shape && shape.type === 'marker' ? (
          <Marker
            animation={window.google && window.google.maps.Animation.DROP}
            draggable={mode === 'marker'}
            // onLoad={marker => (this.marker = marker)}
            // onPositionChanged={onMarkerPositionChanged}
            position={{
              lat: shape.lat,
              lng: shape.lng,
            }}
          />
        ) : null}
      </GoogleMap>
    </>
  );
}

MapControls.propTypes = {
  entityName: PropTypes.string,
  onBeforeRename: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
