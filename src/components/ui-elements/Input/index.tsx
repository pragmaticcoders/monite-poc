import { FunctionalComponent } from 'types/FunctionalComponent';
import { StyledInput } from './styles';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import cn from 'classnames';
import noop from 'lodash/noop';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

interface InputProps {
  className?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  error?: boolean;
  width?: string;
  height?: string;
  name?: string;
  onEnter?: (e: KeyboardEvent<any>) => void;
  onEscape?: (e: KeyboardEvent<any>) => void;
}

const Input: FunctionalComponent<InputProps> = ({
  className,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  width,
  name,
  height,
  onEnter = noop,
  onEscape = noop,
}) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === ENTER_KEY) {
      onEnter(e);
    }

    if (onEscape && e.key === ESCAPE_KEY) {
      onEscape(e);
    }
  };

  return (
    <StyledInput
      className={cn('input', className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      isError={error}
      width={width}
      height={height}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
