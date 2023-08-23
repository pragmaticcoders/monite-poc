import styled from 'styled-components';
import isNumber from 'lodash/isNumber';
import { HTMLProps } from 'react';

interface IProps {
  button?: boolean;
  red?: boolean;
  selectable?: boolean;
  spaceAfter?: boolean;
  weight?: "thin" | "regular" | "bold" | number;
  fontSize: string;
}

export const I = styled.i<HTMLProps<HTMLSpanElement> & IProps>`
  display: inline-block;
  vertical-align: middle;
  user-select: ${props => (props.selectable ? 'auto' : 'none')};
  ${props => props.button && `cursor: pointer;`}
  ${props => props.red && `color: #d4296b;`}
  ${props => props.color && `color: ${props.color};`}
  ${props => props.fontSize && `font-size: ${props.fontSize};`}
  ${props => props.spaceAfter && `margin-right: .5em;`}

  ${props => props.weight === 'thin' && 'font-weight: 100;'}
  ${props => props.weight === 'regular' && 'font-weight: 300;'}
  ${props => props.weight === 'bold' && 'font-weight: 600;'}
  ${props => isNumber(props.weight) && `font-weight: ${props.weight};`}
`;
