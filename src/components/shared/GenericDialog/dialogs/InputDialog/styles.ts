import styled from 'styled-components';

export const InputDialogContainer = styled.div`
  background: #373A43;
  overflow-x: hidden;
  margin: 0 auto;

  .heading {
    background: #31333a;
    padding: 1rem;
    font-size: 1.5rem;
  }

  .body {
    padding: 1rem;

    .message-holder {
      font-size: 1rem;
    }
    
    .input {
      background: #494B54;
      border: none;
      border-radius: 2px;
      padding: 0.5rem;
      color: #fff;
      outline: none;
    }

    .buttons-holder {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      gap: 1rem;
    }
  }
`;
