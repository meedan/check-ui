import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.caption,
    background: theme.palette.common.black,
    borderRadius: '3px',
    bottom: '100%',
    color: theme.palette.common.white,
    left: '50%',
    padding: '6px !important',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translate(-50%, -6px)',
    zIndex: '200',
  },
}));

export default function Tooltip(props) {
  const classes = useStyles();

  const { children, isVisible } = props;

  return (
    <div
      className={classes.root}
      children={children}
      style={{ display: isVisible ? 'block' : 'none' }}
    />
  );
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isVisible: PropTypes.bool,
};

Tooltip.defaultProps = {
  isVisible: false,
};
