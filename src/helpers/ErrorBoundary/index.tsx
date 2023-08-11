import * as React from 'react';
import Error from '../../ui/components/ErrorBoundary';

const ErrorBoundary = ({ children }: { children: any }) => {
    const [error, setError] = React.useState('');

    const promiseRejectionHandler = (event: any) => {
        const isSendbirdError = event.reason.toString().startsWith('SendbirdError');
        if (!isSendbirdError) {
            setError(event.reason);
        }
    };

    const resetError = React.useCallback(() => {
        setError('');
    }, []);

    React.useEffect(() => {
        window.addEventListener('unhandledrejection', promiseRejectionHandler);

        return () => {
            window.removeEventListener('unhandledrejection', promiseRejectionHandler);
        };
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return error ? <Error resetError={resetError} /> : children;
};

export default ErrorBoundary;
