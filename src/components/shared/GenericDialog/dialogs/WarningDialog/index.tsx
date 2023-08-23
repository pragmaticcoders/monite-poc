import React, { FC } from 'react';
import { MessageContainer, WarningDialogContainer, YellowBanner } from './styles';
import Space from 'components/ui-elements/Space';

interface WarningDialogProps {
  title: string;
  message?: string;
  dataTest?: string;
}

const WarningDialog: FC<WarningDialogProps> = ({ title, message, dataTest = 'warning-dialog' }) => (
  <WarningDialogContainer data-test={dataTest}>
    <YellowBanner>
      <Space height=".4rem" />

      <div className="cs-mar-1">
        <div className="error-title">{title || 'Ouups...'}</div>
      </div>
    </YellowBanner>

    <MessageContainer>
      <div className="error-message">{message || 'Something went wrong, try again later'}</div>
    </MessageContainer>
  </WarningDialogContainer>
);

export default WarningDialog;
