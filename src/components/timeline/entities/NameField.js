import PropTypes from 'prop-types';
import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  nameFieldRoot: {
    flexGrow: 1,
    position: 'relative',
    something: console.log(theme),
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  inputRoot: {
    ...theme.typography.body2,
    // borderBottom: `1px solid ${grey[200]}`,
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
  MenuHeading: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
}));

export default function NameField(props) {
  const classes = useStyles();

  const { entityName, suggestions } = props;

  const [newName, setNewName] = useState('');

  return (
    <Autocomplete
      autoComplete
      blurOnSelect
      defaultValue={{ name: entityName }}
      disableOpenOnFocus
      freeSolo
      id="entity-names"
      options={orderBy(suggestions, ['taginstance_count'], ['desc'])}
      renderInput={params => (
        <TextField
          inputProps={params.inputProps}
          InputProps={{
            className: classes.inputRoot,
            ref: params.InputProps.ref,
          }}
        />
      )}
      size="small"
      getOptionLabel={o => o.name}
      renderOption={o => (
        <Typography component="span" display="block" noWrap variant="body2">
          {o.name}
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
