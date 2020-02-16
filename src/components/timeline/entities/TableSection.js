import React from 'react';

import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';

import TableBlock from './TableBlock';

function TableSection(props) {
  const { actions, firstRowContent, children, title } = props;
  return (
    <TableBody
      style={{ width: '100%', position: 'relative', zIndex: '20' }}
      onMouseLeave={props.onMouseLeave}
    >
      <TableBlock
        plain={props.plain}
        leftColContent={
          <Grid
            alignItems="center"
            container
            justify="space-between"
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
            }}
          >
            <Grid item>
              <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Grid item>{actions}</Grid>
          </Grid>
        }
        rightColContent={firstRowContent}
      />
      {children}
    </TableBody>
  );
}

export default TableSection;
