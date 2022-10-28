import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import VestaArtifact from '../../config/web3/artifacts/vesta';

const { address, abi } = VestaArtifact;

const useVesta = () => {
    const { active, library, chainId } = useWeb3React();

    const vesta = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId])
    }, [active, chainId, library?.eth?.Contract])

    return vesta;
}

export default useVesta;