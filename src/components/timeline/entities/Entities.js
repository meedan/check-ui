import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles, withTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  entitiesRoot: {},
});

const Entities = props => {
  const entitiesRoot = useRef();
  const classes = useStyles();
  const {} = props;

  const [rootRect, setRootRect] = React.useState(null);

  useEffect(() => {
    setRootRect(entitiesRoot.current.getBoundingClientRect());
  }, [entitiesRoot]);

  return (
    <div className={classes.entitiesRoot} ref={entitiesRoot}>
      Entities
    </div>
  );
};

export default withTheme(Entities);

Entities.propTypes = {};
Entities.defaultProps = {};
