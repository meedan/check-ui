import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core/';

import EntityMapPopover from './EntityMapPopover';
// import EntityNameField from './EntityNameField';

const ElementAdornment = styled.div`
  visibility: hidden;
`;
const Element = styled.div`
  ${({ hasAdornment }) =>
    hasAdornment
      ? `
    ${ElementAdornment} {
      visibility: visible;
    }
  `
      : ''};
`;

class EntityControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flow: null,
    };
    if (this.props.entityType === 'place') this.anchorRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ flow: this.props.isCreating ? 'edit' : null });
  }

  startRename = () => {
    this.setState({ flow: 'edit' });
  };
  startDelete = () => {
    this.setState({ flow: 'delete' });
  };
  startReposition = () => {
    this.setState({ flow: 'reposition' });
  };
  stop = () => {
    this.setState({ flow: null });
  };

  onReposition = marker => {
    this.setState({ marker });
    console.log(
      'updateEntity reposition',
      this.props.entityName,
      this.state.marker
    );
    this.props.updateEntity(this.props.entityName, marker);
  };

  onRename = name => {
    this.setState({ flow: 'processing' }, () => {
      const { entityType, isCreating } = this.props;
      console.log('updateEntity rename', name, this.state.marker);
      this.props.updateEntity(name);
      console.log('onRename()', { isCreating });
      if (isCreating && entityType === 'place') {
        this.startReposition();
      } else {
        setTimeout(() => this.setState({ flow: null }), 1000);
      }
    });
  };
  onUpdate = name => {
    this.setState({ flow: 'processing' });
    console.log('updateEntity', name, this.state.marker);
    this.props.updateEntity(name, this.state.marker);
    setTimeout(() => this.setState({ flow: null }), 1000);
  };

  render() {
    const {
      classes,
      entityId,
      entityName,
      entityType,
      isCreating,
      startNewInstance,
      stopNewEntity,
      suggestions,
    } = this.props;

    const allowNewInstance =
      this.state.flow !== 'edit' && this.state.flow !== 'processing';

    // console.group('EntityControls');
    // console.log('state', this.state);
    // console.log('props', this.props);
    // console.groupEnd();

    const read = (
      <Grid
        alignItems="center"
        className={classes.Grid}
        container
        justify="space-between"
        wrap="nowrap">
        <Grid item>
          <Tooltip title={entityName}>
            <Typography
              color={
                this.state.flow === 'reposition' ? 'primary' : 'textSecondary'
              }>
              {entityName}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    );

    return (
      <Element ref={this.anchorRef}>
        {this.state.flow === 'reposition' ? (
          <EntityMapPopover
            anchorRef={this.anchorRef.current}
            marker={this.state.marker}
            isCreating={isCreating}
            onClose={this.stop}
            onSave={marker => this.onReposition(marker)}
            placeId={entityId}
            placeName={entityName}
            startPlaceRename={this.startRename}
            stopNewPlace={stopNewEntity}
          />
        ) : null}
      </Element>
    );
  }
}

EntityControls.propTypes = {
  classes: PropTypes.object,
  entityId: PropTypes.number,
  entityName: PropTypes.string,
  entityType: PropTypes.string,
  isCreating: PropTypes.string,
  startNewInstance: PropTypes.func,
  stopNewEntity: PropTypes.func,
  suggestions: PropTypes.array,
};

EntityControls.defaultProps = {};
