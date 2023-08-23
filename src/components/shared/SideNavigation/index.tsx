import React, { FC } from 'react';
import { SideNavigationContainer } from './styles';
import { NavLink, Route, Switch } from 'react-router-dom';

const SideNavigation: FC = () => {
  return (
    <SideNavigationContainer>
      <Switch>
        <Route path="/app/incoming">
          <NavLink to="/app/incoming/payable" className="side-nav-link" activeClassName="active">
            Payables
          </NavLink>

          <NavLink to="/app/incoming/counter-parts" className="side-nav-link" activeClassName="active">
            Counter parts
          </NavLink>

          <NavLink to="/app/incoming/bank-accounts" className="side-nav-link" activeClassName="active">
            Bank accounts
          </NavLink>

          <NavLink to="/app/incoming/entity-users" className="side-nav-link" activeClassName="active">
            Users
          </NavLink>
        </Route>

        <Route path="/app/outgoing">
          <NavLink to="/app/outgoing/invoices" className="side-nav-link" activeClassName="active">
            Invoices
          </NavLink>

          <NavLink to="/app/outgoing/recivables" className="side-nav-link" activeClassName="active">
            Recivables
          </NavLink>
        </Route>
      </Switch>
    </SideNavigationContainer>
  );
};

export default SideNavigation;
