import React, { Component, createRef } from 'react';
import { func, number, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PlayheadTrack from './PlayheadTrack';

const styles = () => ({
  playheadRoot: {
    minHeight: '28px',
    overflow: 'visible',
    pointerEvents: 'none',
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
});

class Playhead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.measureRef = this.measureRef.bind(this);
    this.ref = createRef();
  }

  componentDidMount() {
    this.measureRef();
    window.addEventListener('resize', this.measureRef.bind(this));
    document.addEventListener('resize', this.measureRef.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.measureRef.bind(this));
    window.removeEventListener('resize', this.measureRef.bind(this));
  }

  measureRef() {
    if (this.ref && this.ref.current)
      this.setState({ rect: this.ref.current.getBoundingClientRect() });
  }

  render() {
    const { rect } = this.state;
    const { classes, value, max, onChange, style } = this.props;

    return (
      <div className={classes.playheadRoot} ref={this.ref} style={style}>
        <PlayheadTrack
          max={max}
          rect={rect}
          updateTime={onChange}
          value={value}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Playhead);

Playhead.propTypes = {
  max: number.isRequired,
  onChange: func.isRequired,
  style: object,
  value: number,
};
Playhead.defaultProps = {
  style: null,
  value: 0,
};
