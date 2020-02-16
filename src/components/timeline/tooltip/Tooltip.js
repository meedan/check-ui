import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const MeTooltip = styled.div`
  background: ${grey[800]};
  border-radius: 3px;
  bottom: 100%;
  color: white !important;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  font-family: 'Roboto', sans-serif;
  font-size: 11px !important;
  left: 50%;
  line-height: 11px !important;
  padding: 6px !important;
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, -6px);
  z-index: 200;
`;

export default MeTooltip;
