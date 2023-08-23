import styled from 'styled-components';

export const WarningDialogContainer = styled.div`
  .error-title {
    color: #fff;
    font-weight: 400;
    font-size: 1.9rem;
  }
`;

export const YellowBanner = styled.div`
  padding: 2rem 0;
  text-align: center;
  background: #ffc774;
  color: #7b7b7b;

  .icon {
    color: #bd7101;
  }
`;

export const MessageContainer = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  background: #fff;
  
  .error-message {
    font-size: 1rem;
  }
  
  .trace-id {
    color: #b9b9b9;
    font-family: monospace;
  }
`;
