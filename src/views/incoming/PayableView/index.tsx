import React, { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { FileInput, PayableViewContainer } from './styles';
import { PayableDetails, usePayableUpload } from '@team-monite/ui-widgets-react';
import Button from 'components/ui-elements/Button';
import { toast, Toaster } from 'react-hot-toast';
import { useSimpleDataFetcher } from 'hooks/useSimpleDataFetcher';
import PayablesService from 'service/payables.service';
import DataTable from 'components/shared/DataTable';
import { toCols } from 'components/shared/DataTable/utils';
import Space from 'components/ui-elements/Space';
import { observer } from 'mobx-react';
import Badge from 'components/ui-elements/Badge';
import humanizeString from 'humanize-string';
import { dialog } from 'components/shared/GenericDialog/dialog';
import PayInvoiceDialog from 'views/incoming/PayableView/PayInvoiceDialog';

const cols = toCols(['id', 'amount', 'currency', 'status', 'dueDate', 'issued at']);

const PayableView: FC = () => {
  const inputFileRef = useRef(null);
  const [currentPayableId, setCurrentPayableId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useSimpleDataFetcher(
    'payables',
    PayablesService.getPayables
  );

  const onRowClick = (row: any) => {
    setCurrentPayableId(row.id);
  };

  const payableUploadFromFileMutation = usePayableUpload();

  const onUploadButtonClick = () => {
    inputFileRef.current.click();
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);

    if (file) {
      toast.promise(payableUploadFromFileMutation.mutateAsync(file), {
        loading: 'Uploading payable file',
        success: () => {
          refetch();
          return 'Payable uploaded successfully';
        },
        error: error => {
          console.error(error);
          return 'Error when uploading payable file';
        },
      });
    }
  };

  const tableData = useMemo(() => {
    return data?.data.map(payable => ({
      id: payable.id,
      amount: Number(payable.amount) / 100 + ' ' + payable.currency,
      currency: payable.currency,
      status: (
        <Badge knownValues={{ paid: '#6b9936', new: '#0993d1' }}>
          {humanizeString(payable.status)}
        </Badge>
      ),
      dueDate: payable.due_date,
      issuedAt: payable.issued_at,
    }));
  }, [data]);

  const onModalClose = () => {
    setCurrentPayableId(null);
    refetch();
  };

  const onPayClick = async (payableId: string) => {
    setCurrentPayableId(null);
    const payable = data?.data.find(payable => payable.id === payableId);

    if (!payable) {
      toast.error('Payable not found');
    }

    await dialog.genericDialog(<PayInvoiceDialog payable={payable} />);
    refetch();
  };

  return (
    <PayableViewContainer>
      <h2>Payables</h2>
      <div className="button-holder">
        <Button onClick={onUploadButtonClick}>Upload file</Button>
      </div>

      <Space height="1rem" />

      <div className="payables-table">
        <DataTable
          columns={cols}
          sortIndex="issuedAt"
          data={tableData}
          isLoading={isLoading}
          onRowClick={onRowClick}
        />
      </div>

      {currentPayableId && (
        <PayableDetails
          id={currentPayableId}
          onClose={onModalClose}
          onPay={() => onPayClick(currentPayableId)}
        />
      )}

      <FileInput
        ref={inputFileRef}
        type="file"
        accept="application/pdf"
        aria-label="Upload payable file"
        onChange={onFileInputChange}
      />

      <Toaster />
    </PayableViewContainer>
  );
};

export default observer(PayableView);
