import styled from 'styled-components';

export const PayableViewContainer = styled.div`
  padding: 1rem;

  .payables-table {
    input[type='text'] {
      border-radius: 8px;
    }

    .rc-table-header {
      background: #494b54;

      .rc-table-cell {
        color: #fff;
      }
    }

    .css-monite-11b0q3cr-control {
      border-radius: 8px;
    }

    .css-monite-16r6rxb {
      color: #fff;

      table {
        color: #fff;

        .rc-table-row {
          &:hover {
            background: #353943;
          }

          .rc-table-cell {
            color: #fff;
          }
        }
      }
    }
  }
`;

export const FileInput = styled.input`
  display: none;
`;
