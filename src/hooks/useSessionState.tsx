import { useState } from 'react';
import useSessionStorage from './useSessionStorage';

export function useSessionState<T>(sessionKey: string, initialValue?: T): [T, (value: T) => void] {
    const [sessionState, setSessionState] = useSessionStorage<T>(sessionKey, initialValue);

    const [state, _setState] = useState<T>(sessionState);

    const setState = (value: T) => {
        _setState(value);
        setSessionState(value);
    };

    return [state, setState];
}
