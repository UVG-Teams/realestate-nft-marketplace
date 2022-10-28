import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import MainLayout from './layouts/main';
import Home from './views/home';
import Marketplace from './views/marketplace';
import Vesta from './views/vesta';

function App() {
    // useEffect(() => {
    //   if(window.ethereum) {
    //     // window.ethereum.request({
    //     //   method: 'eth_requestAccounts'
    //     // }).then(accounts => console.log(accounts))
    //     const web3 = new Web3(window.ethereum);
    //     web3.eth.requestAccounts().then(console.log)
    //   }
    // }, [])
    return (
        <MainLayout>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/marketplace" element={ <Marketplace /> } />
                <Route exact path="/marketplace/:tokenId" element={ <Vesta /> } />
            </Routes>
        </MainLayout>
    );
}

export default App;
