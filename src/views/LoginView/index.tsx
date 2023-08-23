import React, { FC, useState } from 'react';
import { LoginViewContainer } from './styles';
import Space from 'components/ui-elements/Space';
import humanizeString from 'humanize-string';
import * as authController from 'controller/auth.controller';
import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { appStore } from 'store/app.store';

const LoginView: FC = () => {
  const [authError, setAuthError] = useState<string>(null);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: values => {
      const { login, password } = values;

      authController.logIn(login, password, setAuthError);
    },
    validationSchema: Yup.object({
      login: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });

  return (
    <LoginViewContainer>
      <div className="login-view-container-holder">
        <div className="login-header">
          <h1>Login</h1>
          <a>Please enter your credentials to login.</a>
        </div>

        <div className="login-form-holder">
          <div className="form-label">Username</div>
          <Input
            className="form-input"
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            placeholder="username"
            error={formik.touched.login && !!formik.errors.login}
          />

          <div className="form-label">Password</div>

          <Input
            className="form-input"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="password"
            type="password"
            error={formik.touched.password && !!formik.errors.password}
            onEnter={formik.handleSubmit}
          />

          {authError && <div className="auth-error">{humanizeString(authError)}</div>}

          <Space height="2rem" />

          <div className="login-button">
            <Button onClick={formik.handleSubmit} isLoading={appStore.isAuthorizationPending}>
              LOG IN
            </Button>
          </div>
        </div>
      </div>
    </LoginViewContainer>
  );
};

export default observer(LoginView);
