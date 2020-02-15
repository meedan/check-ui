import React from 'react';
import PropTypes from 'prop-types';

export class Timeline extends React.Component {
  render() {
    return <div>Timeline</div>;
  }
}

Timeline.propTypes = {
  data: PropTypes.string,
};

Timeline.defaultProps = {
  data: '',
};
