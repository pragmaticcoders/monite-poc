import styled from 'styled-components';

export const LoginViewContainer = styled.div`
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-header {
    margin-bottom: 2rem;
    display: inline-block;
  }

  h1 {
    font-size: 1.7rem;
    margin-bottom: 0.2rem;
  }

  .subtitle {
    color: #949ba2;
  }

  .login-form-holder {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
    padding: 1rem;
    background: #393c45;
    border-radius: 2px;
  }
  .form-label {
    color: #fff;
  }

  .auth-error {
    color: #de7272;
    text-transform: uppercase;
  }
`;
