import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

import MeTooltip from '../tooltip/Tooltip';
import formatSeconds from './formatSeconds';

const PlayheadTrackRoot = styled(({ theme, ...props }) => <div {...props} />)`
  cursor: -webkit-grab;
  cursor: col-resize;
  cursor: grab;
  height: 100%;
  pointer-events: all;
  position: absolute;
  touch-action: pan-x;
  transform: translateX(-50%);
  width: 28px;
  &:before {
    background: ${theme => theme.theme.palette.primary.main};
    border-radius: 4px;
    content: ' ';
    display: block;
    height: 9px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-55%, -50%);
    width: 9px;
  }
  &:after {
    border-left: 1px solid ${theme => theme.theme.palette.primary.main};
    content: ' ';
    display: block;
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
  }
`;

class PlayheadHandle extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  static getDerivedStateFromProps({ value }) {
    return { value };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(e) {
    if (!e) return null;
    const coords = { x: e.pageX, y: e.pageY };

    const { max, rect } = this.props;
    const { width, left } = rect;

    if (coords.x <= 0) return null;
    const newValue = ((coords.x - left) * max) / width;

    this.setState(prevState => ({
      dragging: true,
      newValue: newValue >= 0 && newValue <= max ? newValue : prevState.value,
    }));
    return null;
  }

  onMouseMove(e) {
    if (!e) return null;
    const coords = { x: e.pageX, y: e.pageY };

    if (!this.state.dragging) return null;
    const { max, rect } = this.props;
    const { width, left } = rect;

    if (coords.x <= 0) return null;
    const newValue = ((coords.x - left) * max) / width;

    this.setState(
      prevState => ({
        newValue:
          newValue >= 0 && newValue <= max ? newValue : prevState.newValue,
      }),
      this.props.updateTime(this.state.newValue)
    );

    return null;
  }

  onMouseUp() {
    this.setState({ dragging: false });
  }

  render() {
    if (!this.props.rect) return null;

    const { max, rect, theme } = this.props;
    const { dragging, value, newValue } = this.state;
    const { width } = rect;

    const displayTime = dragging ? newValue : value;

    const x = (displayTime * width) / max;

    return (
      <PlayheadTrackRoot
        style={{
          left: `${x}px`,
        }}
        theme={theme}
        onMouseDown={this.onMouseDown}>
        <MeTooltip isVisible={dragging}>{formatSeconds(displayTime)}</MeTooltip>
      </PlayheadTrackRoot>
    );
  }
}

PlayheadHandle.propTypes = {
  max: PropTypes.number.isRequired,
  rect: PropTypes.object,
  updateTime: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

PlayheadHandle.defaultProps = {
  rect: null,
};

export default withTheme(PlayheadHandle);
