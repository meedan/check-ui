import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import TableBlock from './TableBlock';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  grid: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
});

export default function TableSection(props) {
  const classes = useStyles();
  const { actions, children, firstRowContent, title } = props;
  return (
    <div className={classes.root} onMouseLeave={props.onMouseLeave}>
      <TableBlock
        plain={props.plain}
        section
        leftColContent={
          <Grid
            alignItems="center"
            className={classes.grid}
            container
            justify="space-between">
            <Grid item>
              <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Grid item>{actions}</Grid>
          </Grid>
        }
        rightColContent={firstRowContent}
      />
      {children}
    </div>
  );
}

TableSection.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onMouseLeave: PropTypes.func,
  plain: PropTypes.bool,
  title: PropTypes.string.isRequired,
  firstRowContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

TableSection.defaultProps = {
  children: null,
  plain: false,
};
