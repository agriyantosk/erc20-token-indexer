import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const Card = ({ account }: any) => {
    const [tokenDatas, setTokenDatas] = useState<any>([]);
    const [tokenResult, setTokenResult] = useState<any>([]);

    async function getTokenBalances() {
        const config = {
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            network: Network.ETH_MAINNET,
        };

        const alchemy = new Alchemy(config);
        const data = await alchemy.core.getTokenBalances(account.address);

        setTokenDatas(data.tokenBalances);

        for (let j = 0; j < tokenDatas.length; j++) {
            const tokenData = await alchemy.core.getTokenMetadata(
                data.tokenBalances[j].contractAddress
            );
            tokenDatas[j].tokenMetaData = tokenData;
        }
        setTokenResult(tokenDatas);
    }

    useEffect(() => {
        getTokenBalances();
    }, []);
    if (!tokenDatas) {
        return <></>;
    } else {
        return (
            <>
                <div className="flex flex-wrap justify-center gap-10">
                    {tokenResult ? (
                        tokenResult.map((el: any, index: number) => (
                            <div
                                key={index}
                                className="flex border-black border-2 flex-col justify-between rounded-2xl overflow-hidden"
                            >
                                <div>
                                    <img
                                        src={
                                            el.tokenMetaData?.logo
                                                ? el.tokenMetaData?.logo
                                                : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
                                        }
                                        alt="No image available"
                                        className="object-contain w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 p-3">
                                    <div className="flex gap-3">
                                        <h1>{el.tokenMetaData?.name}</h1>
                                        <h1>${el.tokenMetaData?.symbol}</h1>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1>Token Contract Address:</h1>
                                        <h1>{el.contractAddress}</h1>
                                    </div>
                                    <div className="flex gap-3">
                                        <h1>{el.tokenData?.symbol} Balance:</h1>
                                        <h1>
                                            {parseInt(el.tokenBalance, 16) /
                                                1e18}{" "}
                                            ETH
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>You haven't acquired any ERC20 tokens yet</h1>
                    )}
                </div>
            </>
        );
    }
};

export default Card;
