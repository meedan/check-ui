import React, { Component } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import equal from 'fast-deep-equal';

import { withStyles } from '@material-ui/core/styles';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const Separator = styled.span`
  border-left: 1px solid ${grey[200]};
  display: inline-block;
  height: 18px;
  margin-left: 4px;
  margin-right: 4px;
  width: 1px;
`;

const styles = {
  Button: {
    height: 28,
    minWidth: 'auto',
    width: 32,
  },
  Input: {
    padding: 8,
    fontSize: '13px',
  },
  SaveIcon: {
    fontSize: '22px',
    position: 'relative',
    top: '-3px',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class PlaceMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawPolygon: !!this.props.marker && this.props.marker.type === 'polygon',
      dropPin: !!this.props.marker && this.props.marker.type === 'marker',
      saved: !this.props.marker,
      marker: this.props.marker ? this.props.marker : {},
      placeName: this.props.placeName,
    };

    this.searchRef = React.createRef();
  }

  handlePlaceSelect = e => {
    const place = this.autocomplete.getPlace();
    if (place && place.geometry) {
      this.map.fitBounds(place.geometry.viewport.toJSON());
      const { lat, lng } = place.geometry.location;
      this.setState({
        dropPin: false,
        marker: {
          lat: lat(),
          lng: lng(),
          viewport: place.geometry.viewport.toJSON(),
          type: 'marker',
        },
        saved: false,
      });
    }
  };

  handleBoundsChanged = e => {
    const viewport = this.map.getBounds().toJSON();
    const zoom = this.map.getZoom();
    this.setState({ viewport, zoom });
    return true;
  };

  onLoad = map => {
    this.map = map;

    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.searchRef.current,
      {}
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    this.map.addListener('idle', this.handleBoundsChanged);
    // window.google.maps.event.trigger(this.searchRef.current, 'focus');

    const { marker } = this.props;
    if (!this.props.marker) {
      setTimeout(
        () =>
          this.searchRef.current.dispatchEvent(
            new KeyboardEvent('keydown', {
              keyCode: 40,
              which: 40,
              code: 'ArrowDown',
              key: 'ArrowDown',
            })
          ),
        500
      );
    } else {
      const { type } = marker;
      const { lat, lng, viewport, zoom } =
        type === 'marker' ? marker : marker.polygon[0];

      setTimeout(() => {
        this.map.setCenter({ lat, lng });
        if (zoom) this.map.setZoom(zoom);
        this.map.panToBounds(viewport);
      }, 100);
    }
  };

  toggleDropPin = () => {
    this.setState({ dropPin: true, drawPolygon: false, marker: {} });
  };

  toggleDrawPolygon = () => {
    this.setState({ dropPin: false, drawPolygon: true, marker: {} });
  };

  saveCurrent = () => {
    let marker = null;

    if (this.state.marker.type === 'marker' && this.marker) {
      const { lat, lng } = this.marker.getPosition();

      marker = {
        lat: lat(),
        lng: lng(),
        type: 'marker',
        viewport: this.state.viewport,
        zoom: this.state.zoom,
      };

      this.setState({
        drawPolygon: false,
        dropPin: false,
        saved: true,
        marker,
      });
    } else if (this.state.marker.type === 'polygon' && this.polygon) {
      const polygon = [];
      this.polygon
        .getPath()
        .forEach(({ lat, lng }) => polygon.push({ lat: lat(), lng: lng() }));

      marker = {
        polygon: polygon,
        type: 'polygon',
        viewport: this.state.viewport,
      };

      this.setState({
        drawPolygon: false,
        dropPin: false,
        saved: true,
        marker,
      });
    } else {
      this.setState({
        drawPolygon: false,
        dropPin: false,
        saved: true,
      });
    }

    this.props.onSave(marker);
    this.props.onClose();
  };

  handleMapClick = e => {
    if (this.state.dropPin) {
      const { lat, lng } = e.latLng;
      this.setState({
        saved: false,
        marker: {
          lat: lat(),
          lng: lng(),
          type: 'marker',
        },
      });
    }

    if (this.state.drawPolygon) {
      const { lat, lng } = e.latLng;
      this.setState({
        saved: false,
        marker: {
          polygon: [
            ...(this.state.marker.polygon || []),
            { lat: lat(), lng: lng() },
          ],
          type: 'polygon',
        },
      });
    }
  };

  handleMarkerUpdate = () => {
    setTimeout(() => {
      const { lat, lng } = this.marker.getPosition();
      const lt = lat();
      const lg = lng();

      if (lt !== this.state.marker.lat && lg !== this.state.marker.lng) {
        this.setState({
          marker: {
            lat: lat(),
            lng: lng(),
            type: 'marker',
          },
        });
      }
    }, 0);
  };

  setStep(step) {
    this.setState({ step: step });
  }

  render() {
    const { classes } = this.props;
    const { dropPin, drawPolygon, marker } = this.state;

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

    let center = { lat: 0, lng: 0 };
    if (this.state.center) center = this.state.center;
    if (marker && marker.lat && marker.lng)
      center = { lat: marker.lat, lng: marker.lng };
    if (marker && marker.polygon && marker.polygon.length > 0)
      center = { lat: marker.polygon[0].lat, lng: marker.polygon[0].lng };

    if (this.map && this.map.center) center = this.map.center;

    let zoom = this.marker && this.marker.zoom ? this.marker.zoom : 2.5;
    return (
      <Popper
        placement="bottom-start"
        anchorEl={this.props.anchorRef}
        open
        modifiers={{
          offset: {
            offset: '0, -100%',
          },
        }}
        onClick={e => e.stopPropagation()}
        onEscapeKeyDown={this.props.isCreating}>
        <Paper square>
          <TextField
            autoFocus
            defaultValue={this.state.placeName}
            fullWidth
            inputRef={this.searchRef}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                console.log('trigger search?');
              }
            }}
            placeholder="Find location…"
            InputProps={{
              classes: {
                root: classes.Input,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Change name…">
                    <IconButton onClick={this.props.startPlaceRename}>
                      <KeyboardBackspaceIcon
                        fontSize="small"
                        color="disabled"
                      />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Separator />
                  <Tooltip title="Drop a pin">
                    <IconButton
                      color={
                        dropPin && marker.type !== 'marker'
                          ? 'primary'
                          : 'secondary'
                      }
                      onClick={this.toggleDropPin}>
                      <AddLocationIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Mark an area">
                    <IconButton
                      color={
                        drawPolygon && marker.type !== 'polygon'
                          ? 'primary'
                          : 'secondary'
                      }
                      onClick={this.toggleDrawPolygon}>
                      <FormatShapesIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Separator />
                  {!equal(
                    { ...this.state.marker, viewport: this.state.viewport },
                    this.props.marker
                  ) ? (
                    <Tooltip title="Save location">
                      <Button
                        disabled={this.state.saved}
                        className={classes.Button}
                        color="primary"
                        onClick={this.saveCurrent}
                        variant="contained">
                        <CheckIcon
                          fontSize="small"
                          className={classes.SaveIcon}
                        />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Close">
                      <IconButton
                        onClick={
                          this.props.isCreating
                            ? this.props.stopNewPlace
                            : this.props.onClose
                        }>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
          />

          <GoogleMap
            id={`map-${this.props.placeId}`}
            mapContainerStyle={{
              height: '240px',
              width: '400px',
            }}
            zoom={zoom}
            center={center}
            onClick={this.handleMapClick}
            onLoad={this.onLoad}
            options={{
              draggableCursor:
                this.state.dropPin || this.state.drawPolygon
                  ? 'crosshair'
                  : 'grab',
              mapTypeControl: false,
              streetViewControl: true,
              streetViewControlOptions: {
                position:
                  window.google &&
                  window.google.maps.ControlPosition.LEFT_BOTTOM,
              },
            }}>
            {this.state.marker.type === 'polygon' &&
            this.state.marker.polygon.length > 0 ? (
              <Polygon
                key="poly"
                editable={this.state.drawPolygon}
                path={this.state.marker.polygon}
                onLoad={polygon => (this.polygon = polygon)}
                options={polygonOptions}
              />
            ) : null}
            {this.state.marker.type === 'marker' ? (
              <Marker
                key="marker"
                draggable={this.state.dropPin}
                animation={window.google && window.google.maps.Animation.DROP}
                position={{
                  lat: this.state.marker.lat,
                  lng: this.state.marker.lng,
                }}
                onLoad={marker => (this.marker = marker)}
                onPositionChanged={this.handleMarkerUpdate}
              />
            ) : null}
          </GoogleMap>
        </Paper>
      </Popper>
    );
  }
}

export default withStyles(styles)(PlaceMap);
