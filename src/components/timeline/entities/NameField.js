import PropTypes from 'prop-types';
import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  nameFieldRoot: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  inputRoot: {
    ...theme.typography.body2,
    flexWrap: 'nowrap',
    fontSize: '13px',
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  cancelIcon: {
    position: 'relative',
    top: `${theme.spacing(0.25) * -1}px`,
  },
}));

export default function NameField(props) {
  const classes = useStyles();

  const { entityName, suggestions } = props;
  const options = orderBy(suggestions, ['taginstance_count'], ['desc']).map(
    o => o.name
  );

  return (
    <Autocomplete
      autoComplete
      blurOnSelect
      disableOpenOnFocus
      freeSolo
      id="entity-names"
      onChange={(e, str) => props.onSubmit(str)}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          autoFocus
          inputProps={{
            ...params.inputProps,
            onKeyPress: e => {
              if (['Enter', 'Escape'].includes(e.key)) {
                e.preventDefault();
                if (e.key === 'Enter') props.onSubmit(e.target.value);
                if (e.key === 'Escape') props.onCancel();
              }
            },
          }}
          placeholder={entityName}
          InputProps={{
            className: classes.inputRoot,
            ref: params.InputProps.ref,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Cancel">
                  <IconButton
                    size="small"
                    onClick={props.onCancel}
                    className={classes.cancelIcon}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      )}
      size="small"
      renderOption={str => (
        <Typography component="span" display="block" noWrap variant="body2">
          {str}
        </Typography>
      )}
    />
  );
}

NameField.propTypes = {
  entityName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};

NameField.defaultProps = {
  suggestions: [],
};
