import React, { useState } from 'react';
import { OutgoingInvoicesViewContainer } from './styles';
import { CreateInvoice, RECEIVABLE_TYPES } from '@team-monite/ui-widgets-react';
import Button from 'components/ui-elements/Button';

const OutgoingInvoicesView = () => {
  const [isCreateInvoiceDialogOpen, setIsCreateInvoiceDialogOpen] = useState(false);

  const onCreateInvoiceClick = () => {
    setIsCreateInvoiceDialogOpen(true);
  };

  return (
    <OutgoingInvoicesViewContainer>
      <div className="button-holder">
        <Button onClick={onCreateInvoiceClick}>Create invoice</Button>
      </div>

      <h2>Invoices</h2>

      {isCreateInvoiceDialogOpen && (
        <CreateInvoice
          onClose={() => setIsCreateInvoiceDialogOpen(false)}
          type={RECEIVABLE_TYPES.INVOICE}
        />
      )}
    </OutgoingInvoicesViewContainer>
  );
};

export default OutgoingInvoicesView;
