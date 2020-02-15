// import 'rc-slider/assets/index.css';
import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';

import EntityControls from './ofEntities/EntityControls';
import RangeSlider from './RangeSlider';
import TableBlock from './TableBlock';
import TableSection from './TableSection';

const INSTANCE_DEFAULT_DURATION = 30;

function getName(entity, entityType) {
  // return entity[`project_${entityType}`].name;
  return entity['project_tag'].name;
}

class Entities extends Component {
  state = {
    isCreating: {},
  };

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

    if (nextProps.currentTime !== this.props.currentTime && this.props.transport === this.props.entityType) {
      const segment = this.state.segments.find(([i, s, e]) => s <= nextProps.currentTime && nextProps.currentTime < e);
      if (!segment) {
        const nextSegment = this.state.segments.find(([i, s]) => nextProps.currentTime < s);
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
    const { segments } = this.state;
    const { seekTo, update, entityType } = this.props;

    const start = segments && segments.length > 0 ? segments[0][1] : 0;
    seekTo({ seekTo: start, transport: entityType });
    update({ playing: true, transport: entityType });
  };

  handlePause = () => {
    const { update, entityType } = this.props;
    update({ playing: false, transport: entityType });
  };

  startNewInstance = entityId => {
    const { createTag, entities, currentTime, entityType } = this.props;
    const entity = entities.find(({ id }) => id === entityId);

    const start_seconds = currentTime;
    let instance = entity.instances.find(i => i.start_seconds <= start_seconds && start_seconds < i.end_seconds);

    if (instance) {
      console.log('cannot make overlapping instances');
    } else {
      instance = entity.instances.find(
        i => start_seconds <= i.start_seconds && i.start_seconds < start_seconds + INSTANCE_DEFAULT_DURATION
      );
      const end_seconds = instance ? instance.start_seconds : start_seconds + INSTANCE_DEFAULT_DURATION;

      createTag(getName(entity, entityType), `t=${start_seconds},${end_seconds}`);
    }
  };

  startNewEntity = () => {
    const { createTag, currentTime, entityType } = this.props;
    createTag(
      `Tag ${Date.now()}`,
      `t=${currentTime},${currentTime + 30}&type=${entityType}`,
      (
        {
          createTag: {
            tagEdge: {
              node: {
                tag_text_object: { id },
              },
            },
          },
        },
        errors
      ) => {
        this.setState({ isCreating: { [id]: true } });
      }
    );
  };

  stopNewEntity = () => this.setState({ isCreating: {} });

  checkInstance = instanceId => console.log('checkInstance', instanceId);

  deleteEntity = entityId => {
    const { destroy, entities } = this.props;
    // delete all instances but not the tag-text
    entities
      .filter(({ id }) => id === entityId)
      .forEach(({ instances = [] }) => instances.forEach(({ id }) => destroy(id)));
  };

  updateEntity = (id, name, payload) => {
    console.log(id, name, payload);

    const { rename } = this.props;
    if (!payload) rename(id, name);
    // payload? check geotags???
  };

  deleteInstance = (entityId, instanceId) => this.props.destroy(instanceId);

  // TODO
  duplicateAsClip = (entityId, instanceId) => {
    // const { entities, clips, entityType } = this.props;
    // const entity = entities.find(entity => entity.id === entityId);
    // const instance = entity.instances.find(instance => instance.id === instanceId);
    // console.log(entity, instance);
    // const videoClips = produce(clips, nextClips => {
    //   let clip = nextClips.find(c => c.project_clip.name === getName(entity, entityType));
    //   if (!clip) {
    //     clip = {
    //       id: Date.now(),
    //       isCreating: false,
    //       instances: [
    //         {
    //           id: Date.now(),
    //           start_seconds: instance.start_seconds,
    //           end_seconds: instance.end_seconds,
    //         },
    //       ],
    //       project_clip: {
    //         name: getName(entity, entityType),
    //       },
    //     };
    //     console.log('new clip', clip);
    //     nextClips.splice(0, 0, clip);
    //   } else {
    //     console.log('existing clip', clip);
    //     const j = {
    //       id: Date.now(),
    //       start_seconds: instance.start_seconds,
    //       end_seconds: instance.end_seconds,
    //     };
    //     const overlappingInstance = clip.instances.find(
    //       i =>
    //         (j.start_seconds <= i.start_seconds && i.start_seconds <= j.end_seconds) ||
    //         (j.start_seconds <= i.end_seconds && i.end_seconds <= j.end_seconds) ||
    //         (i.start_seconds <= j.start_seconds && j.start_seconds <= i.end_seconds) ||
    //         (i.start_seconds <= j.end_seconds && j.end_seconds <= i.end_seconds)
    //     );
    //     if (overlappingInstance) {
    //       overlappingInstance.start_seconds = Math.min(overlappingInstance.start_seconds, j.start_seconds);
    //       overlappingInstance.end_seconds = Math.max(overlappingInstance.end_seconds, j.end_seconds);
    //     } else {
    //       clip.instances.push(j);
    //     }
    //   }
    // });
    // this.props.update({ videoClips });
  };

  extendInstance = (entityId, instanceId) => {
    const { retime, entities, duration, entityType } = this.props;
    const entity = entities.find(({ id }) => id === entityId);
    const index = entity.instances.findIndex(({ id }) => id === instanceId);
    let start_seconds = 0;
    let end_seconds = duration;

    if (index > 0) start_seconds = entity.instances[index - 1].end_seconds;
    if (index < entity.instances.length - 1) end_seconds = entity.instances[index + 1].start_seconds;

    retime(instanceId, `t=${start_seconds},${end_seconds}&type=${entityType}`);
  };

  updateInstance = (entityId, instanceId, { start_seconds, end_seconds }) => {
    const { retime, entityType } = this.props;
    retime(instanceId, `t=${start_seconds},${end_seconds}&type=${entityType}`);
  };

  render() {
    const { isCreating } = this.state;
    const { entities = [], duration, suggestions, entityType, transport } = this.props;
    const { playlist } = transport === entityType;

    return (
      <TableSection
        plain={entities ? entities.length > 0 : false}
        title={this.props.title}
        actions={
          <>
            <Tooltip title={playlist ? 'Pause all' : 'Play all'}>
              <IconButton onClick={() => (playlist ? this.handlePause() : this.handlePlay())}>
                <PlayArrowIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="New…">
              <IconButton onClick={this.startNewEntity}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        }>
        {entities.map((entity, i) => {
          const { instances = [] } = entity;

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
                  isCreating={isCreating[entity.id]}
                  startNewInstance={() => this.startNewInstance(entity.id)}
                  stopNewEntity={this.stopNewEntity}
                  suggestions={suggestions}
                  updateEntity={(name, payload) => this.updateEntity(entity.id, name, payload)}
                />
              }
              rightColContent={
                <RangeSlider
                  clipInstance={
                    entityType !== 'clip' ? instanceId => this.duplicateAsClip(entity.id, instanceId) : null
                  }
                  checkInstance={entityType === 'clip' ? instanceId => this.checkInstance(instanceId) : null}
                  extendInstance={instanceId => this.extendInstance(entity.id, instanceId)}
                  duration={duration}
                  instances={instances}
                  updateInstance={(instanceId, payload) => this.updateInstance(entity.id, instanceId, payload)}
                  deleteInstance={instanceId => this.deleteInstance(entity.id, instanceId)}
                  onDrag={newTime => this.props.onChange(newTime)}
                  onDragEnd={newTime => this.props.onAfterChange(newTime)}
                  onDragStart={newTime => this.props.onBeforeChange(newTime)}
                />
              }
            />
          );
        })}
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
    ...new Set(instances.reduce((acc, i) => [...acc, i.start_seconds, i.end_seconds], [0, duration])),
  ].sort((j, i) => j - i);

  const segments = events
    .reduce(
      (acc, e, i) => {
        if (i === 0) return acc;
        return [...acc, events[i - 1] + (events[i] - events[i - 1]) / 2];
      },
      [0]
    )
    .reduce((acc, s, i) => (!!instances.find(j => j.start_seconds <= s && s < j.end_seconds) ? [...acc, i] : acc), [])
    .map(i => [i, events[i - 1], events[i]]);

  return segments;
};

export default Entities;
