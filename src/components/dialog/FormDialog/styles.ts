import styled from 'styled-components';

export const FormDialogContainer = styled.div`
  padding: 1rem;

  .form-holder {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      
      .label {
        font-size: 0.85rem;
        color: #fff;
        font-weight: 400;
        text-transform: uppercase;
      }
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
`;
