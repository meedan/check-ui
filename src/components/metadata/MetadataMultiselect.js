import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Radio,
  Grid
} from '@material-ui/core';
import ClearButton from './ClearButton';

function MetadataMultiselect({
  node,
  hasData,
  isEditing,
  metadataValue,
  setMetadataValue,
  EditButton,
  DeleteButton,
  CancelButton,
  SaveButton,
  AnnotatorInformation,
  FieldInformation,
  isSingle,
  disabled,
  required,
  handleMultiselectOnChange,
}) {
  let mutationPayload = {};

  if (node.type === 'multiple_choice') {
    mutationPayload = {
      response_multiple_choice: JSON.stringify(metadataValue),
    };
  } else if (node.type === 'single_choice') {
    mutationPayload = {
      response_single_choice: metadataValue,
    };
  }
  const options = node.options;
  const [otherText, setOtherText] = React.useState(
    isSingle ? getSavedOtherValue() : metadataValue?.other,
  );
  const forceUpdate = React.useReducer(() => ({}))[1];

  function handleOtherTextChange(e) {
    setOtherText(e.target.value);
    if (isSingle) {
      setMetadataValue(e.target.value);
    } else {
      let tempSelected = metadataValue;
      tempSelected.other = e.target.value;
      setMetadataValue(tempSelected);
    }
  }

  function handleMultiChange(e) {
    let tempSelected = metadataValue;
    if (e.target.name === 'metadata_other') {
      // Other is now not checked so we have to set other to blank string (a "falsey" value)
      if (!e.target.checked) {
        tempSelected.other = '';
        setOtherText('');
      }
    } else {
      // Checked, so we are adding this to the selected sub-array
      if (e.target.checked) {
        tempSelected?.selected?.push(e.target.value);
      }
      // Not checked so we are removing this from the selected sub-array
      else {
        tempSelected.selected = tempSelected?.selected?.filter(
          (item) => item !== e.target.value,
        );
      }
    }
    if (handleMultiselectOnChange) {
      handleMultiselectOnChange(tempSelected, node, setMetadataValue);
    } else {
      setMetadataValue(tempSelected);
    }
    forceUpdate();
  }

  function handleSingleChange(e) {
    let tempSelected = metadataValue;
    if (e.target.name === 'metadata_other') {
      //if it's the Other field a user is checking, we need ot
      tempSelected = otherText;
    } else {
      tempSelected = e.target.value;
    }
    if (handleMultiselectOnChange) {
      handleMultiselectOnChange(tempSelected, node, setMetadataValue);
    } else {
      setMetadataValue(tempSelected);
    }
    forceUpdate();
  }

  function getSavedOtherValue() {
    // in single select we only know what the "other" value is if "other" is actively selected. so if "other" is not actively selected, we can only render the "other" label as a blank string.
    if (isSingle) {
      // of the non-"other" options, if every option does NOT match the current selected option, then "other" must be selected
      const isOtherOptionSelected = options
        .filter((option) => !option.other)
        .every((option) => option.label !== metadataValue);
      // grab an "other" option to see if it exists in the first place
      const otherOption = options.filter((option) => option.other);
      if (otherOption.length > 0 && isOtherOptionSelected) {
        return metadataValue;
      } else {
        // we can't tell what the "other" value is
        return '';
      }
    } else {
      return metadataValue?.other || '';
    }
  }

  function cleanup() {
    if (node.type === 'single_choice') {
      setMetadataValue('');
    } else if (options.find(option => option.other)) {
      setMetadataValue({selected: [], other: ''});
    } else {
      setMetadataValue({selected: []});
    }
  }

  return (
    <>
      <FieldInformation />
      <FormGroup>
        {options.map((option) => {
          if (option.other) {
            return (
              <FormControlLabel
                control={
                  isSingle ? (
                    <Radio name="metadata_other" value={getSavedOtherValue()} />
                  ) : (
                    <Checkbox name="metadata_other" value={metadataValue?.other} />
                  )
                }
                label={
                  !hasData || isEditing ? (
                    <TextField
                      disabled={disabled}
                      value={getSavedOtherValue()}
                      onChange={handleOtherTextChange}
                    />
                  ) : (
                    getSavedOtherValue()
                  )
                }
                checked={
                  isSingle
                    ? otherText?.length > 0 && metadataValue === otherText
                    : !!metadataValue?.other
                }
                disabled={disabled || (hasData && !isEditing)}
                onChange={isSingle ? handleSingleChange : handleMultiChange}
              />
            );
          } else {
            return (
              <FormControlLabel
                control={
                  isSingle ? (
                    <Radio name={option.label} value={option.label} />
                  ) : (
                    <Checkbox name={option.label} value={option.label} />
                  )
                }
                label={option.label}
                checked={
                  isSingle
                    ? option.label === metadataValue
                    : metadataValue?.selected?.indexOf(option.label) > -1
                }
                disabled={disabled || (hasData && !isEditing)}
                onChange={isSingle ? handleSingleChange : handleMultiChange}
              />
            );
          }
        })}
      </FormGroup>
      {hasData && !isEditing ? (
        <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
          <Grid item>
            <EditButton />
          </Grid>
          <Grid item>
            <DeleteButton onClick={cleanup} /> 
          </Grid>
          <Grid item xs>
            <AnnotatorInformation />
          </Grid>
        </Grid>
      ) : (
        <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
          <Grid item>
            {otherText ? <CancelButton {...{ setOtherText }} /> : <CancelButton />}
          </Grid>
          <Grid item>
            <SaveButton
              {...{ mutationPayload, required }}
              empty={isSingle ? metadataValue === '' : metadataValue.selected?.length === 0 && !metadataValue.other}
            />
          </Grid>
          { disabled ? null :
            <Grid item>
              <ClearButton cleanup={cleanup} />
            </Grid>
          }
        </Grid>
      )}
    </>
  );
}

MetadataMultiselect.defaultProps = {
  disabled: false,
};

MetadataMultiselect.propTypes = {
  node: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  hasData: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  metadataValue: PropTypes.string.isRequired,
  setMetadataValue: PropTypes.func.isRequired,
  EditButton: PropTypes.element.isRequired,
  DeleteButton: PropTypes.element.isRequired,
  CancelButton: PropTypes.element.isRequired,
  SaveButton: PropTypes.element.isRequired,
  AnnotatorInformation: PropTypes.element.isRequired,
  FieldInformation: PropTypes.element.isRequired,
  isSingle: PropTypes.bool.isRequired,
  handleMultiselectOnChange: PropTypes.func,
};

export default MetadataMultiselect;
