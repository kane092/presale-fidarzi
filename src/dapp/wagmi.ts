import { Chain, configureChains, createClient } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'

export const bsc: Chain = {
    id: 56,
    name: 'BNB Smart Chain',
    network: 'bsc',
    rpcUrls: {
        default: 'https://bsc-dataseed1.binance.org',
    },
    blockExplorers: {
        default: {
            name: "bscscan",
            url: "https://bscscan.com",
        },
        etherscan: {
            name: "bscscan",
            url: "https://bscscan.com",
        }
    },
    nativeCurrency: {
        name: 'Binance Chain Native Token',
        symbol: 'BNB',
        decimals: 18,
    },
    multicall: {
        address: '0x72dba3Fa54C73D9EDB493e9F4eDf884439B1eBC4',
        blockCreated: 20455688,
    },
}

export const CHAINS = [
    bsc
]

const { provider, chains } = configureChains(CHAINS, [
    jsonRpcProvider({
        rpc: (chain) => {
        //   if (!!process.env.NEXT_PUBLIC_NODE_PRODUCTION && chain.id === eth.id) {
        //     return { http: process.env.NEXT_PUBLIC_NODE_PRODUCTION }
        //   }
        //   if (chain.rpcUrls.nodeReal) {
        //     return (
        //       getNodeRealUrl(chain.network) || {
        //         http: chain.rpcUrls.nodeReal,
        //       }
        //     )
        //   }
          return { http: chain.rpcUrls.default }
        },
      }),
])

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false
    }
})

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true,
    },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

export const client = createClient({
    autoConnect: true,
    provider,
    connectors: [
        new SafeConnector({ chains }),
        metaMaskConnector,
        injectedConnector,
        walletConnectConnector,
    ],
})
