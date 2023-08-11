import { useContext } from 'react';
import { SardineContext, SardineProvider } from '@sardine-ai/react-js-wrapper';

export const useSardine = () => {
    const { setupSardineWithConfig, updateSardineConfig, getSardineSessionKey } = useContext(SardineContext);

    return { setupSardineWithConfig, updateSardineConfig, getSardineSessionKey, SardineProvider };
};
