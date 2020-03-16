import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';
import Slider from '../slider/Slider';
import TableBlock from '../elements/TableBlock';
import TableSection from '../elements/TableSection';

export default function Entities(props) {
  const { currentTime, duration, entities, suggestions, type } = props;

  const [sliderRect, setSliderRect] = useState(null);
  const [newInstance, setNewInstance] = useState(null);

  console.group('Entities');
  console.log(props);
  console.groupEnd();

  const titles = {
    clips: 'Clips',
    places: 'Places',
    tags: 'Tags',
  };

  const types = {
    clips: 'clip',
    places: 'location',
    tags: 'tag',
  };

  const onInstanceCreate = (entityId, payload) => {
    setNewInstance({
      ...payload,
      id: Date.now() + Math.random(),
      isProcessing: true,
    });

    props.onInstanceCreate(entityId, payload, () => {
      setNewInstance(null);
    });
  };

  return (
    <TableSection plain={entities.length > 0} title={titles[type]}>
      {entities.map((entity, i) => {
        const { instances } = entity;

        console.log({ entity });

        const entityId = entity.id;
        const entityName = entity[`project_${types[type]}`].name;
        const entityType = types[type];

        const isLastChild = i === entities.length - 1;

        return (
          <TableBlock
            key={entityId}
            leftColContent={
              <Controls
                currentTime={currentTime}
                duration={duration}
                entityName={entityName}
                entityType={entityType}
                instances={instances}
                onInstanceCreate={payload =>
                  onInstanceCreate(entityId, payload)
                }
                onEntityDelete={callback =>
                  props.onEntityDelete(entityId, callback)
                }
                sliderRect={sliderRect}
                suggestions={suggestions}
              />
              // <Controls
              //   deleteEntity={args => console.log('deleteEntity', args)}
              //   isCreating={entity.isCreating}
              //   startNewInstance={args =>
              //     console.log('startNewInstance', args)
              //   }
              //   stopNewEntity={args => console.log('stopNewEntity', args)}
              //   updateEntity={(name, payload) =>
              //     console.log('updateEntity', id, name, payload)
              //   }
              // />
            }
            plain={!isLastChild}
            rightColContent={
              <Slider
                clipInstance={instanceId =>
                  props.onInstanceClip(entityId, instanceId)
                }
                deleteInstance={instanceId =>
                  props.onInstanceDelete(entityId, instanceId)
                }
                duration={duration}
                instances={
                  newInstance ? [...instances, newInstance] : instances
                }
                onDrag={props.onChange}
                onDragEnd={props.onAfterChange}
                onDragStart={props.onBeforeChange}
                returnSliderRect={rect => setSliderRect(rect)}
                updateInstance={(instanceId, payload) =>
                  props.onInstanceUpdate(entityId, instanceId, payload)
                }
              />
            }></TableBlock>
        );
      })}
    </TableSection>
  );
}

Entities.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      instances: PropTypes.array,
      id: PropTypes.number,
    })
  ),
  onAfterChange: PropTypes.func.isRequired,
  onBeforeChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onInstanceClip: PropTypes.func,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  onInstanceCreate: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  type: PropTypes.string.isRequired,
};

Entities.defaultProps = {
  currentTime: 0,
  entities: [],
  onInstanceClip: null,
  suggestions: [],
};
