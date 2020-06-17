import PropTypes from 'prop-types';
import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import config from '../utils/config';

const useStyles = makeStyles(theme => ({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftCol: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flex: `0 0 ${config.TIMELINE_OFFSET}px`,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '48px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  rightCol: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flex: `1 1 auto`,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '48px',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default function TableBlock(props) {
  const classes = useStyles();
  const { leftColContent, plain, rightColContent } = props;
  return (
    <div className={classes.row}>
      <div className={classes.leftCol} style={plain ? { border: 'none' } : {}}>
        <div>{leftColContent}</div>
      </div>
      <div className={classes.rightCol} style={plain ? { border: 'none' } : {}}>
        <div>{rightColContent}</div>
      </div>
    </div>
  );
}

TableBlock.propTypes = {
  leftColContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  plain: PropTypes.bool,
  section: PropTypes.bool,
  rightColContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

TableBlock.defaultProps = {
  plain: false,
  rightColContent: null,
  section: false,
};
