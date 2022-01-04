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

const guessTimeZoneFromISOString = isoString => {
  const offset = isoString.match(/(\d\d):(\d\d)$/);
  let timeZone;
  if (offset) {
    const numericOffset = getNumericOffsetFromISOString(isoString);
    timeZone = unrestrictedTimezones.find(zone => zone.offset === numericOffset).code;
  } else if (isoString.match(/Z$/)) {
    timeZone = 'UTC';
  } else {
    throw(new Error('Could not parse time zone from database entry!'));
  }
  return timeZone;
};

const getNumericOffsetFromISOString = isoString => {
  const offset = isoString.match(/(\+|-)(\d\d):(\d\d)$/);
  let numericOffset;
  if (offset) {
    const sign = offset[1] === '+' ? 1 : -1;
    const hours = +offset[2];
    const minutes = +offset[3];
    numericOffset = sign * (hours + minutes/60);
  } else if (isoString.match(/Z$/)) {
    numericOffset = 0;
  } else {
    throw(new Error('Could not parse UTC offset from database entry!'));
  }
  return numericOffset;
};

const getInititalTimeZoneState = (isoString, options) => {
  // If there's nothing in the DB and timezones are restricted, show first available. Otherwise, guess local timezone and use that.
  if (!isoString) {
    const firstOption = {
      code: options[0].code,
      label: options[0].label,
      offset: options[0].offset,
    };
    return options[0]?.restrictTimezones ? firstOption : unrestrictedTimezones.find(zone => Intl.DateTimeFormat().resolvedOptions().timeZone === zone.code)
  } else {
    // if there is a time in the DB and time zones are restricted, we match to the time zone with the right offset
    if (options[0]?.restrictTimezones) {
      return options.find(zone => zone.offset === getNumericOffsetFromISOString(isoString));
    } else {
      // if time zones are unrestricted, match to the closest we can find
      return unrestrictedTimezones.find(zone => zone.offset === getNumericOffsetFromISOString(isoString));
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
  const storedISODate = node?.first_response?.content ? JSON.parse(node.first_response.content)[0].value : null;
  const mutationPayload = {
    annotation_type: 'task_response_datetime',
    set_fields: `{"response_datetime":"${metadataValue}"}`,
  };
  const options = node.options?.length > 0 ? node.options : [{ code: 'UTC', label: 'UTC (GMT +0)', offset: 0 }];
  const alwaysShowTime = options[0]?.alwaysShowTime;
  const _classes = useStyles();
  const [timeZone, setTimeZone] = React.useState(getInititalTimeZoneState(storedISODate, options));
  const [offsetTime, setOffsetTime] = React.useState(null);
  const [displayDate, setDisplayDate] = React.useState(null);
  const [showTime, setShowTime] = React.useState(false);

  let convertedMaskDate;
  if (storedISODate) {
    // guess the database time zone from the stored ISO offset
    const guessedTimeZone = guessTimeZoneFromISOString(storedISODate);
    // use en-ZA to get YYYY/MM/DD
    convertedMaskDate = new Intl.DateTimeFormat('en-ZA',
      {
        timeZone: guessedTimeZone,
        dateStyle: 'short',
      }).format(Date.parse(storedISODate));
  }
  const [displayDateMask, setDisplayDateMask] = React.useState(storedISODate ? convertedMaskDate : null);
  const [displayTime, setDisplayTime] = React.useState('');

  let convertedMaskTime;
  if (storedISODate) {
    // guess the database time zone from the stored ISO offset
    const guessedTimeZone = guessTimeZoneFromISOString(storedISODate);
    convertedMaskTime = new Intl.DateTimeFormat('en-US',
      {
        timeZone: guessedTimeZone,
        hour: '2-digit',
        minute: '2-digit'
      }).format(Date.parse(storedISODate));
  }
  const [displayTimeMask, setDisplayTimeMask] = React.useState(storedISODate ? convertedMaskTime : null);

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
                </>) : (
                <Button
                  className={_classes.addTime}
                  startIcon={<AddIcon />}
                  onClick={() => setShowTime(!showTime)}
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
