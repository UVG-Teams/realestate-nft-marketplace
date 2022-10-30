import { useMemo } from "react";

const useTruncatedAddress = account => {

    const truncated = useMemo(
        () => `${ account?.substr(0, 6) }...${ account?.substr(-4) }`,
        [account]
    );

    if (account === undefined) {
        return "";
    }

    return truncated;
};

export default useTruncatedAddress;
