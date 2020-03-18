import Menu from 'material-ui-popup-state/HoverMenu';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import find from 'lodash/find';
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

export default function Controls({
  currentTime = 0,
  duration,
  entityName,
  entityType,
  instances = [],
  isLocal = false,
  sliderRect,
  suggestions = [],
  ...props
}) {
  const classes = useStyles();
  const controlsRoot = useRef();

  const [mode, setMode] = useState('read');
  const [newEntityName, setNewEntityName] = useState(null);

  const morePopupState = usePopupState({
    variant: 'popover',
    popupId: 'moreMenu',
  });

  const displayEntityName = mode === 'processing' ? newEntityName : entityName;

  // mode methods

  const onMouseEnter = () => {
    if (mode === 'read') setMode('hovering');
  };
  const onMouseLeave = () => {
    if (mode === 'hovering') setMode('read');
  };
  const onModeReset = () => {
    morePopupState.close();
    setMode('read');
    setNewEntityName(null);
    if (isLocal) props.onEntityStop();
  };

  // entity methods

  const onEntityCreate = str => {
    setNewEntityName(str);
    setMode('processing');
    props.onEntityCreate(str, onModeReset);
  };
  const onEntityUpdateStart = () => {
    setMode('edit');
  };
  const onEntityUpdate = str => {
    setNewEntityName(str);
    setMode('processing');
    props.onEntityUpdate(str, onModeReset);
  };
  const onEntityDeleteStart = () => {
    setMode('delete');
  };
  const onEntityDelete = () => {
    setNewEntityName(entityName);
    setMode('processing');
    props.onEntityDelete(onModeReset);
  };

  // instance methods

  const onInstanceCreate = () => {
    // prevent instance creation when editing or processing
    if (['edit', 'processing'].includes(mode)) return null;

    // prevent instance creation if no sliderRect found
    if (!sliderRect) return null;

    // prevent instance creation if currentTime is within range of an already existing instance
    const fn = o =>
      currentTime >= o.start_seconds && currentTime <= o.end_seconds;
    if (find(instances, o => fn(o))) return null;

    // get new instance time duration assuming it’s 16px-wide
    const newDuration = (16 * duration) / sliderRect.width;

    // get new end_seconds value based on currentTime
    const newEnd = currentTime + newDuration;

    // get max possible start_seconds value given the above
    const maxStart = duration - newDuration;

    // construct a new instance
    const newInstance = {
      start_seconds: currentTime <= maxStart ? currentTime : maxStart,
      end_seconds: newEnd <= duration ? newEnd : duration,
    };

    // TODO: add support for processing state w/ parent callback
    props.onInstanceCreate(newInstance);
  };

  // map/place methods

  // TODO: bring in map bits
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
          title={
            displayEntityName ? `Annotate: ${displayEntityName}` : 'Add name'
          }>
          <Typography noWrap variant="body2" className={classes.entityName}>
            {displayEntityName}
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item>
        <div
          style={{
            visibility: ['hovering', 'processing'].includes(mode)
              ? 'visible'
              : 'hidden',
          }}
          onClick={e => e.stopPropagation()}>
          {mode === 'processing' ? (
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
                  divider={entityType === 'place'}
                  onClick={onInstanceCreate}>
                  Add highlight
                </MenuItem>
                {entityType === 'place' ? (
                  <MenuItem dense onClick={onStartEntityReposition}>
                    Edit place
                  </MenuItem>
                ) : null}
                <MenuItem
                  dense
                  divider={entityType === 'place'}
                  onClick={onEntityUpdateStart}>
                  Edit name
                </MenuItem>
                <MenuItem dense onClick={onEntityDeleteStart}>
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
      entityName={displayEntityName}
      entityType={entityType}
      onCancel={onModeReset}
      onSubmit={isLocal ? onEntityCreate : onEntityUpdate}
      suggestions={suggestions}
    />
  );

  // toggle edit mode if isLocal changes and true
  useEffect(() => {
    return isLocal ? setMode('edit') : setMode('read');
  }, [isLocal]);

  // console.group('Controls');
  // console.log({ props });
  // console.log({ mode });
  // console.log({ newEntityName });
  // console.groupEnd();

  return (
    <div
      className={classes.controlsRoot}
      onClick={onInstanceCreate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={controlsRoot}>
      {mode === 'edit' ? editControls : readControls}
      {mode === 'reposition' ? <MapPopover /> : null}
      {mode === 'delete' && !isLocal ? (
        <DeleteModal
          entityName={displayEntityName}
          entityType={entityType}
          onCancel={onModeReset}
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
  instances: PropTypes.array,
  isLocal: PropTypes.bool,
  onEntityDelete: PropTypes.func.isRequired,
  onEntityUpdate: PropTypes.func.isRequired,
  onEntityStop: PropTypes.func.isRequired,
  onInstanceCreate: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  sliderRect: PropTypes.shape({
    width: PropTypes.number,
  }),
};
