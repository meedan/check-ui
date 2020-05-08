import React from 'react';
import { render, screen } from 'test-utils';

import Timeline from '../Timeline';

test('<Timeline /> Test:', () => {
  render(
    <Timeline
      currentTime={0}
      data={{
        commentThreads: [],
        project: {
          projectclips: [],
          projectplaces: [],
          projecttags: [],
        },
        videoClips: [],
        videoPlaces: [],
        videoTags: [],
        user: {
          first_name: 'Mark',
          id: 2376,
          last_name: 'Boas',
          profile_img_url:
            'https://lh4.googleusercontent.com/-KAQP-uwuJ-U/AAAAAAAAAAI/AAAAAAAAAA8/m1-ILT1IqWs/s100/photo.jpg',
        },
      }}
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

  // check if all timeline parts are present
  expect(screen.queryByTestId('entities-clips')).toBeInTheDocument();
  expect(screen.queryByTestId('entities-comments')).toBeInTheDocument();
  expect(screen.queryByTestId('entities-places')).toBeInTheDocument();
  expect(screen.queryByTestId('entities-playhead')).toBeInTheDocument();
  expect(screen.queryByTestId('entities-tags')).toBeInTheDocument();

  // check if comments
});
