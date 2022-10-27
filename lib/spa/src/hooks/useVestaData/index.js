import { useCallback, useEffect, useState } from "react";
import useVesta from "../useVesta";


const getVestaData = async ({ vestas, tokenId}) => {
    const [tokenURI, dna, owner, houseDNA] = await Promise.all([
        vestas.methods.tokenURI(tokenId).call(),
        vestas.methods.tokenDNA(tokenId).call(),
        vestas.methods.ownerOf(tokenId).call(),
        vestas.methods.get_house_info().call(),
    ]);

    const respondeMetadata = await fetch(tokenURI);
    const metadata = await respondeMetadata.json();

    return {
        tokenId,
        attributes: {
            houseDNA,
        },
        tokenURI,
        dna,
        owner,
        ...metadata
    }
}

// Todos
const useVestasData = () => {
    const [_vestas, setVestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const vesta = useVesta();

    const update = useCallback( async () => {
        if(vesta) {
            setLoading(true);

            let tokenIds;
            tokenIds = new Array(10).fill().map((_, index) => index);

            const vestaPromise = tokenIds.map((tokenId) => 
                getVestaData({ tokenId, vesta })
            );

            const _vestas = await Promise.all(vestaPromise);
            
            setVestas(_vestas);
            setLoading(false);
        }
    }, [vesta]);

    useEffect(() => {
        update();
    }, [update])

    return {
        loading,
        _vestas,
        update,
    }
}

// Singular
// const useVestaData = () => {

// }


export { useVestasData };