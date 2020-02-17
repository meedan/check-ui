import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const Tooltip = styled(({ theme, isVisible, ...props }) => <div {...props} />)`
  ${({ theme }) => theme.typography.caption};
  background: ${({ theme }) => theme.palette.common.black};
  border-radius: 3px;
  bottom: 100%;
  color: ${({ theme }) => theme.palette.common.white};
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  left: 50%;
  padding: 6px !important;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -6px);
  z-index: 200;
`;

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isVisible: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

Tooltip.defaultProps = {
  isVisible: false,
};

export default withTheme(Tooltip);
