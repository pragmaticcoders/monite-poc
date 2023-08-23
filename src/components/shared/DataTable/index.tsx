import { DataTableContainer } from './styles';
import React, { FC, useMemo } from 'react';
import { isEmpty, isUndefined, map, sortBy } from 'lodash';
import humanizeString from 'humanize-string';
import Loader from 'components/ui-elements/Loader';
import noop from 'lodash/noop';

interface TableRow {
  [key: string]: any;
}

interface DataTableProps {
  columns: Array<{
    label?: string;
    name: string;
  }>;
  data?: Array<TableRow>;
  className?: string;
  onRowClick?: (row: any, rowIndex: number) => void;
  isLoading?: boolean;
  sortIndex?: string;
}

const DataTable: FC<DataTableProps> = ({
  columns,
  data,
  isLoading,
  className,
  onRowClick = noop,
  sortIndex,
}) => {
  const dataMapped = useMemo(() => {
    if (sortIndex) {
      const sortedData = sortBy(data, sortIndex);

      return sortedData;
    }

    return data;
  }, [data]);
  return (
    <DataTableContainer className={className}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label ? column.label : humanizeString(column.name)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6} className="loader-col">
                <Loader />
              </td>
            </tr>
          )}

          {!isLoading &&
            map(dataMapped, (tableRow, rowIndex: number) => (
              <tr key={`row-${rowIndex}`} onClick={() => onRowClick(tableRow, rowIndex)}>
                {map(tableRow, (value, key) => (
                  <td key={`cell-${key}`}>{!isUndefined(value) ? value : '-'}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {isEmpty(dataMapped) && !isLoading && <div className="no-data">No data</div>}
    </DataTableContainer>
  );
};

export default DataTable;
