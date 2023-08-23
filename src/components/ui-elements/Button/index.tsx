import { FunctionalComponent } from 'types/FunctionalComponent';
import { StyledButton } from './styles';
import React from 'react';
import cn from 'classnames';
import Spinner from 'components/ui-elements/Spinner';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  secondary?: boolean;
  isLoading?: boolean;
  small?: boolean;
}

const Button: FunctionalComponent<ButtonProps> = ({
  children,
  onClick,
  className,
  secondary,
  isLoading,
  small,
}) => {
  return (
    <StyledButton
      className={cn('button', className)}
      isSecondary={secondary}
      onClick={onClick}
      isLoading={isLoading}
      small={small}
    >
      {children}

      {isLoading && (
        <div className="spinner-holder">
          <Spinner />
        </div>
      )}
    </StyledButton>
  );
};

export default Button;
