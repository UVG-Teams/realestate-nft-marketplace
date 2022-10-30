import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { configureStore } from './store';
import { getLibrary } from './config/web3';

import Home from './views/home';
import Vesta from './views/vesta';
import Profile from './views/profile';
import MainLayout from './layouts/main';
import Marketplace from './views/marketplace';

const root = ReactDOM.createRoot(document.getElementById('root'));

const { store } = configureStore();

root.render(
    <React.StrictMode>
        <HashRouter>
            <ChakraProvider>
                <Web3ReactProvider getLibrary={ getLibrary }>
                    <Provider store={ store }>
                        <MainLayout>
                            <Routes>
                                <Route exact path="/" element={ <Home /> } />
                                <Route exact path="/marketplace" element={ <Marketplace /> } />
                                <Route exact path="/marketplace/:tokenId" element={ <Vesta /> } />
                                <Route exact path="/profile" element={ <Profile /> } />
                            </Routes>
                        </MainLayout>
                    </Provider>
                </Web3ReactProvider>
            </ChakraProvider>
        </HashRouter>
    </React.StrictMode>
);
