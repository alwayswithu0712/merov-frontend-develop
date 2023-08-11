import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { connect } from 'react-redux';

const initialValues = {
    email: '',
    password: '',
};

const SigninFormSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function SigninForm({ dispatch }) {
    // const [auth0, setAuth0] = useState();

    // useEffect(async () => {
    //     const a0 = await createAuth0Client({
    //         domain: 'merov-dev.us.auth0.com',
    //         client_id: '3HBaRRI1TRZ4Atjl4wTjIKDhRGVl1Pte',
    //     });
    //     setAuth0(a0);
    // });

    // const handleLogin = async () => {
    //     await auth0.loginWithRedirect({
    //         redirect_uri: 'http://localhost:3000/',
    //         responseType: 'token id_token',
    //         scope: 'openid profile email',
    //     });
    //     const user = await auth0.getUser();
    //     console.log(user);
    // };

    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={SigninFormSchema}
                onSubmit={() => {
                    // alert(
                    //     "SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4)
                    // );
                    dispatch({ type: 'connect' });
                }}
            >
                {({ errors, touched }) => (
                    <Form style={{ width: '50%', marginLeft: '33%' }}>
                        <div className="row">
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
                            <div className="col-6">
                                <div className="form-check">
                                    <Field type="checkbox" name="acceptTerms" className={'form-check-input '} />
                                    <label className="form-check-label">Remember me</label>
                                </div>
                            </div>
                            <div className="col-6 text-end">
                                <Link href="/reset" passHref>
                                    <a>Forgot Password?</a>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button onClick={() => {}} className={'btn btn-custom btn-primary mr-2'}>
                                Sign In
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}
const mapStateToProps = (dispatch) => ({
    dispatch: dispatch.Connected,
});

export default connect(mapStateToProps)(SigninForm);
