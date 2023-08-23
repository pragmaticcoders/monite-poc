import styled from 'styled-components';
import { HTMLProps } from 'react';

interface SpinnerProps {
  spaceAfter?: boolean;
}

const Spinner = styled.i<HTMLProps<HTMLSpanElement> & SpinnerProps>`
  display: inline-block;
  vertical-align: middle;
  width: 13px;
  height: 13px;
  border: 1.5px solid #d4296b;
  border-radius: 50%;
  border-top-color: #fffc;
  animation: spin 1s ease-in-out infinite;
  ${props => props.spaceAfter && `margin-right: .5em;`}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

Spinner.defaultProps = {
  className: 'spinner',
};

export default Spinner;
