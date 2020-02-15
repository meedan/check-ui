import React from 'react';
import PropTypes from 'prop-types';

import OldEntities from './ofTimeline/Entities';

const entities = require('./tags.json');
const currentTime = 0;
const duration = 100;
const playing = false;

class Entities extends React.Component {
  render() {
    return (
      <OldEntities
        {...entities}
        createTag={args => console.log('createTag', args)}
        destroy={args => console.log('destroy', args)}
        onAfterChange={args => console.log('onAfterChange', args)}
        onBeforeChange={args => console.log('onBeforeChange', args)}
        onChange={args => console.log('onChange', args)}
        rename={args => console.log('rename', args)}
        retime={args => console.log('retime', args)}
        timelineOffset={0}
        update={args => console.log('update', args)}
      />
    );
  }
}

Entities.propTypes = {};

Entities.defaultProps = {};

export default Entities;
