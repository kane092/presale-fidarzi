import { useSwitchNetwork } from '../hooks/useSwitchNetwork';

export const SwitchNetworkBtn = () => {
    const { switchNetwork, status } = useSwitchNetwork()

    const _switchNetwork = (chainId: number) => {
        if (status === "loading") return;
        switchNetwork(chainId);
    }

    return (
        <button className="btn btn-primary" onClick={() => _switchNetwork(56)}>Switch Netowrk</button>
    )
}