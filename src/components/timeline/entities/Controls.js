import Menu from 'material-ui-popup-state/HoverMenu';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import find from 'lodash/find';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import DeleteModal from './DeleteModal';
import MapPopover from './MapPopover';
import NameField from './NameField';
import config from '../utils/config';

const useStyles = makeStyles(theme => ({
  controlsRoot: {
    cursor: 'pointer',
    width: `${config.TIMELINE_OFFSET}px`,
  },
  readGrid: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    width: `${config.TIMELINE_OFFSET - theme.spacing(3)}px`,
  },
  entityName: {
    maxWidth: `${config.TIMELINE_OFFSET - theme.spacing(8)}px`,
  },
  circularProgress: {
    left: `${theme.spacing(1) * -1}px`,
    top: `${theme.spacing(0.5)}px`,
    position: 'relative',
  },
}));

export default function Controls(props) {
  const classes = useStyles();
  const controlsRootRef = useRef();

  const {
    currentTime,
    duration,
    entityName,
    entityType,
    instances,
    sliderRect,
    suggestions,
  } = props;

  const [controlsFlow, setControlsFlow] = useState('read');
  const [newName, setNewName] = useState(null);

  const morePopupState = usePopupState({
    variant: 'popover',
    popupId: 'moreMenu',
  });

  const allowNewInstance = ['edit', 'processing'].indexOf(controlsFlow) < 0;
  const showAddornment =
    ['read', 'reposition', 'delete'].indexOf(controlsFlow) < 0;

  const onMouseEnter = () => {
    if (controlsFlow !== 'read') return null;
    setControlsFlow('hovering');
  };
  const onMouseLeave = () => {
    if (controlsFlow !== 'hovering') return null;
    setControlsFlow('read');
  };

  const onRestoreDefaultState = () => {
    setControlsFlow('read');
  };

  const onStartEntityRename = () => {
    morePopupState.close();
    setControlsFlow('edit');
  };
  const onEntityUpdate = str => {
    setNewName(str);
    setControlsFlow('processing');
    props.onEntityUpdate(str, () => {
      setControlsFlow('read');
      setNewName(null);
    });
  };

  const onStartEntityDelete = () => {
    morePopupState.close();
    setControlsFlow('delete');
  };
  const onEntityDelete = () => {
    setControlsFlow('processing');
    props.onEntityDelete(() => setControlsFlow('read'));
  };

  const onStartEntityReposition = () => {
    morePopupState.close();
    console.log('onStartEntityReposition');
  };
  const onStopEntityReposition = () => {
    console.log('onStopEntityReposition');
  };
  const onEntityReposition = () => {
    console.log('onEntityReposition');
  };

  const onInstanceCreate = () => {
    /*
      1. check if slider has mounted and returned its rect
      2. check if currentTime is within range of an already existing instance
    */
    if (
      !sliderRect ||
      find(
        instances,
        o => currentTime >= o.start_seconds && currentTime <= o.end_seconds
      )
    )
      return null;

    const newDuration = (16 * duration) / sliderRect.width; // new instance duration if 16px-wide
    const newEnd = currentTime + newDuration; // new end_seconds value based on currentTime
    const maxStart = duration - newDuration; // max value for new instance start_seconds value

    props.onInstanceCreate({
      start_seconds: currentTime <= maxStart ? currentTime : maxStart,
      end_seconds: newEnd <= duration ? newEnd : duration,
    });
  };

  const displayName = controlsFlow === 'processing' ? newName : entityName;

  const readControls = (
    <Grid
      alignItems="center"
      className={classes.readGrid}
      container
      justify="space-between"
      wrap="nowrap">
      <Grid item>
        <Tooltip
          enterDelay={1000}
          title={displayName ? displayName : 'Add a name'}>
          <Typography noWrap variant="body2" className={classes.entityName}>
            {displayName}
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item>
        <div
          style={{ visibility: showAddornment ? 'visible' : 'hidden' }}
          onClick={e => e.stopPropagation()}>
          {controlsFlow === 'processing' ? (
            <CircularProgress size={18} className={classes.circularProgress} />
          ) : (
            <>
              <IconButton
                {...bindHover(morePopupState)}
                aria-label="More options…">
                <MoreVertIcon />
              </IconButton>
              <Menu
                {...bindMenu(morePopupState)}
                autoFocus={false}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                disableRestoreFocus
                getContentAnchorEl={null}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                varant="menu">
                <MenuItem
                  dense
                  divider={entityType === 'location'}
                  onClick={onInstanceCreate}>
                  Add highlight
                </MenuItem>
                {entityType === 'location' ? (
                  <MenuItem dense onClick={onStartEntityReposition}>
                    Edit location
                  </MenuItem>
                ) : null}
                <MenuItem
                  dense
                  divider={entityType === 'location'}
                  onClick={onStartEntityRename}>
                  Edit name
                </MenuItem>
                <MenuItem dense onClick={onStartEntityDelete}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
  const editControls = (
    <NameField
      entityName={displayName}
      onCancel={onRestoreDefaultState}
      onSubmit={onEntityUpdate}
      suggestions={suggestions}
    />
  );

  return (
    <div
      className={classes.controlsRoot}
      onClick={allowNewInstance ? onInstanceCreate : null}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={controlsRootRef}>
      {controlsFlow !== 'edit' ? readControls : editControls}
      {controlsFlow === 'reposition' ? <MapPopover /> : null}
      {controlsFlow === 'delete' ? (
        <DeleteModal
          entityName={displayName}
          entityType={entityType}
          onCancel={onRestoreDefaultState}
          onConfirm={onEntityDelete}
        />
      ) : null}
    </div>
  );
}

Controls.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  entityName: PropTypes.string,
  entityType: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  onEntityDelete: PropTypes.func.isRequired,
  onEntityUpdate: PropTypes.func.isRequired,
  onInstanceCreate: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  sliderRect: PropTypes.shape({
    width: PropTypes.number,
  }),
};

Controls.defaultProps = {
  entityName: null,
  sliderRect: null,
  suggestions: [],
};
