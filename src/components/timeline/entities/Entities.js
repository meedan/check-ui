import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';

import Controls from './Controls';
import Slider from '../slider/Slider';
import TableBlock from '../elements/TableBlock';
import TableSection from '../elements/TableSection';

export default function Entities({
  currentTime = 0,
  duration,
  entities = [],
  suggestions = [],
  type,
  ...props
}) {
  const [newEntity, setNewEntity] = useState(null);
  const [newInstance, setNewInstance] = useState(null);
  const [sliderRect, setSliderRect] = useState(null);

  const localEntities = newEntity ? [newEntity, ...entities] : entities;

  const titles = {
    clips: 'Clips',
    places: 'Places',
    tags: 'Tags',
  };

  const types = {
    clips: 'clip',
    places: 'place',
    tags: 'tag',
  };

  const onEntityStart = () => {
    setNewEntity({
      id: Date.now(),
      [`project_${types[type]}`]: {
        name: '',
      },
      isLocal: true,
    });
  };
  const onEntityCreate = (payload, callback) => {
    props.onEntityCreate(
      {
        id: Date.now(),
        [`project_${types[type]}`]: {
          name: payload,
        },
      },
      () => {
        setNewEntity(null);
        callback();
      }
    );
  };
  const onEntityStop = () => {
    setNewEntity(null);
  };

  const onEntitiesPlay = () => {};

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

  const actions = (
    <>
      <Tooltip title="Play all">
        <IconButton onClick={onEntitiesPlay}>
          <PlayArrowIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="New…">
        <IconButton onClick={onEntityStart}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );

  // console.group('Entities');
  // console.log({ props });
  // console.groupEnd();

  return (
    <TableSection
      plain={localEntities.length > 0}
      title={titles[type]}
      actions={actions}>
      {localEntities.map((entity, i) => {
        const { instances, isLocal } = entity;

        const entityId = entity.id;
        const entityName = entity[`project_${types[type]}`].name;
        const entityType = types[type];

        const isLastChild = i === localEntities.length - 1;

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
                isLocal={isLocal}
                onInstanceCreate={payload =>
                  onInstanceCreate(entityId, payload)
                }
                onEntityDelete={callback =>
                  props.onEntityDelete(entityId, callback)
                }
                onEntityCreate={onEntityCreate}
                onEntityUpdate={(payload, callback) =>
                  props.onEntityUpdate(entityId, payload, callback)
                }
                onEntityStop={onEntityStop}
                sliderRect={sliderRect}
                suggestions={suggestions}
              />
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
                onDrag={props.onTimeChange}
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
  onTimeChange: PropTypes.func.isRequired,
  onInstanceClip: PropTypes.func,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  onInstanceCreate: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  type: PropTypes.string.isRequired,
};
