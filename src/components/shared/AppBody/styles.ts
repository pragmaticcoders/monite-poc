import styled from 'styled-components';

export const SIDE_NAV_WIDTH = '14.3rem';
export const HEADER_HEIGHT = '4rem';

export const AppBodyContainer = styled.div`
  padding: ${HEADER_HEIGHT} 0 0 ${SIDE_NAV_WIDTH};
  min-height: 100vh;
  position: relative;

  .logo-holder {
    position: fixed;
    top: 0;
    left: 0;
    width: ${SIDE_NAV_WIDTH};
    height: ${HEADER_HEIGHT};
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6a821;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.7rem;
  }

  .navigation-header {
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT};
    position: fixed;
    top: 0;
    left: ${SIDE_NAV_WIDTH};
    width: calc(100vw - ${SIDE_NAV_WIDTH});
    justify-content: center;
    padding: 0 1rem;
    background: #2a2d35;

    .main-link {
      text-transform: uppercase;
      color: #848c94;
      font-weight: 500;
      padding: 1rem 1.5rem;

      &.active {
        color: #f6a821;
      }
    }

    .logout-button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .user-info {
      position: absolute;
      right: 5rem;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      gap: 1rem;

      .user-type {
        color: #fff;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 500;
        background: #df8500;
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
      }
      
      .user-email {
        color: #fff;
        font-size: 0.8rem;
      }
    }
  }

  .side-nav {
    position: fixed;
    top: ${HEADER_HEIGHT};
    left: 0;
    width: ${SIDE_NAV_WIDTH};
    height: calc(100vh - ${HEADER_HEIGHT});
    background: #2a2d35;
  }
`;
