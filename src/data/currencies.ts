import { Blockchain } from '../typings/blockchain';
import { ICurrency } from '../typings/currencies';
import { Currency } from '../typings/currency';
import BtcLogo from '../assets/icons/BtcLogo';
import EthereumLogo from '../assets/icons/EthereumLogo';
import MaticLogo from '../assets/icons/MaticLogo';
import UsdtLogo from '../assets/icons/UsdtLogo';
import UsdcLogo from '../assets/icons/UsdcLogo';
import BnbLogo from '../assets/icons/BnbLogo';

const Currencies: Record<string, ICurrency> = {
    [Currency.USDT]: {
        name: Currency.USDT,
        enabled: true,
        isUsd: true,
        chains: [Blockchain.Ethereum, Blockchain.Polygon],
        getImg: UsdtLogo,
    },
    [Currency.USDC]: {
        name: Currency.USDC,
        enabled: true,
        isUsd: true,
        chains: [Blockchain.Ethereum, Blockchain.Polygon],
        getImg: UsdcLogo,
    },
    [Currency.BTC]: {
        name: Currency.BTC,
        enabled: true,
        isUsd: false,
        chains: [Blockchain.Bitcoin],
        getImg: BtcLogo,
    },
    [Currency.MATIC]: {
        name: Currency.MATIC,
        enabled: true,
        isUsd: false,
        chains: [Blockchain.Polygon],
        getImg: MaticLogo,
    },
    [Currency.ETH]: {
        name: Currency.ETH,
        enabled: true,
        isUsd: false,
        chains: [Blockchain.Ethereum],
        getImg: EthereumLogo,
    },
    [Currency.BNB]: {
        name: Currency.BNB,
        enabled: true,
        isUsd: false,
        chains: [Blockchain.BinanceSmartChain],
        getImg: BnbLogo,
    },
};

export default Currencies;
