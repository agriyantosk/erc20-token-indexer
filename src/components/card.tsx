import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { GridLoader } from "react-spinners";

const Card = ({ account }: any) => {
    const [tokenResult, setTokenResult] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getTokenBalances() {
            try {
                const config = {
                    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_API_KEY,
                    network: Network.ETH_MAINNET,
                };

                const alchemy = new Alchemy(config);
                const data = await alchemy.core.getTokenBalances(account);

                const tokenDatas = await Promise.all(
                    data.tokenBalances.map(async (tokenBalance: any) => {
                        const tokenData = await alchemy.core.getTokenMetadata(
                            tokenBalance.contractAddress
                        );
                        return { ...tokenBalance, tokenMetaData: tokenData };
                    })
                );
                setTokenResult(tokenDatas);
            } catch (error) {
                console.error("Error fetching token balances:", error);
            } finally {
                setLoading(false);
            }
        }

        getTokenBalances();
    }, [account.address, tokenResult]);
    return (
        <>
            <div className="flex flex-wrap justify-center gap-10 h-full w-full">
                {loading ? (
                    <div className="h-full w-full flex flex-col gap-10 items-center justify-center pb-20">
                        <GridLoader />
                        <h1>
                            Please wait while we look for your available ERC20
                            tokens...
                        </h1>
                    </div>
                ) : tokenResult.length > 0 ? (
                    tokenResult.map((el: any, index: number) => (
                        <div
                            key={index}
                            className="flex border-black border-2 flex-col justify-evenly h-max rounded-2xl overflow-hidden"
                        >
                            <div>
                                <img
                                    src={
                                        el.tokenMetaData?.logo
                                            ? el.tokenMetaData?.logo
                                            : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
                                    }
                                    alt="No image available"
                                    className="object-cover w-full h-96"
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
                                        {parseInt(el.tokenBalance, 16) / 1e18}{" "}
                                        ETH
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>You haven&apos;t acquired any ERC20 tokens yet</h1>
                )}
            </div>
        </>
    );
};

export default Card;
