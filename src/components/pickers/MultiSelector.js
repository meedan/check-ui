import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  multiSelectorArea: {
    padding: theme.spacing(2),
    maxHeight: theme.spacing(40),
    height: theme.spacing(40),
    minWidth: theme.spacing(32),
    overflowY: 'auto',
    border: '1px solid #f2f2f2', // FIXME: implement a proper check palette
    backgroundColor: '#fafafa',
  },
  notFound: {
    color: '#757575',
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
    display: 'flex',
    justifyContent: 'center',
  },
  category: {
    color: '#757575',
    marginTop: `${theme.spacing(1)} !important`,
  },
});

class MultiSelector extends React.Component {
  constructor(props) {
    super(props);
    const defaultSelected = props.defaultAllSelected
      ? props.options.filter(o => o.value !== '').map(o => o.value)
      : [];

    this.state = {
      selected: props.selected.length ? props.selected : defaultSelected,
      filter: '',
    };
  }

  handleChange = (e) => {
    this.setState({ filter: e.target.value });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(e.target.value);
    }
  };

  handleSelectCheckbox = (e, inputChecked) => {
    if (inputChecked) {
      this.addItem(e.target.id);
    } else {
      this.removeItem(e.target.id);
    }
  };

  handleSelectRadio = (e, inputChecked) => {
    let selected = null;
    if (inputChecked) {
      selected = e.target.id;
    } else {
      selected = null;
    }
    this.setState({ selected });
  };

  handleToggleAll = () => {
    if (this.isAllSelected()) {
      this.setState({ selected: [] });
    } else {
      this.setState({
        selected: this.props.options
          .filter(o => o.value !== '')
          .map(o => o.value),
      });
    }
  };

  addItem = (value) => {
    const selected = [...this.state.selected];
    selected.push(value);
    this.setState({ selected });
  };

  removeItem = (value) => {
    const selected = [...this.state.selected];
    const index = selected.indexOf(value);
    if (index > -1) {
      selected.splice(index, 1);
    }
    this.setState({ selected });
  };

  filter = (options) => {
    const { filter } = this.state;
    if (filter) {
      return options.filter(o => Object.values(o).join(' ').toLowerCase().includes(filter.toLowerCase()));
    }
    return options;
  };

  isAllSelected = () => {
    const filteredOptions = this.props.options.filter(o => o.value !== '');
    return (this.state.selected.length === filteredOptions.length);
  };

  render() {
    const {
      onDismiss,
      onSubmit,
      classes,
    } = this.props;

    const options = this.filter(this.props.options);

    return (
      <div>
        { this.props.allowSearch ?
          <Box p={2}>
            <TextField
              className="multiselector__search-input"
              onChange={this.handleChange}
              placeholder={this.props.inputPlaceholder}
              variant="outlined"
              fullWidth
            />
            { this.props.actionButton }
          </Box>
          : null
        }
        { this.props.allowToggleAll ?
          <Box p={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.isAllSelected()}
                  onChange={this.handleToggleAll}
                  id="multiselector__select-all"
                />
              }
              label={this.props.toggleAllLabel}
            />
          </Box>
          : null
        }
        <div className={classes.multiSelectorArea}>
          <FormGroup>
            {
              options.map((o, index) => {
                if (o.value === '' && o.label === '') {
                  return (
                    <Divider key={`multiselector-divider-${index.toString()}`} />
                  );
                }
                if (o.value === '') {
                  return (
                    <span className={classes.category} key={`multiselector-header-${index.toString()}`}>
                      {o.label}
                    </span>
                  );
                }
                return (
                  <FormControlLabel
                    key={`multiselector-option-${index.toString()}`}
                    control={this.props.single ?
                      <Radio
                        checked={this.state.selected === o.value}
                        onChange={this.handleSelectRadio}
                        id={o.value}
                      /> :
                      <Checkbox
                        checked={this.state.selected.indexOf(o.value) > -1}
                        onChange={this.handleSelectCheckbox}
                        id={o.value}
                        icon={o.icon}
                        checkedIcon={o.checkedIcon}
                      />
                    }
                    label={o.label}
                  />
                );
              })
            }
            { options.length < 1 ?
              <div className={classes.notFound}>
                { this.props.notFoundLabel }
              </div>
              : null
            }
          </FormGroup>
        </div>
        { this.props.children }
        <Box p={2} display="flex" justifyContent="flex-end" flexDirection="row">
          { onDismiss && this.props.cancelLabel ? (
            <Button onClick={onDismiss}>
              { this.props.cancelLabel }
            </Button>
          ) : null }
          <Button
            className="multi__selector-save"
            color="primary"
            variant="contained"
            onClick={() => onSubmit(this.state.selected)}
          >
            { this.props.submitLabel }
          </Button>
        </Box>
      </div>
    );
  }
}

MultiSelector.defaultProps = {
  actionButton: null,
  allowSearch: false,
  allowToggleAll: false,
  children: null,
  defaultAllSelected: false,
  inputPlaceholder: null,
  onDismiss: null,
  onSearchChange: null,
  toggleAllLabel: null,
};

MultiSelector.propTypes = {
  actionButton: PropTypes.node,
  allowSearch: PropTypes.bool,
  allowToggleAll: PropTypes.bool,
  cancelLabel: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  defaultAllSelected: PropTypes.bool,
  inputPlaceholder: PropTypes.string,
  notFoundLabel: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitLabel: PropTypes.node.isRequired,
  onDismiss: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  toggleAllLabel: PropTypes.node,
};

export default withStyles(styles)(MultiSelector);
