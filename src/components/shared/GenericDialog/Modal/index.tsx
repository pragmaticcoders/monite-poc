import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { CloseButton, ModalBodyHolder } from './styles';
import noop from 'lodash/noop';
import defer from 'lodash/defer';

ReactModal.setAppElement('#root');

interface ModalProps {
  shouldCloseOnOverlayClick: boolean;
  onRequestClose: () => void;
  className?: string;
  transparentBody?: boolean;
  modalWidth?: string;
  showCloseIcon?: boolean;
  isOpen: boolean;
  overflowHidden?: boolean;
  modalPadding?: string;
  noContainer?: boolean;
  modalPosition?: 'top' | 'center';
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({
  shouldCloseOnOverlayClick,
  onRequestClose,
  className,
  transparentBody,
  modalWidth,
  showCloseIcon,
  children,
  isOpen,
  overflowHidden,
  modalPadding,
  noContainer,
  modalPosition = 'top',
}) => {
  const modalContainerRef = useRef(null);

  const [containerOffset, setContainerOffset] = useState(0);

  useEffect(() => {
    defer(() => {
      if (modalContainerRef.current) {
        const { bottom } = modalContainerRef.current.getBoundingClientRect();

        const bottomOffset = window.innerHeight - bottom;

        if (bottomOffset < 0) {
          setContainerOffset(Math.abs(bottomOffset));
        }
      }
    });
  }, [isOpen]);

  if (noContainer) {
    return (
      <ReactModal
        isOpen={isOpen}
        className={classNames('modal-component', className)}
        overlayClassName="modal-component-overlay"
        onRequestClose={onRequestClose}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <Fragment>
          {children}

          {showCloseIcon && <CloseButton secondary onClick={onRequestClose} />}
        </Fragment>
      </ReactModal>
    );
  }

  return (
    <ReactModal
      isOpen={isOpen}
      className={classNames('modal-component', className)}
      overlayClassName="modal-component-overlay"
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <Fragment>
        <ModalBodyHolder
          ref={modalContainerRef}
          transparent={transparentBody}
          modalWidth={modalWidth}
          overflowHidden={overflowHidden}
          modalPadding={modalPadding}
          className="cs-slim-scrollbar"
          bottomOffset={containerOffset}
          modalPosition={modalPosition}
        >
          {children}
        </ModalBodyHolder>

        {showCloseIcon && <CloseButton secondary onClick={onRequestClose}>X</CloseButton>}
      </Fragment>
    </ReactModal>
  );
};

Modal.defaultProps = {
  onRequestClose: noop,
  isOpen: false,
};

export default Modal;
