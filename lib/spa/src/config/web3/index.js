import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector'

const connector = new InjectedConnector({ 
    supportedChainIds: [
        1, // Mainnet
        5 // Görli
    ]
})

const getLibrary = (provider) => {
    return new Web3(provider);
};

export { connector, getLibrary };