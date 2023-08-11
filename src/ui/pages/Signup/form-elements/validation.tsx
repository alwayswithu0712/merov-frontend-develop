import * as Yup from 'yup';

const makeMinMaxCharactersErrorMessage = (name: string, min: string, max: string) =>
    `${name} must have between ${min} and ${max} characters!`;

export const signupValidation = Yup.object().shape({
    username: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Username', '2', '16'))
        .max(16, makeMinMaxCharactersErrorMessage('Username', '2', '16'))
        .required('Username is Required'),
    email: Yup.string().email(`Please enter a valid email address!`).required('Email Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, `At least 8 characters, lower case letters, upper case letters, numbers and special characters (e.g. !@#$%^&*)`)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            `At least 8 characters, lower case letters, upper case letters, numbers and special characters (e.g. !@#$%^&*)`,
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'The two passwords that you entered do not match!')
        .required('The two passwords that you entered do not match!'),
    addOrganization: Yup.boolean(),
    businessName: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Business', '2', '30'))
        .max(30, makeMinMaxCharactersErrorMessage('Business', '2', '30'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Business is Required`) : schema.notRequired(),
        ),
    country: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Country', '2', '40'))
        .max(40, makeMinMaxCharactersErrorMessage('Country', '2', '40'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Country is Required`) : schema.notRequired(),
        ),
    city: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('City', '2', '60'))
        .max(60, makeMinMaxCharactersErrorMessage('City', '2', '60'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`City is Required`) : schema.notRequired(),
        ),
    state: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('State', '2', '60'))
        .max(60, makeMinMaxCharactersErrorMessage('State', '2', '60'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`State is Required`) : schema.notRequired(),
        ),
    street: Yup.string()
        .min(5, makeMinMaxCharactersErrorMessage('Street', '5', '120'))
        .max(120, makeMinMaxCharactersErrorMessage('Street', '5', '120'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Street is Required`) : schema.notRequired(),
        ),
    zipcode: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Zipcode', '2', '15'))
        .max(15, makeMinMaxCharactersErrorMessage('Zipcode', '2', '15'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Zipcode is Required`) : schema.notRequired(),
        ),
    taxpayerNumber: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Taxpayer', '2', '25'))
        .max(25, makeMinMaxCharactersErrorMessage('Taxpayer', '2', '25'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Taxpayer is Required`) : schema.notRequired(),
        ),
    website: Yup.string()
        .min(2, makeMinMaxCharactersErrorMessage('Website', '6', '25'))
        .max(25, makeMinMaxCharactersErrorMessage('Website', '6', '25'))
        .when('addOrganization', (addOrganization, schema) =>
            addOrganization ? schema.required(`Website is Required`) : schema.notRequired(),
        ),
});
