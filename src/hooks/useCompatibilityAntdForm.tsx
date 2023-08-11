import { useState } from 'react';

export function useCompatibilityAntdForm<T>(initialFormErrorFields: T): {
    errors: T;
    setErrors: (errorFields: T) => void;
    handleOnFinishFormErrors: (formFields: object, callback?: () => void) => void;
    handleSetError: (name: string, value: boolean) => void;
} {
    const [errors, setErrors] = useState<T>(initialFormErrorFields);

    const handleOnFinishFormErrors = (formFields: any, callback?: () => void) => {
        for (let index = 0; index < formFields.errorFields.length; index += 1) {
            const element = formFields.errorFields[index];
            const formFieldName = element.name[0];
            if (formFieldName) handleSetError(formFieldName, true);
        }
        if (callback) callback();
    };

    const handleSetError = async (name: string, value: boolean) => {
        await setErrors((prevErrorsState) => ({ ...prevErrorsState, [name]: value }));
    };

    return {
        errors,
        setErrors,
        handleOnFinishFormErrors,
        handleSetError,
    };
}
