import { useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { Web3Provider } from '@ethersproject/providers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ErrorMsg = () => {

    const context = useWeb3React<Web3Provider>();
    const { error } = context;

    useEffect(() => {
        if (error) {
            toast.error(getErrorMessage(error))
        }
    }, [error])

    function getErrorMessage(error: Error) {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        }
        if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
            return "Please authorize this website to access your wallet account.";
        }
        if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network."
        }
        return "An unknown error occurred. Check the console for more details.";
    }

    return (
        <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}