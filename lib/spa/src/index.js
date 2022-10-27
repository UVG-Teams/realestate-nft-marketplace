import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { getLibrary } from './config/web3';

import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>
);

