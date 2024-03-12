import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "@/components/card";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // const [token, setToken] = useState<any>(true);

    return (
        <>
            <div className="w-screen flex flex-col items-center gap-10 p-10">
                <div>
                    <h1 className="text-4xl font-bold">ERC 20 TOKEN INDEXER</h1>
                </div>
                <div>
                    <h1 className="text-xl">
                        {/* Connected Wallet Address: {walletAddress} */}
                    </h1>
                </div>
                {/* <div className="flex justify-center items-center">
                    {token ? (
                        <Card tokenDatas={tokenDatas} />
                    ) : (
                        <h1>You haven't acquire any ERC20 token yet</h1>
                    )}
                </div> */}
            </div>
        </>
    );
}
