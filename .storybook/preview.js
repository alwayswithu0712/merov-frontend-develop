import { RouterContext } from "next/dist/shared/lib/router-context";
import '../public/css/style.css';

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'dark',
        values: [
            {
                name: 'dark',
                value: '#000000',
            },
            {
                name: 'white',
                value: '#fff',
            },
        ],
    },
};
