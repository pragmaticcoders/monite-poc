import React from 'react';
import { LoaderContainer } from './styles';
import { FunctionalComponent } from "types/FunctionalComponent";

interface LoaderProps {
  className?: string;
  dataTestId?: string;
};

const Loader: FunctionalComponent<LoaderProps> = ({className, dataTestId}) => {
  return (
    <LoaderContainer className={className} data-testid={dataTestId} />
  );
}

export default Loader;