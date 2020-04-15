import React from 'react';
import { render, screen } from 'test-utils';

import Timeline from '../Timeline';
import data from '../Timeline.data.json';

test('Rich Timeline renders', () => {
  render(
    <Timeline
      currentTime={500}
      data={data}
      duration={1000}
      onBeforeCommentThreadCreate={() => console.log('onBeforeCommentThreadCreate')}
      onCommentCreate={() => console.log('onCommentCreate')}
      onCommentDelete={() => console.log('onCommentDelete')}
      onCommentEdit={() => console.log('onCommentEdit')}
      onCommentThreadCreate={() => console.log('onCommentThreadCreate')}
      onCommentThreadDelete={() => console.log('onCommentThreadDelete')}
      onEntityCreate={() => console.log('onEntityCreate')}
      onEntityDelete={() => console.log('onEntityDelete')}
      onEntityUpdate={() => console.log('onEntityUpdate')}
      onInstanceClip={() => console.log('onInstanceClip')}
      onInstanceCreate={() => console.log('onInstanceCreate')}
      onInstanceDelete={() => console.log('onInstanceDelete')}
      onInstanceUpdate={() => console.log('onInstanceUpdate')}
      onPlaylistLaunch={() => console.log('onPlaylistLaunch')}
      onTimeChange={() => console.log('onTimeChange')}
    />
  );

  expect(screen.queryByText('Clips')).toBeInTheDocument();
  expect(screen.queryByText('Comments')).toBeInTheDocument();
  expect(screen.queryByText('Places')).toBeInTheDocument();
  expect(screen.queryByText('Tags')).toBeInTheDocument();
});
