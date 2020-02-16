import Popover from 'material-ui-popup-state/HoverPopover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import React, { Component } from 'react';
import styled from 'styled-components';
import { array, func, object, string } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import EntityDeleteModal from './EntityDeleteModal';
import EntityMapPopover from './EntityMapPopover';
import EntityNameField from './EntityNameField';

const styles = {
  Grid: {
    marginLeft: '12px',
    marginRight: '12px',
    width: '200px',
  },
  Typography: {
    maxWidth: '160px',
  },
  CircularProgress: {
    position: 'relative',
    left: '-8px',
  },
};

const ElementAdornment = styled.div`
  visibility: hidden;
`;
const Element = styled.div`
  cursor: pointer;
  width: 224px;
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
    if (this.props.entityType === 'location') this.anchorRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ flow: this.props.isCreating ? 'edit' : null });
  }

  startHover = () => {
    const { flow } = this.state;
    if (flow) return null;
    this.setState({ flow: 'hover' });
  };
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
    console.log('updateEntity reposition', this.props.entityName, this.state.marker);
    this.props.updateEntity(this.props.entityName, marker);
  };

  onRename = name => {
    this.setState({ flow: 'processing' }, () => {
      const { entityType, isCreating } = this.props;
      console.log('updateEntity rename', name, this.state.marker);
      this.props.updateEntity(name);
      console.log('onRename()', { isCreating });
      if (isCreating && entityType === 'location') {
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
  onDelete = name => {
    this.setState({ flow: 'processing' });
    setTimeout(() => {
      this.props.deleteEntity();
      this.setState({ flow: null });
    }, 1000);
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

    const allowNewInstance = this.state.flow !== 'edit' && this.state.flow !== 'processing';

    // console.group('EntityControls');
    // console.log('state', this.state);
    // console.log('props', this.props);
    // console.groupEnd();

    const read = (
      <Grid alignItems="center" className={classes.Grid} container justify="space-between" wrap="nowrap">
        <Grid item>
          {entityName ? (
            <Tooltip title={entityName} enterDelay={750}>
              <Typography
                className={classes.Typography}
                color={this.state.flow === 'reposition' ? 'primary' : 'textSecondary'}
                noWrap
                variant="body2">
                {entityName}
              </Typography>
            </Tooltip>
          ) : (
            <Typography
              className={classes.Typography}
              color={this.state.flow === 'reposition' ? 'primary' : 'textSecondary'}
              noWrap
              variant="body2">
              {entityName}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <ElementAdornment onClick={e => e.stopPropagation()}>
            {this.state.flow === 'processing' ? (
              <CircularProgress size={18} className={classes.CircularProgress} />
            ) : (
              <PopupState variant="popover" popupId="moreEntityControls">
                {popupState => (
                  <div>
                    <IconButton {...bindHover(popupState)} aria-label="Options…">
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      disableRestoreFocus>
                      <List dense onClick={popupState.close}>
                        <ListItem button onClick={() => this.startRename()}>
                          <ListItemText>Rename</ListItemText>
                        </ListItem>
                        {entityType === 'location' ? (
                          <ListItem button onClick={() => this.startReposition()}>
                            <ListItemText>Reposition</ListItemText>
                          </ListItem>
                        ) : null}
                        <ListItem button onClick={() => this.startDelete()}>
                          <ListItemText>Delete</ListItemText>
                        </ListItem>
                      </List>
                    </Popover>
                  </div>
                )}
              </PopupState>
            )}
          </ElementAdornment>
        </Grid>
      </Grid>
    );
    const edit = (
      <EntityNameField
        name={entityName}
        onCancel={isCreating ? stopNewEntity : this.stop}
        onSubmit={this.onRename}
        suggestions={suggestions}
      />
    );

    return (
      <Element
        hasAdornment={this.state.flow && this.state.flow !== 'reposition' && this.state.flow !== 'delete'}
        onClick={allowNewInstance ? startNewInstance : null}
        onMouseEnter={this.startHover}
        onMouseLeave={this.state.flow === 'hover' ? this.stop : null}
        ref={this.anchorRef}>
        {this.state.flow !== 'edit' ? read : edit}
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
        {this.state.flow === 'delete' ? (
          <EntityDeleteModal
            name={entityName}
            onCancel={this.stop}
            onConfirm={this.onDelete}
            title={`Delete ${entityType}`}
          />
        ) : null}
      </Element>
    );
  }
}

EntityControls.propTypes = {
  classes: object,
  entityId: string,
  entityName: string,
  entityType: string,
  isCreating: string,
  startNewInstance: func,
  stopNewEntity: func,
  suggestions: array,
};

EntityControls.defaultProps = {};

export default withStyles(styles)(EntityControls);
