import styled from 'styled-components';
import { HEADER_HEIGHT } from 'components/shared/AppBody/styles';

export const OutgoingInvoicesViewContainer = styled.div`
  padding: 1rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  
  .button-holder {
    display: flex;
    justify-content: flex-end;
  }
`;
