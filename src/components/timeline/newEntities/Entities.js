import React from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';
import Slider from '../slider/Slider';
import TableBlock from '../elements/TableBlock';
import TableSection from '../elements/TableSection';

export default function Entities(props) {
  const { entities, duration, suggestions, type } = props;

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

  return (
    <TableSection plain={entities.length > 0} title={titles[type]}>
      {entities.map((entity, i) => {
        const { instances } = entity;

        console.log({ entity });

        const entityId = entity.id;
        const entityName = entity[`project_${types[type]}`].name;

        const isLastChild = i === entities.length - 1;

        return (
          <TableBlock
            key={entityId}
            leftColContent={
              <>{entityName}</>
              // <Controls
              //   deleteEntity={args => console.log('deleteEntity', args)}
              //   entityid={id}
              //   entityName={entity[`project_${type}`].name}
              //   entityType={type}
              //   isCreating={entity.isCreating}
              //   startNewInstance={args =>
              //     console.log('startNewInstance', args)
              //   }
              //   stopNewEntity={args => console.log('stopNewEntity', args)}
              //   suggestions={suggestions}
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
                instances={instances}
                onDrag={props.onChange}
                onDragEnd={props.onAfterChange}
                onDragStart={props.onBeforeChange}
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
  suggestions: PropTypes.array,
  type: PropTypes.string.isRequired,
};

Entities.defaultProps = {
  currentTime: 0,
  entities: [],
  onInstanceClip: null,
  suggestions: [],
};
