const Card = ({ tokenDatas }: any) => {
    if (!tokenDatas) {
        return <></>;
    } else {
        return (
            <>
                <div className="flex flex-wrap justify-center gap-10">
                    {tokenDatas &&
                        tokenDatas.map((el: any, index: number) => (
                            <div
                                key={index}
                                className="flex border-black border-2 flex-col rounded-2xl overflow-hidden"
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
                                                Math.pow(
                                                    10,
                                                    el.tokenData?.decimals
                                                )}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    ;
                </div>
            </>
        );
    }
};

export default Card;
