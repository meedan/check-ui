import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Grid,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import DayJsUtils from '@date-io/dayjs';
import ClearButton from './ClearButton';

const useStyles = makeStyles((theme) => ({
  timeZoneSelect: {
    marginTop: theme.spacing(2),
  },
}));

dayjs.extend(utc);

function MetadataDate({
  node,
  classes,
  EditButton,
  DeleteButton,
  CancelButton,
  SaveButton,
  AnnotatorInformation,
  FieldInformation,
  hasData,
  isEditing,
  metadataValue,
  setMetadataValue,
  disabled,
  required,
}) {
  const mutationPayload = {
    annotation_type: 'task_response_datetime',
    set_fields: `{"response_datetime":"${metadataValue}"}`,
  };
  const options = node.options || [{ code: "UTC", label: "UTC (0 GMT)", offset: 0 }];
  const _classes = useStyles();
  // Use first time zone as default setting; if no time zone for some reason use GMT
  const [timeZoneOffset, setTimeZoneOffset] = React.useState(node.options?.length > 0 ? node.options[0].offset : 0);
  const [displayDateTime, setDisplayDateTime] = React.useState(null);

  function handleChange(e) {
    setDisplayDateTime(e?.format());
    setMetadataValue(e?.utcOffset(timeZoneOffset, true).format());
  }

  function handleTimeZoneOffsetChange(e) {
    setTimeZoneOffset(e.target.value);
    if (displayDateTime) {
      setMetadataValue(
        dayjs(displayDateTime).utcOffset(e.target.value, true).format(),
      );
    }
  }

  function cleanup() {
    setMetadataValue('');
    setDisplayDateTime(null);
  }

  return (
    <div>
      <FieldInformation />
      {hasData && !isEditing ? (
        <>
          <Typography variant="body1" className={classes.value}>
            {node.first_response_value}
          </Typography>
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
        </>
      ) : (
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <FormControl variant="outlined" fullWidth>
            <DateTimePicker
              value={displayDateTime ? dayjs(displayDateTime) : null}
              onChange={handleChange}
              inputVariant="outlined"
              disabled={disabled}
              clearable
            />
            <Select
              className={_classes.timeZoneSelect}
              value={timeZoneOffset}
              onChange={handleTimeZoneOffsetChange}
              disabled={disabled}
            >
              {options.map((item) => (
                <MenuItem value={item.offset} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                empty={displayDateTime === null}
                {...{ mutationPayload, required }}
              />
            </Grid>
            { disabled ? null :
              <Grid item>
                <ClearButton cleanup={cleanup} />
              </Grid>
            }
          </Grid>
        </MuiPickersUtilsProvider>
      )}
    </div>
  );
}

MetadataDate.defaultProps = {
  disabled: false,
};

MetadataDate.propTypes = {
  node: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  EditButton: PropTypes.element.isRequired,
  DeleteButton: PropTypes.element.isRequired,
  CancelButton: PropTypes.element.isRequired,
  SaveButton: PropTypes.element.isRequired,
  AnnotatorInformation: PropTypes.element.isRequired,
  FieldInformation: PropTypes.element.isRequired,
  hasData: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  metadataValue: PropTypes.string.isRequired,
  setMetadataValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default MetadataDate;
