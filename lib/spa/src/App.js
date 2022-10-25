import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Web3 from 'web3';

function App() {
  useEffect(() => {
    if(window.ethereum) {
      // window.ethereum.request({
      //   method: 'eth_requestAccounts'
      // }).then(accounts => console.log(accounts))
      const web3 = new Web3(window.ethereum);
      web3.eth.requestAccounts().then(console.log)
    }
  }, [])
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  ); 
}

export default App;
