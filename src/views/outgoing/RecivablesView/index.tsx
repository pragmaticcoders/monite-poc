import React, { FC, useMemo, useState } from 'react';
import { RecivablesViewContainer } from './styles';
import { InvoiceDetails } from '@team-monite/ui-widgets-react';
import { useSimpleDataFetcher } from 'hooks/useSimpleDataFetcher';
import DataTable from 'components/shared/DataTable';
import { toCols } from 'components/shared/DataTable/utils';
import { observer } from 'mobx-react';
import InvoicesService from 'service/invoices.service';

const cols = toCols(['id', 'amount', 'currency', 'status', 'dueDate', 'issued at']);

const RecivablesView: FC = () => {
  const [currentRecivableId, setCurrentRecivableId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useSimpleDataFetcher('invoices', InvoicesService.getInvoices);

  const onRowClick = (row: any) => {
    setCurrentRecivableId(row.id);
  };

  const tableData = useMemo(() => {
    return data?.data.map(recivable => ({
      id: recivable.id,
      // amount: Number(payable.amount) / 100 + ' ' + payable.currency,
      // currency: payable.currency,
      // status: <Badge>{humanizeString(payable.status)}</Badge>,
      // dueDate: payable.due_date,
      // issuedAt: payable.issued_at,
    }));
  }, [data]);

  const onModalClose = () => {
    setCurrentRecivableId(null);
    refetch();
  }

  return (
    <RecivablesViewContainer>
      <h2>Recivables</h2>

      <div className="payables-table">
        <DataTable columns={cols} data={tableData} isLoading={isLoading} onRowClick={onRowClick} />
      </div>

      {currentRecivableId && (
        <InvoiceDetails id={currentRecivableId} onClose={onModalClose} />
      )}
    </RecivablesViewContainer>
  );
};

export default observer(RecivablesView);
