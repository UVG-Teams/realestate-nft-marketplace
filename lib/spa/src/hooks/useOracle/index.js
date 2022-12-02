import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import OracleArtifact from '../../config/web3/artifacts/Oracle';

const { address, abi } = OracleArtifact;

const useOracle = () => {
    const { active, library, chainId } = useWeb3React();

    const oracle = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId])
    }, [active, chainId, library?.eth?.Contract])

    return oracle;
}

export default useOracle;
