import { useCallback } from 'react'
import { UserRejectedRequestError, useSwitchNetwork as useSwitchNetworkWallet } from 'wagmi'
import logger from '../logger'

export const useSwitchNetwork = () => {
    const { switchNetworkAsync, error, status } = useSwitchNetworkWallet()
    const switchNetwork = useCallback(
        (chainId: number) =>{
            console.log(chainId, switchNetworkAsync)
            if (typeof switchNetworkAsync === 'function') {
                switchNetworkAsync(chainId).catch(error => {
                    if (error instanceof UserRejectedRequestError ) {
                        logger.error("user denied to switch network")
                    }
                    else {
                        logger.error(error)
                    }
                })
            }
            return null
        },
        [switchNetworkAsync]
    )
    return {
        switchNetwork,
        error,
        status
    }
}