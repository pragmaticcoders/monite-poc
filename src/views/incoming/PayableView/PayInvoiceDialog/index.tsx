import React, { FC, useState } from 'react';
import { PayInvoiceDialogContainer } from './styles';
import { GenericDialogProps } from 'components/shared/GenericDialog/types';
import ModalWrapper from 'components/ui-elements/ModalWrapper';
import Space from 'components/ui-elements/Space';
import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import { map } from 'lodash';
import Badge from 'components/ui-elements/Badge';
import humanizeString from 'humanize-string';
import PaymentService from 'service/payment.service';

interface PayInvoiceDialogProps extends GenericDialogProps {
  payable: any;
}

const PayInvoiceDialog: FC<PayInvoiceDialogProps> = ({ hideDialog, payable, callback }) => {
  const [isPaymentPending, setIsPaymentPending] = useState<boolean>(false);

  const onPayClick = async () => {
    setIsPaymentPending(true);

    try {
      await PaymentService.markInvoiceAsPaid(payable.id);
      callback();
    } catch (e) {
      console.error(e);
    } finally {
      setIsPaymentPending(false);
      hideDialog();
    }
  };

  return (
    <ModalWrapper title="Pay Invoice">
      <PayInvoiceDialogContainer>
        {map(
          {
            'invoice id': payable.id,
            amount: `${payable.amount / 100} ${payable.currency}`,
            status: <Badge>{humanizeString(payable.status)}</Badge>,
            'due date': payable.due_date,
            'document id': payable.document_id,
          },
          (value, key) => (
            <div className="invoice-details">
              <div className="label">{key}</div>
              <div className="value">{value}</div>
            </div>
          )
        )}

        <Space height="2rem" />

        <div className="amount">
          <div className="label">Amount</div>
          <div className="value">{`${payable.amount / 100} ${payable.currency}`}</div>
        </div>

        <Space height="2rem" />

        <div className="pay-button-holder">
          <Button className="pay-button" onClick={onPayClick} isLoading={isPaymentPending}>
            <Icon size="2rem" name="attach_money" />
            Pay Invoice
          </Button>
        </div>

        <Space height="2rem" />

        <div className="cancel-button-holder">
          <Button secondary onClick={hideDialog}>
            Cancel
          </Button>
        </div>
      </PayInvoiceDialogContainer>
    </ModalWrapper>
  );
};

export default PayInvoiceDialog;
