import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    background-color: #33363F;
    font-size: 14px;
    color: #fff;
  }
  
  div {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  .modal-component-overlay {
    background: rgba(0, 0, 0, .32);
    animation-name: fadeIn;
    animation-duration: .3s;
    animation-fill-mode: both;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  
  .container-fluid {
    &.no-padding {
      padding-left: 0;
      padding-right: 0;
    }
  } 

  @media print {    
    body {
      background-color: #fff;
    }
  }
`;
