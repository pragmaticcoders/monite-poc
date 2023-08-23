import styled from 'styled-components';

export const StyledInput = styled.input<{ isError: boolean }>`
  background: #494b54;
  border: none;
  border-radius: 2px;
  padding: 0.5rem;
  color: #fff;
  box-sizing: border-box;

  ${props =>
    props.isError &&
    `
  background: #774B4E;
  color: rgba(255, 255, 255, 0.4)`}

  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
  
  &:focus {
    outline: none;
  }
`;
