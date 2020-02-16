/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }, onSelect) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      onClick={() => onSelect(suggestion.name)}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}>
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, suggestions = []) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep = count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  container: {
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
    borderBottom: `1px solid ${grey[200]}`,
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
});

class EntityNameField extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
  }

  onChange = str => {
    this.setState({ name: str });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.name);
  };
  onClickAway = () => {
    if (!this.state.name || this.state.name.length === 0 || this.state.name === this.props.name) {
      this.props.onCancel();
    } else {
      this.onSubmit();
    }
  };

  render() {
    const { classes, name, onCancel, suggestions } = this.props;

    return (
      <ClickAwayListener onClickAway={this.onClickAway}>
        <Downshift id="downshift-tags" onInputValueChange={e => this.onChange(e)}>
          {({ getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen, selectedItem }) => (
            <div className={classes.container}>
              {renderInput({
                classes,
                fullWidth: true,
                autoFocus: true,
                required: true,
                onKeyPress: e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    this.onSubmit();
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    onCancel();
                  }
                },
                InputProps: getInputProps({
                  placeholder: name && name.length > 0 ? name : 'Enter new name…',
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Cancel">
                        <IconButton onClick={onCancel}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }),
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, suggestions).length > 0 ? (
                      <Typography variant="caption" color="textSecondary" className={classes.MenuHeading}>
                        In this project:
                      </Typography>
                    ) : null}
                    {getSuggestions(inputValue, suggestions).map((suggestion, index) =>
                      renderSuggestion(
                        {
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem,
                        },
                        name => this.props.onSubmit(name)
                      )
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(EntityNameField);
