import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';

import Autocomplete from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    ...theme.typography.body2,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  adornmentIcon: {
    position: 'relative',
    top: `${theme.spacing(0.3) * -1}px`,
    left: `${theme.spacing(0.6) * -1}px`,
  },
}));

export default function NameField({ entityName, entityType, suggestions = [], ...props }) {
  const classes = useStyles();

  const [name, setName] = useState('');

  const onBeforeSubmit = e => {
    const newName = e ? e.target.value : name;
    if (newName !== entityName && newName.length > 0) {
      props.onSubmit(newName);
    } else {
      props.onCancel();
    }
  };

  useEffect(() => {
    setName(entityName);
  }, []);

  // order and flatten suggestions’ array
  const options = orderBy(suggestions, [`${entityType}instance_count`], ['desc']).map(o => o.name);

  return (
    <ClickAwayListener onClickAway={() => onBeforeSubmit()}>
      <Autocomplete
        autoComplete
        blurOnSelect
        freeSolo
        id={`${entityType}-suggestions`}
        onChange={(e, str) => props.onSubmit(str)}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            autoFocus
            inputProps={{
              ...params.inputProps,
              onKeyPress: e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setName(e.target.value);
                }
              },
              onBlur: e => onBeforeSubmit(e),
            }}
            placeholder={entityName}
            required
            value={name}
            minLength="1"
            InputProps={{
              className: classes.inputRoot,
              ref: params.InputProps.ref,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Cancel">
                    <IconButton size="small" onClick={props.onCancel} className={classes.adornmentIcon}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={str => (
          <Typography component="span" display="block" noWrap variant="body2">
            {str}
          </Typography>
        )}
        size="small"
      />
    </ClickAwayListener>
  );
}

NameField.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};
