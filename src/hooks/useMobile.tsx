import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize';

export const useMobile = () => {
    const size = useWindowSize();

    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setMobile(size.width <= 800);
    }, [size]);

    return mobile;
};
