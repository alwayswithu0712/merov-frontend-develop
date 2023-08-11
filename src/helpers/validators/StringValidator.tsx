import WAValidator from 'multicoin-address-validator';

const StringValidator = () => {
    function WalletValidator(walletAddress: string, blockchain: any, handleSetError?: any) {
        let valid: boolean = false;

        if (!walletAddress) {
            return Promise.reject(new Error(`Wallet Address is required!`));
        }
        if (blockchain === 'Polygon') {
            valid = WAValidator.validate(walletAddress, 'Matic');
        } else {
            valid = WAValidator.validate(walletAddress, String(blockchain));
        }
        if (!valid) {
            if (handleSetError) handleSetError('sellerAddress', true);
            return Promise.reject(new Error(`Invalid Wallet Address!`));
        }
        if (handleSetError) handleSetError('sellerAddress', false);
        return Promise.resolve();
    }
    function TitleValidator(title: string, handleSetError: any) {
        if (title == null || title.length < 5 || title.length > 80) {
            handleSetError('title', true);
            return Promise.reject(new Error(`Title must have between 5 and 80 characters!`));
        }
        handleSetError('title', false);
        return Promise.resolve();
    }
    function DescriptionVlidator(description: string, fieldName, handleSetError?: (name: string, value: boolean) => void) {
        if (description == null || description.length < 6 || description.length > 5000) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Description must have between 6 and 5000 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function ConditionValidator(condition: string) {
        if (condition == null || condition.length < 3 || condition.length > 15) {
            return Promise.reject(new Error(`Condition must have between 3 and 15 characters!`));
        }
        return Promise.resolve();
    }

    function NameValidator(name: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (name == null || name.length < 3 || name.length > 35) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Full Name must have between 3 and 35 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function StreetValidator(street: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (street == null || street.length < 5 || street.length > 100) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Street Address must have between 5 and 100 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function StateValidator(state: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (state == null || state.length < 4 || state.length > 35) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`State must have between 4 and 35 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function PostCodeValidator(postCode: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (postCode == null || postCode.length < 3 || postCode.length > 30) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Zip Code must have between 3 and 30 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }
    function CityValidator(city: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        if (city == null || city.length < 4 || city.length > 30) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`City must have between 4 and 30 characters!`));
        }
        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function PhoneValidator(phone: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        const regEx = /^\+[1-9]\d{10,14}$/;

        if (!regEx.test(phone)) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(
                new Error(`Phone must be [+][country code][phone number] phone number must be between 11 and 15 characters!`),
            );
        }

        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function EmailValidator(email: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        const regEx =
            // eslint-disable-next-line no-useless-escape
            /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regEx.test(email)) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(new Error(`Please enter a valid email address!`));
        }

        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    function PasswordValidator(password: string, fieldName?: string, handleSetError?: (name: string, value: boolean) => void) {
        const regEx =
            // eslint-disable-next-line no-useless-escape
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/;

        if (!regEx.test(password)) {
            if (handleSetError && fieldName) handleSetError(fieldName, true);
            return Promise.reject(
                new Error(`At least 8 characters, lower case letters, upper case letters, numbers and special characters (e.g. !@#$%^&*)`),
            );
        }

        if (handleSetError && fieldName) handleSetError(fieldName, false);
        return Promise.resolve();
    }

    return {
        WalletValidator,
        TitleValidator,
        DescriptionVlidator,
        ConditionValidator,
        NameValidator,
        StreetValidator,
        StateValidator,
        PostCodeValidator,
        CityValidator,
        PhoneValidator,
        EmailValidator,
        PasswordValidator,
    };
};

export default StringValidator;
