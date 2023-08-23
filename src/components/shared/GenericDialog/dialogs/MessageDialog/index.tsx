import React, { FC } from 'react';
import { InfoDialogDialogContainer } from './styles';
import Space from "components/ui-elements/Space";
import Button from "components/ui-elements/Button";
import { GenericDialogProps } from "components/shared/GenericDialog/types";

interface MessageDialogProps extends GenericDialogProps {
  title: string;
  message?: string;
  type: string;
  dataTest?: string;
}

const MessageDialog: FC<MessageDialogProps> = ({
  title = "Ouups...",
  message,
  type = 'info',
  dataTest = 'info-dialog',
  callback,
}) => (
  <InfoDialogDialogContainer data-test={dataTest} type={type}>
    <div className="heading">{title}</div>

    <Space height=".5rem" />

    <div className="dialog-message">{message}</div>

    <Space height="1.5rem" />

    <div className="buttons-holder">
      <Button onClick={callback}>
        Close
      </Button>
    </div>
  </InfoDialogDialogContainer>
);

export default MessageDialog;
