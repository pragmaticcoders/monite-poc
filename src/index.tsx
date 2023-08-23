import React from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from 'assets/styles/global-styles';
import AppRouter from 'components/shared/AppRouter';
import { ToastContainer } from 'react-toastify';
import { injectStores } from '@mobx-devtools/tools';
import { appStore } from 'store/app.store';

const root = createRoot(document.getElementById('root'));

injectStores({ appStore });

root.render(
  <>
    <GlobalStyles />

    <AppRouter />

    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);
