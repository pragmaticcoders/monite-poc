import styled from 'styled-components';

export const StyledButton = styled.button<{
  isSecondary: boolean;
  isLoading?: boolean;
  small?: boolean;
}>`
  background: #3c4669;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 1rem;
  padding: 0.7rem 1.3rem;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;

  ${props => props.isLoading && 'color: transparent !important;'}
  ${props => props.small && 'padding: 0.5rem 1rem; font-size: 0.85rem;'}

  &:hover {
    background-color: #949ba2;
  }

  .spinner-holder {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
  }

  ${props =>
    props.isSecondary &&
    `
background: #424550;`}
`;
