import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { getTimeZones } from '@vvo/tzdb';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import DayJsUtils from '@date-io/dayjs';
import ClearButton from './ClearButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  timeZoneSelect: {
    marginTop: theme.spacing(2),
  },
  addTime: {
    maxWidth: '100px',
    marginTop: theme.spacing(1),
  },
  timePicker: {
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

const guessTimeZoneFromDirtyDateString = dateString => {
  const offset = dateString.match(/(\d\d):(\d\d)$/);
  let timeZone, numericOffset;
  try {
    if (offset) {
      // Likely a standard ISO 8601 datestring
      numericOffset = getNumericOffsetFromDirtyDateString(dateString);
      timeZone = unrestrictedTimezones.find(zone => zone.offset === numericOffset).code;
    } else if (dateString.match(/Z$/)) {
      // If not 8601 but ends in "Z", assume "zulu" time aka UTC
      timeZone = 'UTC';
    } else if (dateString.match(/(\+|-)(\d\d?) \w+ $/)) {
      // match something like '2017-10-27 2:19 +3 EAT ' (note space at end)
      numericOffset = getNumericOffsetFromDirtyDateString(dateString);
      timeZone = unrestrictedTimezones.find(zone => zone.offset === numericOffset).code;
    } else if (dateString.match(/\d\d\d\d-\d\d?-\d\d? 0:0 (\+|-)?(\d\d?) \w+ notime/)) {
      // match something lke '2020-9-2 0:0 +8 PHT notime'
      numericOffset = getNumericOffsetFromDirtyDateString(dateString);
      timeZone = unrestrictedTimezones.find(zone => zone.offset === numericOffset).code;
    } else {
      throw(new Error('Could not parse time zone from database entry!'));
    }
  } catch (e) {
    // if we can't find a timezone we assume UTC
    timeZone = 'UTC';
  }
  return timeZone;
};

const getUnixTimeFromDirtyDateString = dateString => {
  // attempt to parse ms since epoch out of potentially badly formatted date string (see https://meedan.atlassian.net/browse/CHECK-1354 comments)
  // returns milliseconds since epoch like 1634774400000

  // first, see if this is a normal ISO 8601 date
  let isoDate = Date.parse(dateString);
  if (isoDate) {
    return isoDate;
  }

  // next, try a few of the time formats you can find in our DB
  let year, month, day, hour, minute;
  const firstTry = dateString.match(/(\d\d\d\d)-(\d\d?)-(\d\d?) (\d\d?):(\d\d?)/);
  if (firstTry) {
    year = firstTry[1];
    month = firstTry[2];
    day = firstTry[3];
    hour = firstTry[4];
    minute = firstTry[5];
    return Date.parse(`${year}-${month}-${day} ${hour}:${minute}Z`);
  }
  const secondTry = dateString.match(/^(\w+) (\d\d?), (\d\d\d\d) at (\d\d?):(\d\d?)/);
  if (secondTry) {
    year = secondTry[3];
    month = secondTry[1];
    day = secondTry[2];
    hour = secondTry[4];
    minute = secondTry[5];
    // Note: you cannot simply parse 'January 1, 2021' because while it parses, it does so in local time, not UTC
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#differences_in_assumed_time_zone
    // so we have to convert the month string to 2-digit month
    // https://stackoverflow.com/a/66791326/4869657
    month = new Date(`${month} 01 2000`).toLocaleDateString(`en`, {month:`2-digit`})
    return Date.parse(`${year}-${month}-${day} ${hour}:${minute}Z`);
  }

  // if all else fails, give up and return today's date
  return Date.now();
}

const getNumericOffsetFromDirtyDateString = dateString => {
  const offset = dateString.match(/(\+|-)(\d\d):(\d\d)$/);
  let numericOffset, customOffset, sign, hours, minutes;
  try {
    if (offset) {
      // Likely a standard ISO 8601 datestring
      sign = offset[1] === '+' ? 1 : -1;
      hours = +offset[2];
      minutes = +offset[3];
      numericOffset = sign * (hours + minutes/60);
    } else if (dateString.match(/Z$/)) {
      // If not 8601 but ends in "Z", assume "zulu" time aka UTC
      numericOffset = 0;
    } else if (dateString.match(/(\+|-)(\d\d?) \w+ $/)) {
      // match something like '2017-10-27 2:19 +3 EAT ' (note space at end)
      customOffset = dateString.match(/(\+|-)(\d\d?) \w+ $/);
      sign = customOffset[1] === '+' ? 1 : -1;
      hours = +customOffset[2];
      numericOffset = sign * hours;
    } else if (dateString.match(/\d\d\d\d-\d\d?-\d\d? 0:0 (\+|-)?(\d\d?) \w+ notime/)) {
      // match something lke '2020-9-2 0:0 +8 PHT notime'
      customOffset = dateString.match(/\d\d\d\d-\d\d?-\d\d? 0:0 (\+|-)?(\d\d?) \w+ notime/);
      sign = customOffset[1] === '+' ? 1 : -1;
      hours = +customOffset[2];
      numericOffset = sign * hours;
    } else if (dateString.match(/^\w+ \d\d?, \d\d\d\d at \d\d?:\d\d?\s\s\((\+|-)(\d\d)(\d\d) UTC/)) {
      // match something like 'October 26, 2021 at 11:16  (+0600 UTC)'
      customOffset = dateString.match(/^\w+ \d\d?, \d\d\d\d at \d\d?:\d\d?\s\s\((\+|-)(\d\d)(\d\d) UTC/);
      sign = customOffset[1] === '+' ? 1 : -1;
      hours = +customOffset[2];
      minutes = +customOffset[3];
      numericOffset = sign * (hours + minutes/60);
    } else {
      throw(new Error('Could not parse UTC offset from database entry!'));
    }
  } catch (e) {
    // if we error, we assume 0 offset for calculations
    numericOffset = 0;
  }
  return numericOffset;
};

const getInititalTimeZoneState = (isoString, options) => {
  // If there's nothing in the DB and timezones are restricted, show first available. Otherwise, guess local timezone and use that.
  if (!isoString) {
    const firstOption = {
      code: options[0]?.code,
      label: options[0]?.label,
      offset: options[0]?.offset,
    };
    const defaultTz = unrestrictedTimezones.find(zone => Intl.DateTimeFormat().resolvedOptions().timeZone === zone.code) || firstOption;
    return options[0]?.restrictTimezones ? firstOption : defaultTz;
  } else {
    // if there is a time in the DB and time zones are restricted, we match to the time zone with the right offset
    if (options[0]?.restrictTimezones) {
      return options.find(zone => zone.offset === getNumericOffsetFromDirtyDateString(isoString));
    } else {
      // if time zones are unrestricted, match to the closest we can find
      return unrestrictedTimezones.find(zone => zone.offset === getNumericOffsetFromDirtyDateString(isoString));
    }
  }
}

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
  // If there is data in the DB, need the standard ISO 8601 string which is stored in first_response
  // We also catch several other formats that have snuck their way into the DB, see https://meedan.atlassian.net/browse/CHECK-1354
  const storedDateString = node?.first_response?.content ? JSON.parse(node.first_response.content)[0].value : null;
  const mutationPayload = {
    annotation_type: 'task_response_datetime',
    set_fields: `{"response_datetime":"${metadataValue}"}`,
  };
  const options = node.options?.length > 0 ? node.options : [{ code: 'UTC', label: 'UTC (GMT +0)', offset: 0 }];
  const alwaysShowTime = options[0]?.alwaysShowTime;
  const _classes = useStyles();
  const [timeZone, setTimeZone] = React.useState(getInititalTimeZoneState(storedDateString, options));
  const [offsetTime, setOffsetTime] = React.useState(null);
  const [displayDate, setDisplayDate] = React.useState(null);
  const [showTime, setShowTime] = React.useState(false);
  const [error, setError] = React.useState('');

  let convertedMaskDate;
  if (storedDateString) {
    // guess the database time zone from the stored ISO offset
    const guessedTimeZone = guessTimeZoneFromDirtyDateString(storedDateString);
    // use en-ZA to get YYYY/MM/DD
    convertedMaskDate = new Intl.DateTimeFormat('en-ZA',
      {
        timeZone: guessedTimeZone,
        dateStyle: 'short',
      }).format(getUnixTimeFromDirtyDateString(storedDateString));
  }
  const [displayDateMask, setDisplayDateMask] = React.useState(storedDateString ? convertedMaskDate : null);
  const [displayTime, setDisplayTime] = React.useState('');

  let convertedMaskTime;
  if (storedDateString) {
    // guess the database time zone from the stored ISO offset
    const guessedTimeZone = guessTimeZoneFromDirtyDateString(storedDateString);
    convertedMaskTime = new Intl.DateTimeFormat('en-US',
      {
        timeZone: guessedTimeZone,
        hour: '2-digit',
        minute: '2-digit'
      }).format(getUnixTimeFromDirtyDateString(storedDateString));
  }
  const [displayTimeMask, setDisplayTimeMask] = React.useState(storedDateString ? convertedMaskTime : null);

  function handleDateChange(_, maskedInput) {
    setDisplayDateMask(maskedInput);
    const date = dayjs(maskedInput);
    setDisplayDate(date?.format());
    // combine the set date with the current set UTC time to get metadata (final) value
    if (offsetTime && date) {
      const o = dayjs(offsetTime);
      setMetadataValue(
        dayjs(date?.format())
          .hour(o.hour())
          .minute(o.minute())
          .format(),
      );
    } else {
      // otherwise just set the date to midnight day of
      setMetadataValue(date?.utcOffset(timeZone.offset, true).hour(0).minute(0).format());
    }
  }

  function handleTimeChange(_, maskedInput) {
    setDisplayTimeMask(maskedInput);
    const time = dayjs(`${displayDateMask} ${maskedInput}`);
    setDisplayTime(time?.format());
    setOffsetTime(time?.utcOffset(timeZone.offset, true).format());
    // combine the UTC time with the current set date to get metadata (final) value
    const o = time?.utcOffset(timeZone.offset, true);
    setMetadataValue(
      dayjs(displayDate)
        .utcOffset(timeZone.offset, true)
        .hour(o.hour())
        .minute(o.minute())
        .format(),
    );
  }

  function handleTimeZoneOffsetChange(event, value) {
    // handle clearing timezone selection (value = null)
    const newValue = value || { offset: 0 };
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
    setDisplayDateMask(null);
    setDisplayTimeMask(null);
  }

  const selectOptions = options[0]?.restrictTimezones ? options : unrestrictedTimezones;

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
            <KeyboardDatePicker
              value={displayDate}
              inputValue={displayDateMask}
              onChange={(_, maskedInput) => handleDateChange(_, maskedInput)}
              onError={err => setError(err)}
              inputVariant="outlined"
              format="YYYY/MM/DD"
              mask="____/__/__"
              placeholder="Date"
              disabled={disabled}
              clearable
            />
            {
              alwaysShowTime || showTime ? (
                <>
                  <KeyboardTimePicker
                    value=""
                    className={_classes.timePicker}
                    inputValue={displayTimeMask}
                    onChange={(_, maskedInput) => handleTimeChange(_, maskedInput)}
                    inputVariant="outlined"
                    disabled={disabled || !displayDateMask}
                    error={options[0]?.requireTime && displayTime === null}
                    keyboardIcon={<AccessTimeIcon/>}
                    placeholder="Time"
                    mask="__:__ _M"
                    clearable
                  />
                  <Autocomplete
                    className={_classes.timeZoneSelect}
                    options={selectOptions}
                    getOptionLabel={option => option.label || ''}
                    getOptionSelected={option => option.label === timeZone?.label}
                    value={timeZone?.label ? timeZone : null}
                    filterSelectedOptions
                    onChange={handleTimeZoneOffsetChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label=""
                      />
                    )}
                    disabled={disabled}
                  />
                </>) : (
                <Button
                  className={_classes.addTime}
                  startIcon={<AddIcon />}
                  onClick={() => setShowTime(!showTime)}
                  disabled={disabled}
                >
                  Add time
                </Button>)
            }
          </FormControl>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                empty={!metadataValue || error.length > 0 || (options[0]?.requireTime && displayTime === null)}
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
