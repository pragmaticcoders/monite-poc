import React, { FC, useMemo } from 'react';
import { BankAccountsViewContainer } from './styles';
import DataTable from 'components/shared/DataTable';
import { useSimpleDataFetcher } from 'hooks/useSimpleDataFetcher';
import BankAccountsService from 'service/bank-accounts.service';
import { observer } from 'mobx-react';
import { map } from 'lodash';
import { toCols } from 'components/shared/DataTable/utils';

const cols = toCols(['id', 'bankName', 'country', 'currency', 'iban', 'default']);

const BankAccountsView: FC = () => {
  const { data, isLoading } = useSimpleDataFetcher(
    'bank-accounts',
    BankAccountsService.getBankAccounts
  );

  const tableData = useMemo(
    () =>
      map(data?.data, bankAccount => {
        return {
          id: bankAccount.id,
          bankName: bankAccount.bank_name,
          country: bankAccount.country,
          currency: bankAccount.currency,
          iban: bankAccount.iban,
          default: bankAccount.default,
        };
      }),
    [data]
  );

  return (
    <BankAccountsViewContainer>
      <h2>Bank accounts</h2>

      <DataTable columns={cols} isLoading={isLoading} data={tableData} />
    </BankAccountsViewContainer>
  );
};

export default observer(BankAccountsView);
