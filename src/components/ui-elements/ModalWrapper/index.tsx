import React from 'react';
import { FunctionalComponent } from 'types/FunctionalComponent';
import { ModalWrapperContainer } from "components/ui-elements/ModalWrapper/styles";

interface ModalWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ModalWrapper: FunctionalComponent<ModalWrapperProps> = ({ title, children }) => {
  return <ModalWrapperContainer>
    <div className="title-wrapper">{title}</div>
    <div className="body-wrapper">{children}</div>
  </ModalWrapperContainer>;
};

export default ModalWrapper;
