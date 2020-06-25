import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      buffering: false,
      position: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { seekTo, seekAhead, scrubTo, playing, onTimeUpdate } = this.props;
    const { ready, buffering, position } = this.state;

    if (seekTo !== prevProps.seekTo && ready) {
      if (seekTo !== null) {
        if (this.internalPlayer) {
          this.internalPlayer.seekTo?.(seekTo, seekAhead);
        } else {
          this.player.seekTo(seekTo, 'seconds');
        }
        (buffering || !playing) && onTimeUpdate(seekTo);
      }
    }

    if (scrubTo !== prevProps.scrubTo && ready) {
      if (scrubTo !== null) {
        if (prevProps.scrubTo === null) this.setState({ position: this.internalPlayer ? this.internalPlayer.getCurrentTime?.() : this.player.getCurrentTime() });
        if (this.internalPlayer) {
          this.internalPlayer.seekTo?.(scrubTo, seekAhead);
        } else {
          this.player.seekTo(scrubTo, 'seconds');
        }
      } else if (prevProps.scrubTo !== null && position) {
        if (this.internalPlayer) {
          this.internalPlayer.seekTo?.(position, seekAhead);
        } else {
          this.player.seekTo(position, 'seconds');
        }
      }
    }
  }

  handleOnReady = player => {
    const internalPlayer = player.getInternalPlayer();
    this.player = player;
    this.internalPlayer = internalPlayer.nodeName === 'VIDEO' ? null : internalPlayer;
    window.internalPlayer = this.internalPlayer;

    // const { register } = this.props;
    // register('seekTo', this.seekTo);
    // register('seekTo', this.seekTo);

    this.setState({ ready: true });
    this.props.onReady();
  };

  handleOnProgress = ({ playedSeconds }) => {
    const { onTimeUpdate, onProgress, roundTime, seekTo, seekAhead, scrubTo, gaps = [] } = this.props;
    const { buffering, playing } = this.state;

    scrubTo || onProgress(roundTime ? Math.round(playedSeconds * 1e3) / 1e3 : playedSeconds);

    const time = (seekTo || scrubTo) && buffering ? seekTo : playedSeconds;
    scrubTo || onTimeUpdate(roundTime ? Math.round(time * 1e3) / 1e3 : time);

    const gap = gaps.find(([a, b]) => a <= time && time < b);
    if (gap) {
      if (this.internalPlayer) {
        this.internalPlayer.seekTo?.(gap[1], seekAhead || playing);
      } else {
        this.player.seekTo(gap[1], 'seconds');
      }
    }
  };

  render() {
    const {
      config,
      muted,
      playbackRate,
      playing,
      onDuration,
      onPlay,
      onPause,
      scrubTo,
      start,
      end
    } = this.props;
    const url = new URL(this.props.url);

    if (start) url.searchParams.set('start', start);
    if (end) url.searchParams.set('end', end);
    if (start || end) config.youtube.playerVars.autoplay = 1;

    return (
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        config={config}
        progressInterval={200}
        url={url.href}
        muted={muted}
        playbackRate={playbackRate}
        playing={playing && !scrubTo}
        onPlay={() => !scrubTo && onPlay()}
        onPause={() => !scrubTo && onPause()}
        onEnded={onPause}
        onDuration={onDuration}
        onProgress={this.handleOnProgress}
        onReady={this.handleOnReady}
        onBuffer={() => this.setState({ buffering: true })}
        onBufferEnd={() => this.setState({ buffering: false })}
      />
    );
  }
}

Player.propTypes = {
  config: PropTypes.object,
  muted: PropTypes.bool,
  onDuration: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  playbackRate: PropTypes.number,
  playing: PropTypes.bool,
  roundTime: PropTypes.bool,
  seekAhead: PropTypes.bool,
  url: PropTypes.string,
};

Player.defaultProps = {
  config: {
    youtube: {
      playerVars: {
        autoplay: 1,
      },
      preload: true,
    },
  },
  muted: false,
  roundTime: false,
  seekAhead: false,
};

export default Player;
