import isAdult from '../isAdult';

const DateValidator = () => {
    function AdultValidator(dateString: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (!isAdult(dateString)) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error('You must be at least 18 years old to create an account'));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }
    return {
        AdultValidator,
    };
};
export default DateValidator;
