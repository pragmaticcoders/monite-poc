import React, { FC, PropsWithChildren } from 'react';
import { AppBodyContainer } from './styles';
import * as authController from 'controller/auth.controller';
import SideNavigation from 'components/shared/SideNavigation';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MoniteProvider } from '@team-monite/ui-widgets-react';
import { appStore } from 'store/app.store';

const theme = {
  card: {
    fontSize: '18px',
    backgroundColor: '#99a3dd',
    borderColor: '#99a3dd',
  },
  tableBody: {
    color: '#fff',
  },
  button: {
    primaryColor: '#0f2ac4',
    borderRadius: '1rem',
  },
};

const AppBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MoniteProvider monite={appStore.moniteClient} theme={theme}>
      <AppBodyContainer>
        <div className="logo-holder">ADMIN</div>

        <div className="navigation-header">
          <NavLink to="/app/incoming" className="main-link" activeClassName="active">
            incoming
          </NavLink>
          <NavLink to="/app/outgoing" className="main-link" activeClassName="active">
            outgoing
          </NavLink>

          <div className="user-info">
            <div className="user-email">{appStore.authenticatedUser?.email}</div>
            <div className="user-type">{appStore.authenticatedUser?.type}</div>
          </div>

          <button className="logout-button" onClick={() => authController.logOutUser()}>
            logout
          </button>
        </div>

        <div className="side-nav">
          <SideNavigation />
        </div>

        <div className="body-holder">{children}</div>
      </AppBodyContainer>
    </MoniteProvider>
  );
};

export default observer(AppBody);
