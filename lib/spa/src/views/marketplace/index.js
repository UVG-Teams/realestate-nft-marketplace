import { useWeb3React } from '@web3-react/core';

import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useVestasData } from '../../hooks/useVestaData';

const Vesta = () => {
    const { active } = useWeb3React();
    const { _vesta, loading } = useVestasData();

    if (!active) return <RequestAccess />;

    return(
        <>
        {
            loading ?
            <Loading/> : 
            <p>Gallery</p>
        }
        </>
    )
}

export default Vesta;