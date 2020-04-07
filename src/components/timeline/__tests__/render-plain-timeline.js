// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Timeline from '../Timeline';

test('Plain Timeline renders', () => {
  const testMessage = 'Test Message';
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

  expect(screen.queryByText('Clips')).toBeInTheDocument();
  expect(screen.queryByText('Comments')).toBeInTheDocument();
  expect(screen.queryByText('Places')).toBeInTheDocument();
  expect(screen.queryByText('Tags')).toBeInTheDocument();
});
