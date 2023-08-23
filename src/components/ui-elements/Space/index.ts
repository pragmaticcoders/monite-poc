import styled from 'styled-components';
import { HTMLProps } from 'react';

interface SpaceProps {
  width?: string,
  height?: string,
  inline?: boolean,
}

const Space = styled.div<SpaceProps & HTMLProps<HTMLDivElement>>`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => props.inline && 'display: inline-block; vertical-align: middle;'}
`;

Space.defaultProps = {
  width: '1rem',
  height: '1rem',
};

export default Space;
