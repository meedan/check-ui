import React from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from 'test-utils';

import Timeline from '../Timeline';

const Component = props => (
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
    {...props}
  />
);

test('Timeline: component renders', () => {
  const { getByTestId } = render(<Component />);

  expect(getByTestId('entities-clips')).toBeInTheDocument();
  expect(getByTestId('entities-comments')).toBeInTheDocument();
  expect(getByTestId('entities-places')).toBeInTheDocument();
  expect(getByTestId('entities-playhead')).toBeInTheDocument();
  expect(getByTestId('entities-tags')).toBeInTheDocument();
});

test('Timeline: allows to start new comment thread', async () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(<Component />);

  fireEvent.click(getByTestId('new-comment-thread-button'));
  await waitFor(() => document.getElementById('newThreadPopover'));
  expect(getByPlaceholderText('New comment')).toBeInTheDocument();
  expect(getByText('Cancel')).toBeInTheDocument();
  expect(getByText('Save')).toBeInTheDocument();
});

test('Timeline: allows to cancel new comment thread', async () => {
  const { getByTestId, queryByText } = render(<Component />);

  fireEvent.click(getByTestId('new-comment-thread-button'));
  await waitFor(() => document.getElementById('newThreadPopover'));
  expect(queryByText('Cancel')).toBeInTheDocument();
  fireEvent.click(queryByText('Cancel'));
  expect(document.getElementById('newThreadPopover')).toBeNull();
});

test('Timeline: allows to save new comment thread', async () => {
  const payload = { a: 0, b: 'A new comment', c: jest.fn() };
  const onCommentThreadCreate = jest.fn((a, b, c) => payload);
  const { getByTestId, queryByPlaceholderText, queryByText } = render(
    <Component onCommentThreadCreate={onCommentThreadCreate} />
  );

  fireEvent.click(getByTestId('new-comment-thread-button'));
  await waitFor(() => document.getElementById('newThreadPopover'));

  // find popover children
  const input = queryByPlaceholderText('New comment');
  const saveButton = queryByText('Save');
  expect(input).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();

  // change input value
  fireEvent.change(input, { target: { value: payload.b } });

  // submit form
  fireEvent.click(saveButton);

  // final result
  expect(onCommentThreadCreate).toHaveBeenCalledTimes(1);
  expect(onCommentThreadCreate).toHaveReturnedWith(payload);
  expect(document.getElementById('newThreadPopover')).toBeInTheDocument();
});
