import React, { FC } from 'react';
import { ConfirmDialogContainer } from './styles';
import Space from 'components/ui-elements/Space';
import Button from 'components/ui-elements/Button';
import { GenericDialogProps } from '../../types';

interface ConfirmDialogProps extends GenericDialogProps {
  title: string;
  message?: any;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ callback, title, message }) => (
  <ConfirmDialogContainer>
    <div className="heading">{title}</div>

    <div className="body">
      <div className="message-holder">{message}</div>

      <Space height="1.5rem" />

      <div className="buttons-holder">
        <Button secondary onClick={() => callback(false)}>
          Cancel
        </Button>
        <Button onClick={() => callback(true)}>Confirm</Button>
      </div>
    </div>
  </ConfirmDialogContainer>
);

export default ConfirmDialog;
