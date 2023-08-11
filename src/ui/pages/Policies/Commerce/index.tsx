import React from 'react';
import { TITLE_DATA, CONTENT_DATA } from './data/CommerceData';
import InfoLayout from '../../../layouts/InfoLayout';

export default function Commerce() {
    return (
        <InfoLayout titleData={TITLE_DATA} headTitle={TITLE_DATA.header}>
            <>
                <h2>{CONTENT_DATA.purposeTitle}</h2>

                <p>{CONTENT_DATA.purposeTextOne}</p>

                <h2>{CONTENT_DATA.backgroundTitle}</h2>

                <p>{CONTENT_DATA.backgroundTextOne}</p>

                <h2>{CONTENT_DATA.policyTitle}</h2>

                <h3>{CONTENT_DATA.policyTextOne}</h3>

                <p>{CONTENT_DATA.policyTextTwo}</p>
                <ol>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleAdult}</h4>
                        <p>{CONTENT_DATA.policyTextAdult}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleAlcohol}</h4>
                        <p>{CONTENT_DATA.policyTextAlcohol}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleBodyParts}</h4>
                        <p>{CONTENT_DATA.policyTextBodyParts}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleIllegalStreaming}</h4>
                        <p>{CONTENT_DATA.policyTextIllegalStreaming}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleDiscrimination}</h4>
                        <p>{CONTENT_DATA.policyTextDiscrimination}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleDocuments}</h4>
                        <p>{CONTENT_DATA.policyTextDocuments}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleGambling}</h4>
                        <p>{CONTENT_DATA.policyTextGambling}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleHazardous}</h4>
                        <p>{CONTENT_DATA.policyTextHazardous}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleHuman}</h4>
                        <p>{CONTENT_DATA.policyTextHuman}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleIngestible}</h4>
                        <p>{CONTENT_DATA.policyTextIngestible}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleAnimals}</h4>
                        <p>{CONTENT_DATA.policyTextAnimals}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleMedical}</h4>
                        <p>{CONTENT_DATA.policyTextMedical}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleMisleading}</h4>
                        <p>{CONTENT_DATA.policyTextMisleading}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitle}</h4>
                        <p>{CONTENT_DATA.policyText}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitlePrescription}</h4>
                        <p>{CONTENT_DATA.policyTextPrescription}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleRecalled}</h4>
                        <p>{CONTENT_DATA.policyTextRecalled}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleSexually}</h4>
                        <p>{CONTENT_DATA.policyTextSexually}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleStolen}</h4>
                        <p>{CONTENT_DATA.policyTextStolen}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleThird}</h4>
                        <p>{CONTENT_DATA.policyTextThird}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleTobacco}</h4>
                        <p>{CONTENT_DATA.policyTextTobacco}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleCosmetics}</h4>
                        <p>{CONTENT_DATA.policyTextCosmetics}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleWeapons}</h4>
                        <p>{CONTENT_DATA.policyTextWeapons}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleViolence}</h4>
                        <p>{CONTENT_DATA.policyTextViolence}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleCoordinating}</h4>
                        <p>{CONTENT_DATA.policyTextCoordinating}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleFraud}</h4>
                        <p>{CONTENT_DATA.policyTextFraud}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleSuicide}</h4>
                        <p>{CONTENT_DATA.policyTextSuicide}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitleChild}</h4>
                        <p>{CONTENT_DATA.policyTextChild}</p>
                    </li>
                    <li>
                        <h4>{CONTENT_DATA.policySubtitlePrivate}</h4>
                        <p>{CONTENT_DATA.policyTextPrivate}</p>
                    </li>
                </ol>
                <h3>{CONTENT_DATA.appealTitle}</h3>

                <p>{CONTENT_DATA.appealText}</p>
            </>
        </InfoLayout>
    );
}
