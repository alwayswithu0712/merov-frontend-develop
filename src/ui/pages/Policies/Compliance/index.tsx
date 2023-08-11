import React from 'react';
import { TITLE_DATA, CONTENT_DATA } from './data/ComplianceData';
import InfoLayout from '../../../layouts/InfoLayout';

export default function Commerce() {
    return (
        <InfoLayout titleData={TITLE_DATA} headTitle={TITLE_DATA.header}>
            <>
                <p>{CONTENT_DATA.textOne}</p>
                <p> {CONTENT_DATA.textTwo}</p>
                <p>{CONTENT_DATA.textThree}</p>
                <p>{CONTENT_DATA.textFour}</p>
                <h3>{CONTENT_DATA.resourceTitle}</h3>
                <p>{CONTENT_DATA.resourceTextOne}</p>
                <p>{CONTENT_DATA.resourceTextTwo}</p>
                <p>{CONTENT_DATA.resourceTextThree}</p>
                <h4>{CONTENT_DATA.resourceSubtitle}</h4>
                <p>{CONTENT_DATA.resourceTextThree}</p>
                <p>{CONTENT_DATA.resourceItemOne}</p>
                <p>{CONTENT_DATA.resourceItemTwo}</p>
                <p>{CONTENT_DATA.resourceItemThree}</p>

                <h3>{CONTENT_DATA.governanceTitle}</h3>
                <p>{CONTENT_DATA.governanceTextOne}</p>
                <p>{CONTENT_DATA.governanceTextTwo}</p>
                <h3>{CONTENT_DATA.policiesTitle}</h3>
                <p>{CONTENT_DATA.policiesTextOne}</p>
                <p>
                    {CONTENT_DATA.policiesTextTwo}
                    <a href={`mailto:${CONTENT_DATA.policiesMail}`}>{CONTENT_DATA.policiesMail}</a>
                </p>
            </>
        </InfoLayout>
    );
}
