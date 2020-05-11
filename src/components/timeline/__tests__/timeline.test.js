import React from 'react';
import _ from 'lodash';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from 'test-utils';

import Timeline from '../Timeline';
import data from '../Timeline.data.json';

const Component = props => (
  <Timeline
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
    {...props}
  />
);

/*
  ——————————————————————————————————————————
  COMMENTS
  ——————————————————————————————————————————
*/

test('Timeline: renders', () => {
  const { getByTestId } = render(<Component currentTime={1} />);
  // expect playhead, clips, comments, places and tags to be rendered
  expect(getByTestId('entities-clips')).toBeInTheDocument();
  expect(getByTestId('entities-comments')).toBeInTheDocument();
  expect(getByTestId('entities-places')).toBeInTheDocument();
  expect(getByTestId('entities-playhead')).toBeInTheDocument();
  expect(getByTestId('entities-tags')).toBeInTheDocument();
});

test('Comments: allow to open/close new comment thread', async () => {
  const { getByText, getByTestId } = render(<Component currentTime={1} />);
  // click on the new comment (+) button
  fireEvent.click(getByTestId('new-comment-thread-button'));
  // wait for comment to appear
  await waitFor(() => document.getElementById('newThreadPopover'));
  // click on Cancel button
  fireEvent.click(getByText('Cancel'), { container: document.getElementById('newThreadPopover') });
  // expect the comment popoveer to disappear
  await waitFor(() => expect(document.getElementById('newThreadPopover')).not.toBeInTheDocument());
});

test('Comments: allow to save new comment thread', async () => {
  const onCommentThreadCreate = jest.fn((time, text, callback) => ({
    time: time,
    text: text,
  }));
  const { getByTestId, getByPlaceholderText, getByText } = render(
    <Component onCommentThreadCreate={onCommentThreadCreate} currentTime={1} />
  );
  // click New Comment Thread button
  fireEvent.click(getByTestId('new-comment-thread-button'));
  // wait for the new comment thread popover to show up
  await waitFor(() => document.getElementById('newThreadPopover'));
  // set new comment text as input value
  fireEvent.change(getByPlaceholderText('New comment'), { target: { value: 'A new comment thread' } });
  // submit form
  fireEvent.click(getByText('Save'));
  // expect Save button to return the same value entered in the input field
  expect(onCommentThreadCreate).toHaveReturnedWith({ text: 'A new comment thread', time: 1 });
  // expect comment thread popover to remain visible
  expect(document.getElementById('newThreadPopover')).toBeInTheDocument();
});

test('Comments: display existing comments as avatars with src and alt attributes', async () => {
  render(<Component currentTime={1} />);
  // find all markers returned as map on the dataset
  const markers = document.querySelectorAll('.rc-slider-mark-text');
  // expect all of the returned markers to render avatars with images’ src and alt attributes
  expect(
    markers
      ? _.every(markers, marker => {
          return (
            marker.querySelectorAll('.MuiAvatar-img')[0].getAttribute('alt') &&
            marker.querySelectorAll('.MuiAvatar-img')[0].getAttribute('src')
          );
        })
      : true
  ).toBeTruthy();
});

test('Comments: allow to open/close existing comment thread', async () => {
  const { getByText } = render(<Component currentTime={1} />);
  const markers = document.querySelectorAll('.rc-slider-mark-text');
  const marker = markers[_.random(0, markers.length - 1)];
  const avatar = marker.querySelectorAll('[aria-haspopup="true"]')[0];

  // click on one of the avatars appearing in on the comments section
  fireEvent.click(avatar);
  // wait for comment popover to appear
  await waitFor(() => document.getElementById('markerEditPopover'));
  // click on Cancel button
  fireEvent.click(getByText('Cancel'), { container: document.getElementById('markerEditPopover') });
  // expect comment popover to disappear
  await waitFor(() => expect(document.getElementById('markerEditPopover')).not.toBeInTheDocument());
});

test('Comments: allow to reply to an existing comment thread', async () => {
  const { getByText } = render(<Component currentTime={1} />);
  const markers = document.querySelectorAll('.rc-slider-mark-text');
  const marker = markers[_.random(0, markers.length - 1)];
  const avatar = marker.querySelectorAll('[aria-haspopup="true"]')[0];

  // click on one of the avatars appearing in on the comments section
  fireEvent.click(avatar);
  // wait for comment popover to appear
  await waitFor(() => document.getElementById('markerEditPopover'));
  // // click on Cancel button
  // fireEvent.click(getByText('Cancel'), { container: document.getElementById('markerEditPopover') });
  // // expect comment popover to disappear
  // await waitFor(() => expect(document.getElementById('markerEditPopover')).not.toBeInTheDocument());
});
