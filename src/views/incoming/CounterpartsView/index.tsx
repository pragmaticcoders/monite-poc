import React, { FC, useMemo, useState } from 'react';
import { CounterpartsViewContainer } from './styles';
import { toCols } from 'components/shared/DataTable/utils';
import { useSimpleDataFetcher } from 'hooks/useSimpleDataFetcher';
import CounterPartsService from 'service/counter-parts.service';
import DataTable from 'components/shared/DataTable';
import { observer } from 'mobx-react';
import Space from 'components/ui-elements/Space';
import Button from 'components/ui-elements/Button';
import { dialog } from 'components/shared/GenericDialog/dialog';
import FormDialog from 'components/dialog/FormDialog';
import { CounterpartDetails } from '@team-monite/ui-widgets-react';
import { CounterpartType } from '@team-monite/sdk-api';
import Badge from 'components/ui-elements/Badge';

const cols = toCols(['id', 'type', 'name', 'email']);

const CounterpartsView: FC = () => {
  const [currentCounterpartId, setCurrentCounterpartId] = useState<string | null>(null);
  const [isEmptyCounterpartVisible, setIsEmptyCounterpartVisible] =
    useState<CounterpartType | null>(null);

  const { data, isLoading, refetch } = useSimpleDataFetcher(
    'counterparts',
    CounterPartsService.getCounterParts
  );

  const onAddTaxClick = (counterpart: any) => {
    const addTaxFormSchema = [{ name: 'type' }, { name: 'value' }];

    const onSubmit = async (data: any, setSubmitting: any) => {
      setSubmitting(true);

      try {
        await CounterPartsService.addCounterPartTax(counterpart.id, data.type, data.value);
        refetch();
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    };

    dialog.genericDialog(
      <FormDialog schema={addTaxFormSchema} title="Add Tax" onSubmit={onSubmit} />
    );
  };

  const onAddAddressClick = (counterpart: any) => {
    const addAddressFormSchema = [
      { name: 'country' },
      { name: 'city' },
      { name: 'postal_code' },
      { name: 'state' },
      { name: 'line1' },
      { name: 'line2' },
    ];

    const onSubmit = async (data: any, setSubmitting: any) => {
      setSubmitting(true);

      try {
        await CounterPartsService.addCounterPartAddress(counterpart.id, data);
        refetch();
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
      }
    };

    dialog.genericDialog(
      <FormDialog schema={addAddressFormSchema} title="Add Tax" onSubmit={onSubmit} />
    );
  };

  const tableData = useMemo(() => {
    return data?.data?.map(counterpart => ({
      id: counterpart.id,
      type: (
        <Badge knownValues={{ [CounterpartType.ORGANIZATION]: '#795548' }}>
          {counterpart.type}
        </Badge>
      ),
      name:
        counterpart.type === CounterpartType.INDIVIDUAL
          ? `${counterpart.individual?.first_name} ${counterpart.individual?.last_name}`
          : counterpart.organization?.legal_name,
      email: counterpart.organization?.email,
      /*tax: (
        <>
          <Button small onClick={() => onAddTaxClick(counterpart)}>
            Add Tax
          </Button>
        </>
      ),
      address: (
        <>
          <Button small onClick={() => onAddAddressClick(counterpart)}>
            Add Address
          </Button>
        </>
      ),*/
    }));
  }, [data]);

  const onRowClick = (counterpart: any) => {
    setCurrentCounterpartId(counterpart.id);
  };

  return (
    <CounterpartsViewContainer>
      <h2>Counterparts</h2>

      <div className="add-buttons-holder">
        <Button onClick={() => setIsEmptyCounterpartVisible(CounterpartType.INDIVIDUAL)}>
          Add individual counterpart
        </Button>

        <Button onClick={() => setIsEmptyCounterpartVisible(CounterpartType.ORGANIZATION)}>
          Add organization counterpart
        </Button>
      </div>

      <Space height="1rem" />

      <DataTable columns={cols} isLoading={isLoading} data={tableData} onRowClick={onRowClick} />

      {currentCounterpartId && (
        <CounterpartDetails
          id={currentCounterpartId as string}
          onClose={() => {
            setCurrentCounterpartId(null);
            refetch();
          }}
        />
      )}

      {isEmptyCounterpartVisible && (
        <CounterpartDetails
          type={isEmptyCounterpartVisible}
          onClose={() => {
            setIsEmptyCounterpartVisible(null);
            refetch();
          }}
        />
      )}
    </CounterpartsViewContainer>
  );
};

export default observer(CounterpartsView);
