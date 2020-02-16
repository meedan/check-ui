import { array, func, number } from 'prop-types';
import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import Instance from './Instance';

const RSWrapper = styled.div`
  height: 28px;
  position: relative;
  width: 100%;
  user-select: none;
`;

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draggedInstance: null,
    };
    this.setDraggedInstance = this.setDraggedInstance.bind(this);
    this.updateRef = this.updateRef.bind(this);
    this.wrapperRef = createRef();
  }

  static getDerivedStateFromProps({ instances = [] }) {
    return { instances };
  }

  componentDidMount() {
    this.updateRef();
    window.addEventListener('resize', this.updateRef.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateRef.bind(this));
  }

  setDraggedInstance(id) {
    console.log('setDraggedInstance', id);
    this.setState({ draggedInstance: id || null });
  }

  updateRef() {
    if (!this.wrapperRef) return null;
    if (!this.wrapperRef.current) return null;
    this.setState({
      wrapper: {
        ref: this.wrapperRef.current,
        rect: this.wrapperRef.current.getBoundingClientRect(),
      },
    });
    return null;
  }

  render() {
    const { duration } = this.props;
    const { draggedInstance, instances, wrapper } = this.state;

    return (
      <RSWrapper ref={this.wrapperRef}>
        {instances.map(instance => {
          const { id, start_seconds, end_seconds } = instance;
          return (
            <Instance
              checkInstance={this.props.checkInstance}
              clipInstance={this.props.clipInstance}
              deleteInstance={() => this.props.deleteInstance(id)}
              duration={duration}
              end={end_seconds}
              extendInstance={() => this.props.extendInstance(id)}
              id={id}
              instance={instance}
              instances={instances}
              isLocked={draggedInstance && draggedInstance !== id}
              key={id}
              onDrag={payload => this.props.onDrag(payload)}
              onDragEnd={payload => this.props.onDragEnd(payload)}
              onDragStart={payload => this.props.onDragStart(payload)}
              setDraggedInstance={this.setDraggedInstance}
              start={start_seconds}
              updateInstance={payload => this.props.updateInstance(id, payload)}
              wrapper={wrapper}
            />
          );
        })}
      </RSWrapper>
    );
  }
}

export default RangeSlider;

RangeSlider.propTypes = {
  checkInstance: func,
  clipInstance: func,
  deleteInstance: func.isRequired,
  duration: number.isRequired,
  extendInstance: func.isRequired,
  instances: array.isRequired,
  onDrag: func.isRequired,
  onDragEnd: func.isRequired,
  onDragStart: func.isRequired,
  updateInstance: func.isRequired,
};
RangeSlider.defaultProps = {
  checkInstance: null,
  clipInstance: null,
};
