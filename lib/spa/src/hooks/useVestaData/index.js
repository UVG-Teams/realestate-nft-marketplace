import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useVesta from "../useVesta";


const getVestaData = async ({ vesta, tokenId }) => {
    const [tokenURI, owner, houseDNA] = await Promise.all([
        vesta.methods.tokenURI(tokenId).call(),
        // vesta.methods.tokenDNA(tokenId).call(),
        vesta.methods.ownerOf(tokenId).call(),
        // vesta.methods.get_house_info().call(),
    ]);

    const respondeMetadata = await fetch(tokenURI);
    const metadata = await respondeMetadata.json();

    return {
        tokenId,
        // attributes: {
        //     houseDNA,
        // },
        tokenURI,
        owner,
        ...metadata
    }
}

// Todos
const useVestasData = ({ owner = null } = {}) => {
    const [allVestas, setVestas] = useState([]);
    const { library } = useWeb3React();
    const [loading, setLoading] = useState(true);
    const vesta = useVesta();

    const update = useCallback(async () => {
        if (vesta) {
            setLoading(true);

            let tokenIds;

            if (!library.utils.isAddress(owner)) {
                const totalSupply = await vesta.methods.totalSupply().call();
                tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);

            } else {
                const balanceOf = await vesta.methods.balanceOf(owner).call();

                const tokenIdsOfOwner = new Array(Number(balanceOf)).fill().map((_, index) =>
                    vesta.methods.tokenOfOwnerByIndex(owner, index).call()
                );

                tokenIds = await Promise.all(tokenIdsOfOwner);
            }
            


            const vestaPromise = tokenIds.map(tokenId =>
                getVestaData({ tokenId, vesta })
            );

            const go = await Promise.all(vestaPromise);

            setVestas(go);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [vesta, owner, library?.utils]);

    useEffect(() => {
        update();
    }, [update])

    return {
        loading,
        allVestas,
        update,
    }
}

// Singular
const useVestaData = (tokenId = null) => {
    const [singleVesta, setVesta] = useState({});
    const [loading, setLoading] = useState(true);
    const vesta = useVesta();

    const update = useCallback(async () => {
        if (vesta && tokenId != null) {
            setLoading(true);

            const toSet = await getVestaData({ tokenId, vesta })
            setVesta(toSet);

            setLoading(false);
        }
    }, [vesta, tokenId])

    useEffect(() => {
        update();
    }, [update])

    return {
        loading,
        singleVesta,
        update,
    }

}


export { useVestasData, useVestaData };
