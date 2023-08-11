import { useRouter } from 'next/router';

export function useSearchParamsState<T>(defaultValues: T): readonly [searchParamsState: T, setSearchParamsState: (newState: T) => void] {
    const router = useRouter();

    const searchParamsState = Object.keys(router.query).length > 0 ? (router.query as T) : defaultValues;

    const setSearchParamsState = (newState: T) => {
        const query = { ...router.query, ...newState };

        // delete undefined
        Object.keys(query).forEach((key) => (query[key] === undefined ? delete query[key] : {}));

        router.push(
            {
                pathname: router.pathname,
                query,
            },
            undefined,
            { shallow: true },
        );
    };

    if (!router.query) {
        setSearchParamsState(defaultValues);
    }

    return [searchParamsState, setSearchParamsState];
}
