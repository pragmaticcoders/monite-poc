import React, { FC, useMemo } from 'react';
import { UsersViewContainer } from './styles';
import { toCols } from 'components/shared/DataTable/utils';
import { useSimpleDataFetcher } from 'hooks/useSimpleDataFetcher';
import UsersService from 'service/users.service';
import DataTable from 'components/shared/DataTable';
import { observer } from "mobx-react";

const cols = toCols(['email', 'name', 'status', 'id', 'role']);

const UsersView: FC = () => {
  const { data, isLoading } = useSimpleDataFetcher('users', UsersService.getEntityUsers);

  const tableData = useMemo(() => {
    return data?.data.map(user => ({
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      status: user.status,
      id: user.id,
      role: user.role.name,
    }));
  }, [data]);

  return (
    <UsersViewContainer>
      <h2>Users</h2>

      <DataTable columns={cols} isLoading={isLoading} data={tableData} />
    </UsersViewContainer>
  );
};

export default observer(UsersView);
