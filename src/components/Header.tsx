import { ConnectWalletButton } from './ConnectWalletButton';
import { ErrorMsg } from './ErrorMsg';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { SwitchNetworkBtn } from './SwitchNetworkBtn';

export const Header = function () {

  const context = useWeb3React<Web3Provider>();
  const { error } = context;

  const [isSwitchNetwork, setSwitchNetwork] = useState(false)
  useEffect(() => {
    if (error && error instanceof UnsupportedChainIdError) {
      setSwitchNetwork(true)
    } else {
      setSwitchNetwork(false)
    }
  }, [error])

  return (
    <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box">
      <ErrorMsg />
      <div className="flex-1 px-2 mx-2">
        <img
          className="h-5"
          src="/logo.png"
          alt="logo"
        />
      </div>
      {isSwitchNetwork ?
        <div className="flex-none px-2 mx-2 lg:flex">
          <div className="flex items-stretch">
            <SwitchNetworkBtn />
          </div>
        </div> :
        <div className="flex-none px-2 mx-2 lg:flex">
          <div className="flex items-stretch">
            <ConnectWalletButton />
          </div>
        </div>
      }
    </div>
  );
};

export default Header;
