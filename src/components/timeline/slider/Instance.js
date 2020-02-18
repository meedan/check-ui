import PopupState, { bindHover } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { Tooltip } from '@material-ui/core';

import HandlePopover from './HandlePopover';
import InstancePopover from './InstancePopover';
import formatSeconds from '../utils/formatSeconds';

const RSInstance = styled(({ ...props }) => <div {...props} />)`
  backface-visibility: visible;
  background: rgba(71, 123, 181, 0.4);
  bottom: 0;
  position: absolute;
  top: 0;
  &:hover {
    z-index: 3000;
  }
`;

const RSHandle = styled(({ isDragging, isVisible, pos, ...props }) => (
  <div {...props} />
))`
  background: rgba(71, 123, 181, 1);
  bottom: 0;
  cursor: ew-resize;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  position: absolute;
  top: 0;
  transform: ${({ pos }) => (pos === 'end' ? `translateX(-50%)` : ``)};
  transition: transform 250ms, opacity 250ms, width 250ms;
  width: ${({ isDragging }) => (isDragging ? 1 : 4)}px;
  z-index: 2000;
  &:hover {
    opacity: 1 !important;
  }
`;

class Instance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: null,
      overHandle: null,
      overInstance: null,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.onHandleEnter = this.onHandleEnter.bind(this);
    this.onHandleLeave = this.onHandleLeave.bind(this);
    this.onInstanceEnter = this.onInstanceEnter.bind(this);
    this.onInstanceLeave = this.onInstanceLeave.bind(this);

    this.setNewTime = this.setNewTime.bind(this);
    this.moveHandle = this.moveHandle.bind(this);
  }

  componentDidMount() {
    this.setState({
      end: this.props.end,
      start: this.props.start,
    });
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.end !== prevProps.end ||
      this.props.start !== prevProps.start
    ) {
      this.setState({
        end: this.props.end,
        start: this.props.start,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onInstanceEnter() {
    this.setState({ overInstance: true });
  }

  onInstanceLeave() {
    this.setState({ overInstance: null, overHandle: null });
  }

  onHandleEnter(e, edge) {
    this.setState({ overHandle: edge });
  }

  onHandleLeave() {
    this.setState(prevState => ({
      overHandle: null,
      overInstance: prevState.overInstance ? prevState.overInstance : null,
    }));
  }

  onMouseDown(e, edge) {
    e.persist();
    this.setState({ dragging: edge }, () => {
      this.props.setDraggedInstance(this.props.id);
      this.setNewTime(e);
      this.props.onDragStart(this.state[edge]);
    });
  }
  onMouseMove(e) {
    this.setNewTime(e);
    if (this.state.dragging) this.props.onDrag(this.state[this.state.dragging]);
  }
  onMouseUp(e) {
    if (!this.state.dragging) return null;
    this.props.onDragEnd(this.state[this.state.dragging]);
    this.props.updateInstance({
      end_seconds: this.state.end,
      start_seconds: this.state.start,
    });
    this.setState({ dragging: null });
    this.props.setDraggedInstance(null);
    return null;
  }

  setNewTime(e) {
    if (!e) return null;
    const coords = { x: e.pageX, y: e.pageY };

    if (!this.state.dragging) return null;
    const { duration, wrapper, instances } = this.props;
    const { dragging, end, start } = this.state;
    const { width, left } = wrapper.rect;
    const MIN_LENGTH = (6 * duration) / width;

    const prevInstance = _.maxBy(
      _.filter(instances, i => i.end_seconds <= start),
      i => i.end_seconds
    );
    const nextInstance = _.minBy(
      _.filter(instances, i => i.start_seconds >= end),
      i => i.start_seconds
    );
    const RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
    const RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;

    if (coords.x <= 0) return null;
    let newTime = ((coords.x - left) * duration) / width;

    if (dragging === 'start' && newTime > end - MIN_LENGTH) {
      newTime = end - MIN_LENGTH < 0 ? 0 : end - MIN_LENGTH;
    }
    if (dragging === 'end' && newTime < start + MIN_LENGTH) {
      newTime = start + MIN_LENGTH > duration ? duration : start + MIN_LENGTH;
    }

    this.setState(prevState => ({
      [dragging]:
        newTime >= RANGE_MIN && newTime <= RANGE_MAX
          ? newTime
          : prevState[dragging],
    }));

    return null;
  }

  moveHandle(edge, dir) {
    const { end, start } = this.state;
    const { duration, instances } = this.props;

    const prevInstance = _.maxBy(
      _.filter(instances, i => i.end_seconds <= start),
      i => i.end_seconds
    );
    const nextInstance = _.minBy(
      _.filter(instances, i => i.start_seconds >= end),
      i => i.start_seconds
    );
    const RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;
    const RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
    const UNIT = duration / this.props.wrapper.rect.width;

    const calcVal = prevState => {
      if (dir === 'fwd') {
        return prevState[edge] + UNIT < RANGE_MAX
          ? prevState[edge] + UNIT
          : RANGE_MAX;
      }
      if (dir === 'bwd') {
        return prevState[edge] - UNIT > RANGE_MIN
          ? prevState[edge] - UNIT
          : RANGE_MIN;
      }
      return null;
    };
    this.setState(
      prevState => ({
        [edge]: calcVal(prevState),
      }),
      () =>
        this.props.updateInstance({
          start_seconds: this.state.start,
          end_seconds: this.state.end,
        })
    );
  }

  render() {
    if (!this.props.wrapper) return null;
    if (!this.props.wrapper.ref) return null;

    const { isLocked, duration, wrapper } = this.props;
    const { end, start } = this.state;
    const { width } = wrapper.rect;

    const x1 = (start * width) / duration;
    const x2 = (end * width) / duration;

    const instanceLength = end - start;
    const instanceWidth = (instanceLength * width) / duration;

    const handles = [
      {
        edge: 'end',
        value: this.state.end,
      },
      {
        edge: 'start',
        value: this.state.start,
      },
    ];

    // console.group("Instance.js");
    // console.log(this.state);
    // console.groupEnd();

    return (
      <>
        <PopupState variant="popover" popupId="InstancePopover">
          {popupState => (
            <>
              <RSInstance
                style={{
                  left: `${x1}px`,
                  width: `${instanceWidth}px`,
                  zIndex: this.state.overInstance ? `1000` : `default`,
                }}
                onMouseEnter={!isLocked ? this.onInstanceEnter : null}
                onMouseLeave={!isLocked ? this.onInstanceLeave : null}>
                {!isLocked ? (
                  <div
                    {...bindHover(popupState)}
                    style={{ width: `100%`, height: `28px` }}
                  />
                ) : null}
              </RSInstance>
              {!this.state.dragging ? (
                <InstancePopover
                  checkInstance={this.props.checkInstance}
                  clipInstance={this.props.clipInstance}
                  deleteInstance={this.props.deleteInstance}
                  extendInstance={this.props.extendInstance}
                  instance={this.props.instance}
                  popupState={popupState}
                />
              ) : null}
            </>
          )}
        </PopupState>

        {handles.map(handle => {
          const { edge, value } = handle;
          const isHandleActive =
            this.state.dragging === edge || this.state.overHandle === edge;
          return (
            <PopupState
              key={`${edge}Popover`}
              popupId={`${edge}Popover`}
              variant="popover">
              {popupState => (
                <>
                  <RSHandle
                    isDragging={this.state.dragging === edge}
                    isVisible={
                      isHandleActive ||
                      (this.state.overInstance && !this.state.dragging) ||
                      popupState.isOpen
                    }
                    onMouseDown={e => this.onMouseDown(e, edge)}
                    onMouseEnter={e => this.onHandleEnter(e, edge)}
                    onMouseLeave={this.onHandleLeave}
                    style={{ left: edge === 'start' ? `${x1}px` : `${x2}px` }}
                    pos={edge}>
                    <Tooltip
                      open={this.state.dragging === edge && isHandleActive}
                      placement="top"
                      title={formatSeconds(value)}>
                      <div
                        style={{
                          height: `28px`,
                          transform: 'translateX(-10px)',
                          width: `24px`,
                        }}
                        {...bindHover(popupState)}></div>
                    </Tooltip>
                  </RSHandle>

                  {!this.state.dragging ? (
                    <HandlePopover
                      id={`${edge}Popover`}
                      moveBackward={() => this.moveHandle(edge, 'bwd')}
                      moveForward={() => this.moveHandle(edge, 'fwd')}
                      popupState={popupState}
                    />
                  ) : null}
                </>
              )}
            </PopupState>
          );
        })}
      </>
    );
  }
}

export default Instance;

Instance.propTypes = {
  checkInstance: PropTypes.func,
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  extendInstance: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  instances: PropTypes.array.isRequired,
  isLocked: PropTypes.bool,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  setDraggedInstance: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  updateInstance: PropTypes.func.isRequired,
  wrapper: PropTypes.shape({
    rect: PropTypes.object.isRequired,
    ref: PropTypes.object.isRequired,
  }),
};

Instance.defaultProps = {
  checkInstance: null,
  clipInstance: null,
  isLocked: null,
  wrapper: null,
};
