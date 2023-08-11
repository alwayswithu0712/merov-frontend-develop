import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Auth0 from 'auth0-js';

const initialValues = {
    fullName: 'Nicolas',
    email: 'nico4@test.com',
    password: 'P@ssword123',
    acceptTerms: false,
};

const SignupFormSchema = Yup.object().shape({
    fullName: Yup.string().required('Full is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
});

function SignupForm() {
    const handleSignUp = async () => {
        const auth0 = new Auth0.WebAuth({
            domain: 'merov-dev.us.auth0.com',
            clientID: '3HBaRRI1TRZ4Atjl4wTjIKDhRGVl1Pte',
            redirectUri: 'http://localhost:3000',
            responseType: 'token id_token',
            scope: 'openid profile email',
        });
        const result = await auth0.signup(
            {
                connection: 'Username-Password-Authentication',
                email: 'email',
                password: 'Password',
                username: 'Username',
                user_metadata: { referral: 'Nico', phone: '123456' },

                /*
                    { "email": event.user.email,
                    "auth0id": event.user.user_id,
                    "username": event.user.username,
                    "phone": event.user.phone_number,
                    "referralId": event.user.user_metadata.referral });
                */
            },
            (a, b) => {
                console.log('callback', JSON.stringify(a), JSON.stringify(b));
            },
        );
        console.log(result);
    };

    return (
        <React.Fragment>
            <Formik initialValues={initialValues} validationSchema={SignupFormSchema}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Full Name</label>
                                <Field
                                    name="fullName"
                                    type="text"
                                    className={`form-control${errors.fullName && touched.fullName ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Password</label>
                                <Field
                                    name="password"
                                    type="text"
                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            {/* <div className="col-12 mb-3">
                                <label className="form-label">Confirm Password</label>
                                <Field
                                    name="confirmPassword"
                                    type="text"
                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`}
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div> */}
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button onClick={handleSignUp} className="btn btn-custom btn-primary mr-2">
                                Sign Up
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}
export default SignupForm;
