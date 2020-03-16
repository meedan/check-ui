import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui-popup-state/HoverMenu';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

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
    something: `${console.log(theme)}`,
  },
  controlsAddornment: {
    // visibility: 'hidden',
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

  const { entityName, entityType, suggestions } = props;

  const [controlsFlow, setControlsFlow] = useState('read');

  const morePopupState = usePopupState({
    variant: 'popover',
    popupId: 'moreMenu',
  });

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
    props.onEntityDelete();
    setControlsFlow('read');
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
          className={classes.controlsAddornment}
          onClick={e => e.stopPropagation()}>
          <IconButton {...bindHover(morePopupState)} aria-label="More options…">
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
            <MenuItem dense onClick={onStartEntityRename}>
              Rename
            </MenuItem>
            {entityType === 'location' ? (
              <MenuItem dense onClick={onStartEntityReposition}>
                Reposition
              </MenuItem>
            ) : null}
            <MenuItem dense onClick={onStartEntityDelete}>
              Delete
            </MenuItem>
          </Menu>
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
    <div className={classes.controlsRoot}>
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
  entityName: PropTypes.string,
  entityType: PropTypes.string.isRequired,
  onEntityDelete: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};

Controls.defaultProps = {
  suggestions: [],
  entityName: null,
};
