import { useEffect, useState } from 'react';
import { Product } from '../../../../typings/product';

export default function HomeContainer(products: Product[]) {
    const [limit, setLimit] = useState<number>(9);

    const [items, setItems] = useState<Product[]>(products.slice(0, limit));

    useEffect(() => {
        setItems(products.slice(0, limit));
    }, [limit]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 992) {
                setLimit(8);
            } else {
                setLimit(9);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const titleData = {
        title: 'A Multi-Currency Escrow Marketplace',
        subTitle: 'Buy & Sell anything with the confidence of escrow.',
    };

    const escrowPropertiesCardData = [
        {
            title: 'Secure Payments',
            image: 'ri-shield-star-line escrow-property-image',
            text: 'A trusted escrow payment solution secures transactions happening across the globe.',
        },
        {
            title: 'Rewards',
            image: 'ri-star-line escrow-property-image',
            text: 'Earn Crypto when you buy or sell on Merov!',
        },
        {
            title: 'Low Fees',
            image: 'ri-hand-coin-line escrow-property-image',
            text: 'Other marketplaces charge between 6% to 15%. Merov only charges a maximum fee of 5%',
        },
    ];

    const escrowPropertiesRowCardData = [
        {
            title: 'User Verification',
            text: 'To be able to buy or sell on Merov each user must go through a KYC check. This is part of what drives the security of the community.',
        },
        {
            title: 'Encompassing Multi-Chain',
            image: 'ri-star-line escrow-property-image',
            text: `All-in-one multi-chain - Merov's easy to use system
            will enable users to swap tokens into escrows. If a seller is only accepting USDT and
            you as a buyer only have ETH, this system will allow you to swap into the escrow wallet
            instead of having to pay gas for two transactions.`,
        },
        {
            title: 'Instant Details',
            text: 'Both buyers and sellers will have full access to transaction details and can view on immediate creation of wallet via etherscan.',
        },
    ];

    const socialMediaData = [
        {
            text: 'Telegram',
            image: 'ri-telegram-fill telegram',
            link: 'https://t.me/merovescrow',
        },
        {
            text: 'Twitter',
            image: 'ri-twitter-fill twitter',
            link: 'https://twitter.com/merov_io',
        },
    ];

    const partnersData = [
        {
            url: 'http://minedmap.com/',
            image: '/images/home/minedmap.jpg',
        },
        {
            url: 'https://cryptwerk.com/',
            image: '/images/home/cryptwerk.png',
        },
        {
            url: 'https://www.decise.io/',
            image: '/images/home/decise.png',
        },
        {
            url: 'https://www.prove.com/',
            image: '/images/home/prove.png',
        },
        {
            url: 'https://cointelegraph.com/',
            image: '/images/home/cointelegraph.svg',
        },
        {
            url: 'https://discord.gg/DvJPRaBf',
            image: '/images/home/minding.jpg',
        },
    ];

    return {
        titleData,
        escrowPropertiesCardData,
        escrowPropertiesRowCardData,
        socialMediaData,
        partnersData,
        items,
        limit,
    };
}
