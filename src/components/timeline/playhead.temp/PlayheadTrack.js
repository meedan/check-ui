import { bool, func, number, object, shape } from 'prop-types';
import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import MeTooltip from '../tooltip/Tooltip';
import formatSeconds from './formatSeconds';

const El = styled.div`
  cursor: -webkit-grab;
  cursor: col-resize;
  cursor: grab;
  height: 100%;
  pointer-events: all;
  position: absolute;
  touch-action: pan-x;
  transform: translateX(-50%);
  width: 7px;
  &:before {
    background: orange;
    border-radius: 4px;
    content: ' ';
    display: block;
    height: 7px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-55%, -50%);
    width: 7px;
  }
  &:after {
    border-left: 1px solid orange;
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

class Playhead extends Component {
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

    const { max, rect } = this.props;
    const { dragging, value, newValue } = this.state;
    const { width } = rect;

    const displayTime = dragging ? newValue : value;

    const x = (displayTime * width) / max;

    return (
      <El
        style={{
          left: `${x}px`,
        }}
        onMouseDown={this.onMouseDown}>
        <MeTooltip isVisible={dragging}>{formatSeconds(displayTime)}</MeTooltip>
      </El>
    );
  }
}

export default Playhead;

Playhead.propTypes = {
  max: number.isRequired,
  rect: object,
  updateTime: func.isRequired,
  value: number.isRequired,
};
Playhead.defaultProps = {
  rect: null,
};
