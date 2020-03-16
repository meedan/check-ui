import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui-popup-state/HoverMenu';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

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
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const useStyles = makeStyles(theme => ({
  controlsRoot: {
    cursor: 'pointer',
    width: `${config.TIMELINE_OFFSET}px`,
    something: `${console.log(theme)}`,
  },
  circularProgress: {
    left: `${theme.spacing(1) * -1}px`,
    top: `${theme.spacing(0.5)}px`,
    position: 'relative',
  },
  readGrid: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    width: `${config.TIMELINE_OFFSET - theme.spacing(3)}px`,
  },
  nameTypography: {
    maxWidth: `${config.TIMELINE_OFFSET - theme.spacing(8)}px`,
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
    sliderRect,
    suggestions,
  } = props;

  const [controlsFlow, setControlsFlow] = useState('read');

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

  const onStartEntityRename = () => {
    morePopupState.close();
    console.log('onStartEntityRename');
  };
  const onEntityRename = () => {
    console.log('onEntityRename');
  };
  const onStopEntityRename = () => {
    console.log('onStopEntityRename');
  };

  const onStartEntityDelete = () => {
    morePopupState.close();
    setControlsFlow('delete');
  };
  const onEntityDelete = () => {
    setControlsFlow('processing');
    props.onEntityDelete(() => setControlsFlow('read'));
  };
  const onStopEntityDelete = () => {
    setControlsFlow('read');
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

  const startNewInstance = () => {
    console.log('startNewInstance');
    if (!sliderRect) return null;

    // new instance duration assuming we’d like it to be 16px-wide
    const newDuration = (16 * duration) / sliderRect.width;
    // new end_seconds value based on currentTime
    const newEnd = currentTime + newDuration;
    // max value for new instance start_seconds value
    const maxStart = duration - newDuration;

    const newInstance = {
      start_seconds: currentTime <= maxStart ? currentTime : maxStart,
      end_seconds: newEnd <= duration ? newEnd : duration,
    };

    props.onInstanceCreate(newInstance);
  };

  const readModeControls = (
    <Grid
      alignItems="center"
      className={classes.readGrid}
      container
      justify="space-between"
      wrap="nowrap">
      <Grid item>
        <Tooltip
          enterDelay={1000}
          title={entityName ? entityName : 'Add a name'}>
          <Typography noWrap variant="body2" className={classes.nameTypography}>
            {entityName}
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
                <MenuItem dense divider onClick={startNewInstance}>
                  Add highlight
                </MenuItem>
                {entityType === 'location' ? (
                  <MenuItem dense onClick={onStartEntityReposition}>
                    Edit location
                  </MenuItem>
                ) : null}
                <MenuItem dense divider onClick={onStartEntityRename}>
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
  const editModeControls = (
    <NameField
      entityName={entityName}
      onCancel={onStopEntityRename}
      onSubmit={onEntityRename}
      suggestions={suggestions}
    />
  );

  return (
    <div
      className={classes.controlsRoot}
      onClick={allowNewInstance ? startNewInstance : null}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={controlsRootRef}>
      {controlsFlow !== 'edit' ? readModeControls : editModeControls}
      {controlsFlow === 'reposition' ? <MapPopover /> : null}
      {controlsFlow === 'delete' ? (
        <DeleteModal
          entityName={entityName}
          entityType={entityType}
          onCancel={onStopEntityDelete}
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
  onInstanceCreate: PropTypes.func.isRequired,
  onEntityDelete: PropTypes.func.isRequired,
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
