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
}) {
  const mutationPayload = {
    annotation_type: 'task_response_datetime',
    set_fields: `{"response_datetime":"${metadataValue}"}`,
  };
  const options = node.options || [{ code: "UTC", label: "UTC (0 GMT)", offset: 0 }];
  const _classes = useStyles();
  // Use first time zone as default setting; if no time zone for some reason use GMT
  const [timeZoneOffset, setTimeZoneOffset] = React.useState(node.options?.length > 0 ? node.options[0].offset : 0);
  const [displayDateTime, setDisplayDateTime] = React.useState(dayjs());
  if (!metadataValue) {
    setMetadataValue(
      dayjs(displayDateTime).utcOffset(timeZoneOffset, true).format(),
    );
  }

  function handleChange(e) {
    setDisplayDateTime(e.format());
    setMetadataValue(e.utcOffset(timeZoneOffset, true).format());
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
  }

  return (
    <>
      <FieldInformation />
      {hasData && !isEditing ? (
        <>
          <Typography variant="body1" className={classes.value}>
            {node.first_response_value}
          </Typography>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
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
              value={dayjs(displayDateTime)}
              onChange={handleChange}
              inputVariant="outlined"
            />
            <Select
              className={_classes.timeZoneSelect}
              value={timeZoneOffset}
              onChange={handleTimeZoneOffsetChange}
            >
              {options.map((item) => (
                <MenuItem value={item.offset} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton {...{ mutationPayload }} />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      )}
    </>
  );
}

MetadataDate.propTypes = {
  node: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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
};

export default MetadataDate;
