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

export default function Entities({ currentTime = 0, duration, entities = [], suggestions = [], type, ...props }) {
  const [newEntity, setNewEntity] = useState(null);
  const [newInstance, setNewInstance] = useState(null);
  const [sliderRect, setSliderRect] = useState(null);

  const displayEntities = newEntity ? [newEntity, ...entities] : entities;

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
    // construct a new dummy entity
    const newEntity = {
      id: Date.now(),
      [`project_${types[type]}`]: {
        name: '',
      },
      isLocal: true,
    };

    setNewEntity(newEntity);
  };
  const onEntityCreate = (payload, callback) => {
    const newEntity = {
      id: Date.now(),
      [`project_${types[type]}`]: {
        name: payload,
      },
    };
    props.onEntityCreate(types[type], newEntity, () => {
      setNewEntity(null);
      callback();
    });
  };
  const onEntityStop = () => {
    setNewEntity(null);
  };

  // entity methods

  const onEntityUpdate = (entityId, payload, callback) => {
    props.onEntityUpdate(types[type], entityId, payload, callback);
  };
  const onEntityDelete = (entityId, callback) => {
    props.onEntityDelete(types[type], entityId, callback);
  };

  // instance methods

  const onInstanceCreate = (entityId, payload) => {
    setNewInstance({
      ...payload,
      id: Date.now() + Math.random(),
      isLocal: true,
    });
    props.onInstanceCreate(types[type], entityId, payload, () => setNewInstance(null));
  };
  const onInstanceClip = (entityId, instanceId) => {
    if (!props.onInstanceClip) return null;
    props.onInstanceClip(types[type], entityId, instanceId);
  };
  const onInstanceDelete = (entityId, instanceId) => {
    props.onInstanceDelete(types[type], entityId, instanceId);
  };
  const onInstanceUpdate = (entityId, instanceId, payload) => {
    props.onInstanceUpdate(types[type], entityId, instanceId, payload);
  };

  // console.group('Entities');
  // console.log({ props });
  // console.log({ newEntity });
  // console.log({ displayEntities });
  // console.groupEnd();

  return (
    <TableSection
      plain={displayEntities.length > 0}
      title={titles[type]}
      actions={
        <>
          <Tooltip title="Play all">
            <IconButton onClick={props.onPlaylistLaunch} data-testid={`play-${types[type]}-button`}>
              <PlayArrowIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="New…">
            <IconButton onClick={onEntityStart} data-testid={`new-${types[type]}-button`}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      }>
      {displayEntities.map(({ instances = [], isLocal = false, ...entity }, i) => {
        const entityId = entity.id;
        const entityName = entity[`project_${types[type]}`].name;
        const entityType = types[type];

        const isLastChild = i === displayEntities.length - 1;

        const entityShape = {
          lat: entity.lat,
          lng: entity.lng,
          polygon: entity.polygon,
          type: entity.type,
          viewport: entity.viewport,
          zoom: entity.zoom,
        };

        return (
          <TableBlock
            key={entityId}
            leftColContent={
              <Controls
                currentTime={currentTime}
                duration={duration}
                entityName={entityName}
                entityShape={entityType === 'place' ? entityShape : null}
                entityType={entityType}
                instances={instances}
                isLocal={isLocal}
                onEntityCreate={onEntityCreate}
                onEntityDelete={callback => onEntityDelete(entityId, callback)}
                onEntityStop={onEntityStop}
                onEntityUpdate={(payload, callback) => onEntityUpdate(entityId, payload, callback)}
                onInstanceCreate={payload => onInstanceCreate(entityId, payload)}
                sliderRect={sliderRect}
                suggestions={suggestions}
              />
            }
            plain={!isLastChild}
            rightColContent={
              <Slider
                duration={duration}
                instances={newInstance ? [...instances, newInstance] : instances}
                onDrag={props.onTimeChange}
                onDragEnd={props.onAfterChange}
                onDragStart={props.onBeforeChange}
                onInstanceClip={instanceId => onInstanceClip(entityId, instanceId)}
                onInstanceDelete={instanceId => onInstanceDelete(entityId, instanceId)}
                onInstanceUpdate={(instanceId, payload) => onInstanceUpdate(entityId, instanceId, payload)}
                returnSliderRect={rect => setSliderRect(rect)}
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
  onEntityCreate: PropTypes.func.isRequired,
  onEntityDelete: PropTypes.func.isRequired,
  onEntityUpdate: PropTypes.func.isRequired,
  onInstanceClip: PropTypes.func,
  onInstanceCreate: PropTypes.func.isRequired,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  onPlaylistLaunch: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  type: PropTypes.string.isRequired,
};
