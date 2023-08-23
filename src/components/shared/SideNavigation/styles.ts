import styled from 'styled-components';

export const SideNavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  .side-nav-link {
    padding: 1rem 1rem;
    color: #848c94;
    font-weight: 500;
    text-transform: uppercase;
    border-left: 3px solid transparent;

    &.active {
      color: #fff;
      border-left: 3px solid #f6a821;
      background: #f6a8210f;
    }
  }
`;
