import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import { injected, walletconnect } from '../dapp/connectors';

const sliceAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
}

export const ConnectWalletButton = () => {
    const context = useWeb3React<Web3Provider>();
    const { connector, account, activate, deactivate, active } = context;

    const [activatingConnector, setActivatingConnector] = useState<any>();
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
    const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;

    const isActivating = activating(injected) || activating(walletconnect)
    const isConnected = (connected(injected) || connected(walletconnect)) && active

    const disconnect = () => {
        if (connected(walletconnect)) {
            (connector as any).close();
        }
        deactivate()
    }

    if (isActivating) {
        return (
            <div className="btn">
                Connecting...
            </div>
        )
    } else if (isConnected) {
        return (
            <div className="btn">
                {sliceAddress(account || "")}
                <button onClick={disconnect}>
                    Disconnect
                </button>
            </div>
        )
    } else {
        return (
            <>
                <label htmlFor="wallet-list-modal" className="btn">
                    Connect Wallet
                </label>
                <input type="checkbox" id="wallet-list-modal" className="modal-toggle" />
                <label htmlFor="wallet-list-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-lg font-bold text-center">Connect Wallet</h3>
                        <div className="flex flex-col">
                            <button className="btn btn-outline m-2" onClick={() => {
                                setActivatingConnector(injected);
                                activate(injected);
                            }}>
                                <img
                                    className="h-8"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20220831120339"
                                    alt="metamask"
                                />
                                <span>Metamask</span>
                            </button>
                            <button className="btn btn-outline m-2" onClick={() => {
                                setActivatingConnector(walletconnect);
                                activate(walletconnect);
                            }}>
                                <img
                                    className="h-5"
                                    src="https://docs.walletconnect.com/img/walletconnect-logo.svg"
                                    alt="wallet connect"
                                />
                                <span>Wallet Connect</span></button>
                        </div>
                    </label>
                </label>
            </>
        )
    }
}