import React, { useState } from 'react';
import Logo from '../../../assets/images/Logo';
import ComingSoonService from '../../../services/comingSoon';

export default function ComingSoon() {
    const [errorLabel, setErrorLabel] = useState<string>('');
    const [color, setColor] = useState<string>('red');
    const [email, setEmail] = useState<string>('');
    const { postEmail } = ComingSoonService();

    function handleChangeEmail(event: any) {
        setEmail(event.target.value);
        setErrorLabel('');
    }

    async function handleNotifyMe() {
        // eslint-disable-next-line
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email)) {
            setEmail('');
            const response = await postEmail(email);
            if (response.status === 200 || response.status === 409) {
                setColor('var(--color-basic-green)');
                setErrorLabel('Successful Registration!');
            }
        } else {
            setColor('red');
            setErrorLabel('Please enter a valid email address!');
        }
    }

    return (
        <React.Fragment>
            <div className="logo-comingsoon">
                <Logo />
            </div>
            <div className="Portada">
                <img id="Fondo-Portada" src={`/images/comingsoon.png`} />
                <div className="comingsoon-data">
                    <h1 className="comingsoon-title">Coming soon</h1>
                    <form className="row search comingsoon-form">
                        <div className="col-sm-12 col-md-8 input-col">
                            <input
                                type="text"
                                placeholder="Please enter your email address"
                                className="comingsoon-input "
                                onChange={handleChangeEmail}
                                value={email}
                            />
                        </div>
                        <div className="col-sm-12 col-md-4 comingsoon-button">
                            <a onClick={handleNotifyMe} className="btn btn-custom btn-primary ">
                                Notify Me
                            </a>
                        </div>
                    </form>
                    <div className={`errorLabel-cs `} style={{ color }}>
                        {errorLabel}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
