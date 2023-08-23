import styled from 'styled-components';

export const DataTableContainer = styled.div`
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        background: #ffffff1c;

        th {
          padding: 1rem;
          font-size: 1rem;
          font-weight: 400;
          text-align: left;
          color: #fff;
        }
      }
    }

    tbody {
      tr {
        border-bottom: solid 1px #ffffff54;

        &:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        &:last-child {
          border-bottom: none;
        }

        td {
          padding: 1rem;
          font-size: 1rem;
          font-weight: 400;
          text-align: left;
          color: #fff;
          
          &.loader-col {
            display: table-cell;
            text-align: center;
          }
        }
      }
    }
  }
  
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff6b;
    text-transform:  uppercase;
    font-size: .9rem;
    padding: 1rem;
  }
`;
