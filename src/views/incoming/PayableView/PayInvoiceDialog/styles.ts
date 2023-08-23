import styled from 'styled-components';

export const PayInvoiceDialogContainer = styled.div`
  padding: 1rem;

  .invoice-details {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 0.5rem 0;

    .label {
      text-transform: uppercase;
      font-size: 0.85rem;
      color: #ffffff9c;
      width: 6rem;
    }

    .value {
      font-size: 1rem;
      color: #fff;
    }
  }

  .amount {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .label {
      text-transform: uppercase;
      font-size: 1rem;
    }

    .value {
      color: #ff9800;
    }
  }

  .pay-button-holder {
    display: flex;
    align-items: center;
    justify-content: center;

    .pay-button {
      padding: 1rem 3rem;
      border: none;
      border-radius: 8px;
      background: #2196f3;
      color: #fff;
      text-transform: uppercase;
      display: flex;
      align-items: center;

      .icon {
        margin-top: -0.1rem;
      }
    }
  }

  .cancel-button-holder {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
