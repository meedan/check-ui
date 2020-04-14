import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import mean from 'lodash/mean';
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

import './MapControls.css';

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

const getCenter = shape => {
  if (shape && shape.type === 'marker') {
    return { lat: shape.lat, lng: shape.lng };
  } else if (shape && shape.type === 'polygon') {
    const meanLat = mean(shape.polygon.map(o => o.lat));
    const meanLng = mean(shape.polygon.map(o => o.lng));
    return { lat: meanLat, lng: meanLng };
  }
  return { lat: 0, lng: 0 };
};

export default function MapControls({ anchorRef, entityName, entityShape, ...props }) {
  const inputRef = useRef();
  const classes = useStyles();

  let mapInstance;
  let autocompleteInstance;

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [loadedShape, setLoadedShape] = useState(null);
  const [mode, setMode] = useState(null);
  const [shape, setShape] = useState(null);
  const [viewport, setViewport] = useState(3);
  const [zoom, setZoom] = useState(3);

  // a couple of things necessary for the map init

  const onPlaceSelect = e => {
    // when place gets selected via autocomplete (input field aka inputRef)
    const place = autocompleteInstance.getPlace();
    if (place && place.geometry) {
      console.log({ place });
      mapInstance.fitBounds(place.geometry.viewport.toJSON());
    }
  };

  const onBoundsChanged = () => {
    // when map view changes (zoom/viewport)
    const viewport = mapInstance.getBounds().toJSON();
    setViewport(viewport);
    const zoom = mapInstance.getZoom();
    setZoom(zoom);
  };

  // init map

  const onMapLoad = map => {
    if (!window.google.maps.places) return;
    autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {});
    autocompleteInstance.addListener('place_changed', onPlaceSelect);
    mapInstance = map;
    mapInstance.addListener('idle', onBoundsChanged);
    // window.google.maps.event.trigger(inputRef.current, 'focus'); // TODO: test this
  };

  // switch between map drawing modes

  const onToggleMarkerMode = () => {
    setShape(null);
    setMode('marker');
  };

  const onTogglePolygonMode = () => {
    setShape(null);
    setMode('polygon');
  };

  // Map interaction (polygon AND marker)

  const onMapClick = e => {
    const { lat, lng } = e.latLng;
    if (mode === 'marker') {
      setShape({
        // ...shape,
        lat: lat(),
        lng: lng(),
        type: 'marker',
      });
    } else if (mode === 'polygon') {
      setShape({
        // ...shape,
        polygon: [...(shape && shape.polygon ? shape.polygon : []), { lat: lat(), lng: lng() }],
        type: 'polygon',
      });
    }
  };

  // On shape change

  const onMarkerPositionChange = () => {
    if (!loadedShape) return null;
    if (!loadedShape.getPosition || loadedShape.getPosition === undefined) return null;
    const { lat, lng } = loadedShape.getPosition();
    if (shape.lat !== lat() && shape.lng !== lng())
      setShape({
        lat: lat(),
        lng: lng(),
        type: 'marker',
        viewport: viewport,
        zoom: zoom,
      });
  };
  const onPolygonPositionChange = () => {
    if (!loadedShape) return null;
    const polygon = loadedShape
      .getPath()
      .getArray()
      .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));
    setShape({
      polygon: polygon,
      type: 'polygon',
    });
  };

  // Discard / Confirm

  const onDiscard = () => {
    // onClick={this.props.isCreating ? this.props.stopNewPlace : this.props.onDiscard}
    props.onDiscard();
  };
  const onConfirm = () => {
    props.onUpdate({
      ...shape,
      viewport: viewport,
      zoom: zoom,
    });
    setMode(null);
  };

  // Effects & co.

  useEffect(() => {
    if (!entityShape) return null;
    setCenter(getCenter(entityShape));
    setShape(entityShape);
    setZoom(entityShape.zoom);
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
      const { lat, lng } = shape.type === 'marker' ? shape : shape.polygon[0];
      setCenter({ lat, lng });
    }
  }, [mapInstance]);

  // console.group('MapControls.js');
  // console.log('center', center);
  // console.groupEnd();

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
                <IconButton onClick={props.onBeforeRename} className={classes.iconButton}>
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
                    color={mode === 'marker' ? 'primary' : 'inherit'}
                    // disabled={!mode || mode === 'polygon' ? false : true}
                    onClick={onToggleMarkerMode}>
                    <AddLocationIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Mark area">
                <span>
                  <IconButton
                    className={classes.iconButton}
                    color={mode === 'polygon' ? 'primary' : 'inherit'}
                    // disabled={!mode || mode === 'marker' ? false : true}
                    onClick={onTogglePolygonMode}>
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
        center={center}
        onClick={onMapClick}
        onLoad={map => onMapLoad(map)}
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
            onLoad={polygon => setLoadedShape(polygon)}
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
            onMouseUp={onPolygonPositionChange}
          />
        ) : null}
        {shape && shape.type === 'marker' ? (
          <Marker
            animation={window.google && window.google.maps.Animation.DROP}
            draggable={mode === 'marker'}
            onLoad={marker => setLoadedShape(marker)}
            onPositionChanged={onMarkerPositionChange}
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
