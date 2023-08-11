import React from 'react';
import Link from 'next/link';

export default function AboutCards() {
    return (
        <React.Fragment>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 about-card">
                <div className="card">
                    <i className="ri-user-fill icon-about-card"></i>
                    <p>Looks like you are not verified yet. Verify yourself to use the full potential of Xtrader.</p>
                    <Link href="/about" passHref>
                        <a>
                            <span style={{ display: 'flex' }}>
                                <h4> Learn More </h4>
                                <i className="ri-arrow-right-fill arrow-about-card"></i>
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}
