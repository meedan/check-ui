import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import produce from 'immer';

import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IconButton, Tooltip } from '@material-ui/core';

import EntityControls from './EntityControls';
import Slider from '../slider/Slider';
import TableBlock from '../elements/TableBlock';
import TableSection from '../elements/TableSection';

// const FPS = 30;

function getName(entity, entityType) {
  return entity[`project_${entityType}`].name;
}

class Entities extends Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    const { duration, skip, entityType, transport } = props;
    let { entities } = props;

    if (skip) return null;

    const playlist = transport === entityType;

    // TODO: move this upstream
    // merge overlapping tag instances
    // entities.forEach(e => {
    //   e.isCreating = false;
    //   e.instances = e.instances
    //     .sort((j, i) => j.start_seconds - i.start_seconds)
    //     .reduce((acc = [], i) => {
    //       const j = acc.pop();
    //
    //       if (j) {
    //         if (
    //           j.start_seconds <= i.start_seconds &&
    //           i.start_seconds < j.end_seconds
    //         ) {
    //           j.start_seconds = Math.min(j.start_seconds, i.start_seconds);
    //           j.end_seconds = Math.max(j.end_seconds, i.end_seconds);
    //           acc.push(j);
    //           return acc;
    //         }
    //
    //         acc.push(j);
    //       }
    //
    //       return [...acc, i];
    //     }, []);
    // });

    const segments = recomputeSegments(entities, duration);
    return { segments, playlist };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.skip) return false;

    if (
      nextProps.currentTime !== this.props.currentTime &&
      this.props.transport === this.props.entityType
    ) {
      const segment = this.state.segments.find(
        ([i, s, e]) => s <= nextProps.currentTime && nextProps.currentTime < e
      );
      if (!segment) {
        const nextSegment = this.state.segments.find(
          ([i, s]) => nextProps.currentTime < s
        );
        if (nextSegment) {
          this.props.seekTo({
            seekTo: nextSegment[1],
            transport: this.props.entityType,
          });
        } else {
          this.props.pause({ transport: null });
        }
      }
    }

    // if (
    //   nextProps.currentTime !== this.props.currentTime &&
    //   !this.state.playlist &&
    //   nextState === this.state
    // )
    //   return false;

    // TODO handle extenal video override, like end of video, buffering, etc

    return true;
  }

  handlePlay = () => {
    console.log(this.props.entityType);

    const start =
      this.state.segments && this.state.segments.length > 0
        ? this.state.segments[0][1]
        : 0;
    this.props.seekTo({ seekTo: start, transport: this.props.entityType });
    this.props.play({ transport: this.props.entityType });
  };

  handlePause = () => {
    this.props.pause({ transport: this.props.entityType });
  };

  startNewInstance = id => {
    const { currentTime } = this.props;

    const entities = produce(this.props.entities, nextEntities => {
      const ti = nextEntities.findIndex(t => t.id === id);
      const t = nextEntities[ti];

      const i = t.instances.find(
        i => i.start_seconds <= currentTime && currentTime < i.end_seconds
      );
      if (i) {
        console.log(
          'cannot make overlapping instances',
          currentTime,
          i.start_seconds,
          i.end_seconds
        );
      } else {
        t.instances.push({
          id: Date.now(),
          start_seconds: currentTime,
          end_seconds: currentTime + 30,
        });
      }
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  startNewEntity = () => {
    const { currentTime, entityType } = this.props;
    const id = Date.now();

    const entityName = (function() {
      if (entityType === 'tag') {
        return { project_tag: { name: '' } };
      } else if (entityType === 'location') {
        return { project_location: { name: '' } };
      } else if (entityType === 'clip') {
        return { project_clip: { name: '' } };
      }
      return null;
    })();

    const entities = produce(this.props.entities, nextEntities => {
      nextEntities.splice(0, 0, {
        ...entityName,
        id,
        isCreating: true,
        instances: [
          {
            id: Date.now(),
            start_seconds: currentTime,
            end_seconds: currentTime + 30,
          },
        ],
      });
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  stopNewEntity = () => {
    const entities = produce(this.props.entities, nextEntities => {
      nextEntities.splice(0, 1);
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  checkInstance = instanceId => {
    console.log('checkInstance', instanceId);
  };

  deleteEntity = id => {
    const entities = produce(this.props.entities, nextEntities => {
      const i = nextEntities.findIndex(t => t.id === id);
      nextEntities.splice(i, 1);
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  updateEntity = (id, name, payload) => {
    console.log(id, name, payload);
    const { entityType } = this.props;

    const entities = produce(this.props.entities, nextEntities => {
      const i = nextEntities.findIndex(t => t.id === id);
      nextEntities[i][`project_${entityType}`].name = name;
      if (payload)
        nextEntities[i][`project_${entityType}`] = {
          ...nextEntities[i][`project_${entityType}`],
          ...payload,
        };

      nextEntities[i][`project_${entityType}`].name = name;
      delete nextEntities[i].isCreating;
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  deleteInstance = (entityId, instanceId) => {
    const entities = produce(this.props.entities, nextEntities => {
      const ti = nextEntities.findIndex(t => t.id === entityId);
      const ii = nextEntities[ti].instances.findIndex(i => i.id === instanceId);

      nextEntities[ti].instances.splice(ii, 1);
    });

    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  duplicateAsClip = (entityId, instanceId) => {
    const { entities, clips, entityType } = this.props;
    const entity = entities.find(entity => entity.id === entityId);
    const instance = entity.instances.find(
      instance => instance.id === instanceId
    );

    console.log(entity, instance);

    const videoClips = produce(clips, nextClips => {
      let clip = nextClips.find(
        c => c.project_clip.name === getName(entity, entityType)
      );

      if (!clip) {
        clip = {
          id: Date.now(),
          isCreating: false,
          instances: [
            {
              id: Date.now(),
              start_seconds: instance.start_seconds,
              end_seconds: instance.end_seconds,
            },
          ],
          project_clip: {
            name: getName(entity, entityType),
          },
        };

        console.log('new clip', clip);

        nextClips.splice(0, 0, clip);
      } else {
        console.log('existing clip', clip);
        const j = {
          id: Date.now(),
          start_seconds: instance.start_seconds,
          end_seconds: instance.end_seconds,
        };

        const overlappingInstance = clip.instances.find(
          i =>
            (j.start_seconds <= i.start_seconds &&
              i.start_seconds <= j.end_seconds) ||
            (j.start_seconds <= i.end_seconds &&
              i.end_seconds <= j.end_seconds) ||
            (i.start_seconds <= j.start_seconds &&
              j.start_seconds <= i.end_seconds) ||
            (i.start_seconds <= j.end_seconds && j.end_seconds <= i.end_seconds)
        );

        if (overlappingInstance) {
          overlappingInstance.start_seconds = Math.min(
            overlappingInstance.start_seconds,
            j.start_seconds
          );
          overlappingInstance.end_seconds = Math.max(
            overlappingInstance.end_seconds,
            j.end_seconds
          );
        } else {
          clip.instances.push(j);
        }
      }
    });

    this.props.update({ videoClips });
  };

  extendInstance = (entityId, instanceId) => {
    const entities = produce(this.props.entities, nextEntities => {
      const ti = nextEntities.findIndex(t => t.id === entityId);
      const i = nextEntities[ti].instances.find(i => i.id === instanceId);
      i.start_seconds = 0;
      i.end_seconds = this.props.duration;
      nextEntities[ti].instances = [i];
    });
    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  updateInstance = (entityId, instanceId, { start_seconds, end_seconds }) => {
    console.log((entityId, instanceId, { start_seconds, end_seconds }));
    const entities = produce(this.props.entities, nextEntities => {
      const ti = nextEntities.findIndex(t => t.id === entityId);
      const i = nextEntities[ti].instances.find(i => i.id === instanceId);
      i.start_seconds = start_seconds;
      i.end_seconds = end_seconds;
    });
    this.props.update({ [this.props.entitiesyKey]: entities });
  };

  render() {
    const {
      entities,
      duration,
      suggestions,
      entityType,
      transport,
    } = this.props;
    const { playlist } = transport === entityType;

    // console.group('ENTITIES');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <TableSection
        plain={entities ? entities.length > 0 : false}
        title={this.props.title}
        actions={
          <>
            <Tooltip
              title={
                playlist ? 'Pause' : `Play ${this.props.title.toLowerCase()}`
              }>
              <span>
                <IconButton
                  disabled={entities.length < 1}
                  onClick={() =>
                    playlist ? this.handlePause() : this.handlePlay()
                  }>
                  <PlayArrowIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="New…">
              <IconButton onClick={this.startNewEntity}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        }>
        {entities
          ? entities.map((entity, i) => {
              const { instances } = entity;

              const arr = [];

              Array.from(instances)
                .sort((p, q) => p.start_seconds - q.start_seconds)
                .map(instance => {
                  arr.push(instance.start_seconds);
                  arr.push(instance.end_seconds);
                  return null;
                });

              arr.sort((p, q) => p - q);

              return (
                <TableBlock
                  key={entity.id}
                  plain={i < entities.length - 1}
                  leftColContent={
                    <EntityControls
                      deleteEntity={() => this.deleteEntity(entity.id)}
                      entityId={entity.id}
                      entityName={getName(entity, entityType)}
                      entityType={entityType}
                      isCreating={entity.isCreating}
                      startNewInstance={() => this.startNewInstance(entity.id)}
                      stopNewEntity={this.stopNewEntity}
                      suggestions={suggestions}
                      updateEntity={(name, payload) =>
                        this.updateEntity(entity.id, name, payload)
                      }
                    />
                  }
                  rightColContent={
                    <Slider
                      clipInstance={
                        entityType !== 'clip'
                          ? instanceId =>
                              this.duplicateAsClip(entity.id, instanceId)
                          : null
                      }
                      checkInstance={
                        entityType === 'clip'
                          ? instanceId => this.checkInstance(instanceId)
                          : null
                      }
                      extendInstance={instanceId =>
                        this.extendInstance(entity.id, instanceId)
                      }
                      duration={duration}
                      instances={instances}
                      updateInstance={(instanceId, payload) =>
                        this.updateInstance(entity.id, instanceId, payload)
                      }
                      deleteInstance={instanceId =>
                        this.deleteInstance(entity.id, instanceId)
                      }
                      onDrag={newTime => this.props.onChange(newTime)}
                      onDragEnd={newTime => this.props.onAfterChange(newTime)}
                      onDragStart={newTime =>
                        this.props.onBeforeChange(newTime)
                      }
                    />
                  }
                />
              );
            })
          : null}
      </TableSection>
    );
  }
}

const recomputeSegments = (entities, duration) => {
  if (!entities) return [];

  const instances = entities
    .reduce((acc, t) => [...acc, ...t.instances], [])
    .sort((j, i) => j.start_seconds - i.start_seconds);

  const events = [
    ...new Set(
      instances.reduce((acc, i) => [...acc, i.start_seconds, i.end_seconds], [
        0,
        duration,
      ])
    ),
  ].sort((j, i) => j - i);

  const segments = events
    .reduce(
      (acc, e, i) => {
        if (i === 0) return acc;
        return [...acc, events[i - 1] + (events[i] - events[i - 1]) / 2];
      },
      [0]
    )
    .reduce(
      (acc, s, i) =>
        !!instances.find(j => j.start_seconds <= s && s < j.end_seconds)
          ? [...acc, i]
          : acc,
      []
    )
    .map(i => [i, events[i - 1], events[i]]);

  return segments;
};

export default Entities;
