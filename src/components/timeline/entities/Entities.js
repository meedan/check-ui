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
    const ifPlace = {
      lat: 0,
      lng: 0,
      type: 'marker',
      viewport: {
        south: 0,
        west: 0,
        north: 0,
        east: 0,
      },
      zoom: 3,
    };

    setNewEntity({
      id: Date.now(),
      [`project_${types[type]}`]: {
        name: null,
      },
      ...(types[type] === 'place' ? ifPlace : null),
    });
  };

  const onEntityCreate = (payload, callback) => {
    // console.log('onEntityCreate', { payload });
    props.onEntityCreate(
      types[type],
      {
        ...(types[type] === 'place' ? payload.place : null),
        id: Date.now(),
        fragment: `t=${currentTime},${currentTime + 30}&type=${type}`,
        [`project_${types[type]}`]: {
          name: payload.name,
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

  // entity methods
  const onEntityUpdate = (entityId, payload, callback) => {
    props.onEntityUpdate(types[type], entityId, payload, callback);
  };
  const onEntityDelete = (entityId, callback) => {
    props.onEntityDelete(types[type], entityId, callback);
  };

  // instance methods
  const onInstanceCreate = (entityId, payload) => {
    payload.fragment = `t=${currentTime},${currentTime + 30}&type=${type}`;

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
      {displayEntities.map(({ instances = [], ...entity }, i) => {
        const entityId = entity.id;
        const entityName = entity[`project_${types[type]}`].name;
        const entityType = types[type];

        const isLastChild = i === displayEntities.length - 1;

        const entityShape = entityName
          ? {
              lat: entity.lat,
              lng: entity.lng,
              polygon: entity.polygon,
              type: entity.type,
              viewport: entity.viewport,
              zoom: entity.zoom,
            }
          : null;

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
                entityType={entityType}
                instances={newInstance ? [...instances, newInstance] : instances}
                onDrag={props.onTimeChange}
                onDragEnd={props.onAfterChange}
                onDragStart={props.onBeforeChange}
                onInstanceClip={
                  props.onInstanceClip ? instanceId => onInstanceClip(types[type], entityId, instanceId) : null
                }
                onInstanceCopyPermalink={
                  props.onInstanceCopyPermalink
                    ? instanceId => onInstanceCopyPermalink(types[type], entityId, instanceId)
                    : null
                }
                onInstanceDelete={instanceId => onInstanceDelete(entityId, instanceId)}
                onInstanceUpdate={(instanceId, payload) => onInstanceUpdate(entityId, instanceId, payload)}
                onScrub={props.onScrub}
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
