import PropTypes from 'prop-types';
import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  leftCol: {
    width: '224px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  plain: {
    border: 'none',
  },
});

const TableBlock = props => {
  const classes = useStyles();
  const { leftColContent, rightColContent } = props;
  return (
    <TableRow>
      <TableCell
        className={`${classes.leftCol} ${props.plain ? classes.plain : null}`}
        padding={!props.section ? 'none' : 'default'}>
        {leftColContent}
      </TableCell>
      <TableCell
        className={`${classes.rightCol} ${props.plain ? classes.plain : null}`}
        padding={!props.section ? 'none' : 'default'}>
        {rightColContent}
      </TableCell>
    </TableRow>
  );
};

TableBlock.propTypes = {
  leftColContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  plain: PropTypes.bool,
  section: PropTypes.bool,
  rightColContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

TableBlock.defaultProps = {
  plain: false,
  rightColContent: null,
  section: false,
};

export default TableBlock;
