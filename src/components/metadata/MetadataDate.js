import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { getTimeZones } from '@vvo/tzdb';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import DayJsUtils from '@date-io/dayjs';
import ClearButton from './ClearButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme) => ({
  timeZoneSelect: {
    marginTop: theme.spacing(2),
  },
}));

dayjs.extend(utc);

const unrestrictedTimezones = getTimeZones({ includeUtc: true }).map((option) => {
  const offset = option.currentTimeOffsetInMinutes / 60;
  const sign = offset < 0 ? '' : '+';
  const newOption = {
    code: option.name,
    label: `${option.name} (GMT${sign}${offset})`,
    offset,
  };
  return newOption;
});

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
  const options = node.options || [{ code: 'UTC', label: 'UTC (GMT +0)', offset: 0 }];
  const _classes = useStyles();
  // If timezones are restricted, use first available. Otherwise, guess local timezone and use that.
  const firstOption = {
    code: node.options[0].code,
    label: node.options[0].label,
    offset: node.options[0].offset,
  };
  const [timeZone, setTimeZone] = React.useState(options[0]?.restrictTimezones ? firstOption : unrestrictedTimezones.find(zone => Intl.DateTimeFormat().resolvedOptions().timeZone === zone.code));
  const [offsetTime, setOffsetTime] = React.useState(null);
  const [displayDate, setDisplayDate] = React.useState(null);
  const [displayTime, setDisplayTime] = React.useState(null);

  function handleDateChange(e) {
    console.log('~~~datechange fired!', e?.format);
    setDisplayDate(e?.format());
    // combine the set date with the current set UTC time to get metadata (final) value
    if (offsetTime && e) {
      const o = dayjs(offsetTime);
      setMetadataValue(
        dayjs(e?.format())
          .hour(o.hour())
          .minute(o.minute())
          .format(),
      );
    } else {
      // otherwise just set the date to midnight day of
      setMetadataValue(e?.utcOffset(timeZone.offset, true).hour(0).minute(0).format());
    }
  }

  function handleTimeChange(e) {
    setDisplayTime(e?.format());
    setOffsetTime(e?.utcOffset(timeZone.offset, true).format());
    // combine the UTC time with the current set date to get metadata (final) value
    const o = e?.utcOffset(timeZone.offset, true);
    setMetadataValue(
      dayjs(displayDate)
        .utcOffset(timeZone.offset, true)
        .hour(o.hour())
        .minute(o.minute())
        .format(),
    );
  }
  
  function handleTimeZoneOffsetChange(event, newValue) {
    setTimeZone(newValue);
    // update the displaytime to the new timezone, and then set final value to display date at the correct hour in the correct new timezone
    const o = dayjs(displayTime).utcOffset(newValue.offset, true);
    setMetadataValue(
      dayjs(displayDate)
        .utcOffset(newValue.offset, true)
        .hour(o.hour())
        .minute(o.minute())
        .format(),
    );
  }

  function cleanup() {
    setMetadataValue('');
    setDisplayDate(null);
    setDisplayTime(null);
  }

  const selectOptions = options[0]?.restrictTimezones ? options : unrestrictedTimezones;

  console.log('~~~selectOptions',selectOptions, timeZone);

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
            <DatePicker
              value={displayDate ? dayjs(displayDate) : null}
              onChange={handleDateChange}
              inputVariant="outlined"
              format="DD/MM/YYYY"
              disabled={disabled}
              clearable
            />
            <TimePicker
              value={displayTime ? dayjs(displayTime) : null}
              onChange={handleTimeChange}
              inputVariant="outlined"
              disabled={disabled || displayDate === null}
              error={options[0]?.requireTime && displayTime === null}
              keyboardIcon={<AccessTimeIcon/>}
              placeholder="08:00 AM"
              clearable
            />
            <Autocomplete
              className={_classes.timeZoneSelect}
              options={selectOptions}
              getOptionLabel={option => option.label}
              defaultValue={timeZone}
              filterSelectedOptions
              onChange={handleTimeZoneOffsetChange}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label=""
                />
              )}
            />
          </FormControl>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                empty={displayDate === null || (options[0]?.requireTime && displayTime === null)}
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
