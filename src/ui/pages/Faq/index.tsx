import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PageTitle from '../../layouts/PageTitle';
import { FAQ_QUESTIONS } from './data/faqQuestions';
import Button, { SIZE, VARIANT } from '../../components/buttons/Button';
import ContactModal from '../../layouts/modals/ContactModal';

interface IQuestionItem {
    question: string;
    answer: string;
}

const Faq = () => {
    const [contactModal, setContactModal] = useState<boolean>(false);
    const [arrayShowAnswer, setArrayAnswer] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);

    function handleMoreLessButtom(i: number) {
        setArrayAnswer(
            arrayShowAnswer.map((item, index) => {
                if (index === i) {
                    return !item;
                }
                return item;
            }),
        );
    }

    const handleOpenModal = () => {
        setContactModal(true);
    };

    return (
        <React.Fragment>
            <MainLayout headTitle="Faq" pageClass={'dashboard '} width={'80%'}>
                <div className="container" style={{ width: '80%' }}>
                    <div style={{ justifyContent: 'center' }}>
                        <PageTitle />
                        <div className="margin-bottom">
                            {FAQ_QUESTIONS.map((item: IQuestionItem, index: number) => (
                                <div key={index} className="row ">
                                    <div onClick={() => handleMoreLessButtom(index)} className="col-12 faq-question ">
                                        {item.question}
                                        {arrayShowAnswer[index] ? (
                                            <i className="ri-subtract-line faq-icon-add-less"></i>
                                        ) : (
                                            <i className="ri-add-fill faq-icon-add-less"></i>
                                        )}
                                    </div>
                                    {arrayShowAnswer[index] && <div className="col-12 faq-answer ">{item.answer}</div>}
                                </div>
                            ))}
                        </div>

                        <div style={{ justifyContent: 'center' }} className="row faq-margin-bottom">
                            <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 faq-cant-finde-row">
                                Cant find the answer within our FAQs?
                            </div>
                            <div className="faq-contact-us-btn col-sm-5 col-md-5 col-lg-5 col-xl-5 ">
                                <Button onClick={handleOpenModal} size={SIZE.MEDIUM} variant={VARIANT.PRIMARY}>
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                        <div className="faq-margin-bottom"></div>
                    </div>
                    <ContactModal contactModal={contactModal} setContactModal={setContactModal}></ContactModal>
                </div>
            </MainLayout>
        </React.Fragment>
    );
};

export default Faq;
