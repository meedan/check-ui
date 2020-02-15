import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const ClipboardIcon = props => {
  return (
    <SvgIcon {...props}>
      <path d="M14.8636 5H7.2273c-.7032 0-1.2728.5695-1.2728 1.2727v8.9091h1.2728v-8.909h7.6363V5zm1.9091 2.5455h-7c-.7032 0-1.2727.5695-1.2727 1.2727v8.909C8.5 18.4306 9.0695 19 9.7727 19h7c.7032 0 1.2728-.5695 1.2728-1.2727V8.8182c0-.7032-.5696-1.2727-1.2728-1.2727zm0 10.1818h-7V8.8182h7v8.909z" />
    </SvgIcon>
  );
};

export default ClipboardIcon;
