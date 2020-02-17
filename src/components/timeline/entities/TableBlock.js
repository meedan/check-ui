import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  leftCol: {
    width: '224px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  rightCol: {},
  plain: {
    border: 'none',
  },
});

function TableBlock(props) {
  const { classes, leftColContent, rightColContent } = props;
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
}

export default withStyles(styles)(TableBlock);
