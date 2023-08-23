import React, { FC } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import LoginView from 'views/LoginView';
import ErrorBoundary from 'components/shared/ErrorBoundary';
import LoggedUserWrapper from 'components/shared/LoggedUserWrapper';
import AppBody from 'components/shared/AppBody';
import OutgoingInvoicesView from 'views/outgoing/OutgoingInvoicesView';
import { history } from 'utils/history.util';
import PayableView from 'views/incoming/PayableView';
import CounterpartsView from 'views/incoming/CounterpartsView';
import GenericDialog from 'components/shared/GenericDialog';
import BankAccountsView from 'views/incoming/BankAccountsView';
import UsersView from 'views/incoming/UsersView';
import RecivablesView from "views/outgoing/RecivablesView";

const AppRouter: FC = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/app" />
      <Route exact path="/login" component={LoginView} />

      <Route path="/app">
        <ErrorBoundary>
          <LoggedUserWrapper>
            <AppBody>
              <Switch>
                <Redirect exact from="/app" to="/app/incoming" />

                {/*store*/}
                <Redirect exact from="/app/incoming" to="/app/incoming/payable" />

                <Route path="/app/incoming/payable" component={PayableView} />
                <Route path="/app/incoming/counter-parts" component={CounterpartsView} />
                <Route path="/app/incoming/bank-accounts" component={BankAccountsView} />
                <Route path="/app/incoming/entity-users" component={UsersView} />

                {/*magazine*/}
                <Redirect exact from="/app/outgoing" to="/app/outgoing/invoices" />

                <Route path="/app/outgoing/invoices" component={OutgoingInvoicesView} />
                <Route path="/app/outgoing/recivables" component={RecivablesView} />
              </Switch>
            </AppBody>

            <GenericDialog />
          </LoggedUserWrapper>
        </ErrorBoundary>
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
