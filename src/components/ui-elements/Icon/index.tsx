import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import { I } from './styles';
import noop from 'lodash/noop';
import cn from 'classnames';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

interface IconProps {
  name?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  button?: boolean;
  red?: boolean;
  color?: string;
  size?: string;
  iconType?: string;
  spaceAfter?: boolean;
  weight?: 'thin' | 'regular' | 'bold' | number;
  role?: string;
  selectable?: boolean;
  tabIndex?: number;
  onEnter?: (e: KeyboardEvent) => void;
  onEscape?: (e: KeyboardEvent) => void;
  outline?: boolean;
}

const Icon: FC<IconProps> = ({
  className = '',
  onClick = noop,
  button = false,
  red = false,
  size = '1rem',
  ...props
}) => {
  const _onKeyDown = (e: KeyboardEvent) => {
    if (props.onEnter && e.key === ENTER_KEY) {
      props.onEnter(e);
    }

    if (props.onEscape && e.key === ESCAPE_KEY) {
      props.onEscape(e);
    }
  };

  return (
    <I
      className={cn('icon', `material-icons${props.outline ? '-outlined' : ''}`, className)}
      onClick={onClick}
      button={button}
      red={red}
      color={props.color}
      fontSize={size}
      spaceAfter={props.spaceAfter}
      weight={props.weight}
      role={props.role}
      selectable={props.selectable}
      tabIndex={props.tabIndex}
      onKeyDown={_onKeyDown}
      {...props}
    >
      {props.name}
    </I>
  );
};

export default Icon;
