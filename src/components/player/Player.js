import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

class Player extends Component {
  constructor(props) {
    super(props);

    this.player = React.createRef();
    this.state = {
      ready: false,
      buffering: false,
      position: null,
    };
  }

  // shouldComponentUpdate(nextProps) {}

  componentDidUpdate(prevProps) {
    const { seekTo, seekAhead, scrubTo, playing, onTimeUpdate } = this.props;
    const { ready, buffering, position } = this.state;

    if (seekTo !== prevProps.seekTo && ready) {
      if (seekTo !== null) {
        this.internalPlayer.seekTo(seekTo, seekAhead || playing);
        (buffering || !playing) && onTimeUpdate(seekTo);
      }
    }

    if (scrubTo !== prevProps.scrubTo && ready) {
      if (scrubTo !== null) {
        if (prevProps.scrubTo === null) this.setState({ position: this.player.current.getCurrentTime() });
        this.internalPlayer.seekTo(scrubTo, seekAhead);
        // (buffering || !playing) &&
        onTimeUpdate(scrubTo);
      } else if (prevProps.scrubTo !== null) {
        this.internalPlayer.seekTo(position, seekAhead || playing);
        (buffering || !playing) && onTimeUpdate(position);
      }
    }
  }

  handleOnReady = () => {
    this.internalPlayer = this.player.current.getInternalPlayer();
    this.setState({ ready: true });
  };

  handleOnProgress = ({ playedSeconds }) => {
    const { onTimeUpdate, onProgress, roundTime, seekTo, scrubTo } = this.props;
    const { buffering } = this.state;

    onProgress(roundTime ? Math.round(playedSeconds * 1e3) / 1e3 : playedSeconds);

    const time = (seekTo || scrubTo) && buffering ? seekTo : playedSeconds;
    onTimeUpdate(roundTime ? Math.round(time * 1e3) / 1e3 : time);
  };

  render() {
    const { config, muted, playing, onDuration, onPlay, onPause, scrubTo } = this.props;

    return (
      <ReactPlayer
        ref={this.player}
        width="100%"
        height="100%"
        controls
        config={config}
        progressInterval={200}
        url={this.props.url}
        muted={muted}
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
  url: PropTypes.string,
  muted: PropTypes.bool,
  playing: PropTypes.bool,
  roundTime: PropTypes.bool,
  seekAhead: PropTypes.bool,
  onDuration: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

Player.defaultProps = {
  config: {
    youtube: {
      playerVars: {
        autoplay: 0,
      },
      preload: true,
    },
  },
  muted: true,
  roundTime: false,
  seekAhead: false,
};

export default Player;
