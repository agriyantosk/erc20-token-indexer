import { Inter } from "next/font/google";
import Card from "@/components/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <div className="w-screen flex flex-col items-center gap-10 p-5">
                <div>
                    <h1 className="text-4xl font-bold">ERC 20 TOKEN INDEXER</h1>
                </div>
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        // Note: If your app doesn't use authentication, you
                        // can remove all 'authenticationStatus' checks
                        const ready =
                            mounted && authenticationStatus !== "loading";
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                                authenticationStatus === "authenticated");

                        return (
                            <div
                                {...(!ready && {
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0,
                                        pointerEvents: "none",
                                        userSelect: "none",
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button
                                                className="bg-blue-500 px-5 py-2 hover:bg-blue-400 rounded-lg text-white"
                                                onClick={openConnectModal}
                                                type="button"
                                            >
                                                Connect Wallet
                                            </button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button
                                                onClick={openChainModal}
                                                type="button"
                                            >
                                                Wrong network
                                            </button>
                                        );
                                    }

                                    return (
                                        <>
                                            <div className="flex flex-col items-center gap-3">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 12,
                                                    }}
                                                >
                                                    <button
                                                        onClick={openChainModal}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                        type="button"
                                                    >
                                                        {chain.hasIcon && (
                                                            <div
                                                                style={{
                                                                    background:
                                                                        chain.iconBackground,
                                                                    width: 12,
                                                                    height: 12,
                                                                    borderRadius: 999,
                                                                    overflow:
                                                                        "hidden",
                                                                    marginRight: 4,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={
                                                                            chain.name ??
                                                                            "Chain icon"
                                                                        }
                                                                        src={
                                                                            chain.iconUrl
                                                                        }
                                                                        style={{
                                                                            width: 12,
                                                                            height: 12,
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {chain.name}
                                                    </button>

                                                    <button
                                                        onClick={
                                                            openAccountModal
                                                        }
                                                        type="button"
                                                    >
                                                        {account.displayName}
                                                        {account.displayBalance
                                                            ? ` (${account.displayBalance})`
                                                            : ""}
                                                    </button>
                                                </div>
                                                <div>
                                                    <h1 className="text-xl">
                                                        Connected Wallet
                                                        Address:{" "}
                                                        {account.address}
                                                    </h1>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <Card account={account} />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>
        </>
    );
}
