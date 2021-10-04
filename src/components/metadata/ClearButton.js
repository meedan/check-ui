import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  clearButton: {
    color: '#979797',
    fontSize: '9px',
    justifyContent: 'left',
    '& .MuiSvgIcon-root': {
      fontSize: '13px',
    },
    '& .MuiButton-startIcon': {
      marginTop: '-2px',
      marginRight: '2px',
    }
  },
});

function ClearButton({cleanup}) {
  const _classes = useStyles();
  return (
    <Button
      className={_classes.clearButton}
      size="small"
      color="secondary"
      variant="text"
      startIcon={<ClearIcon />}
      onClick={cleanup}
    >
      Clear
    </Button>
  );
}

ClearButton.propTypes = {
  cleanup: PropTypes.func.isRequired,
};

export default ClearButton;
