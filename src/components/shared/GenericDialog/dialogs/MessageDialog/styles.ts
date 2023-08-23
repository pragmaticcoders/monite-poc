import styled from 'styled-components';

export const InfoDialogDialogContainer = styled.div<{ type: string }>`
  padding: 1rem 3rem;
  text-align: center;
  background: #000000bf;
  box-shadow: 0 0 16px 0 rgb(0 0 0 / 50%);
  overflow-x: hidden;
  margin: 0 auto;

  .icon {
    margin: 1rem auto;
    font-size: 4rem;
    display: block;
    ${props => props.type === 'warning' && 'color: #ffc107;'}
    ${props => props.type === 'error' && 'color: red;'}
  }

  .message-holder {
    font-size: 1rem;
  }

  .heading {
    font-weight: 600;
    font-size: 1.4rem;
    color: #fff;
    margin: 1rem 0;
  }

  .buttons-holder {
    text-align: center;
    margin-top: 1rem;
  }

  .dialog-message {
    color: #fffc;
    font-size: 1rem;
  }
`;
