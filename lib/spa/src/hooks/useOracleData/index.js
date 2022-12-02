import useOracle from "../useOracle";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";


const getOracleData = async ({ oracle }) => {
    const price = await Promise.all([
        oracle.methods.getLatestPrice().call(),
    ]);

    return {
        price
    }
}

const useOracleData = async () => {
    const [priceOracle, setOracle] = useState({});
    const oracle = useOracle();

    // const update = useCallback(async () => {
    //     if (oracle) {
    //         const toSet = await getOracleData({ oracle });

    //         console.log("AVRE", toSet.price[0])
    //         setOracle(toSet);
    //     }
    // }, [oracle])

    // useEffect(() => {
    //     console.log("JOLA1", priceOracle)
    //     update();
    //     console.log("JOLA", priceOracle)
    // }, [update])


    // const update = useCallback(async () => {
    //     if (oracle) {
    //         const toSet = await getOracleData({ oracle });

    //         console.log("AVRE", toSet.price[0])
    //         setOracle(toSet);
    //     }
    // }, [oracle])

    if (oracle) {
        const toSet = await getOracleData({ oracle });
        setOracle(toSet.price[0]);
    }

    return {
        priceOracle,
    }
}

export { useOracleData };
