import React, { useEffect } from 'react';
import { appStore } from 'store/app.store';
import { FunctionalComponent } from 'types/FunctionalComponent';
import Loader from 'components/ui-elements/Loader';
import * as authController from 'controller/auth.controller';
import { observer } from 'mobx-react';
import { LoggedUserWrapperContainer } from 'components/shared/LoggedUserWrapper/styles';
import { isEmpty } from 'lodash';

const LoggedUserWrapper: FunctionalComponent = ({ children }) => {
  useEffect(() => {
    authController.authenticateUser();
  }, []);

  if (isEmpty(appStore.authenticatedUser)) {
    return (
      <LoggedUserWrapperContainer>
        <Loader />
      </LoggedUserWrapperContainer>
    );
  }

  return <div>{children}</div>;
};

export default observer(LoggedUserWrapper);
