export type ICreateContactForm = {
    name: string;
    reason: string;
    email: string;
    description: string;
};

export type ContactForm = {
    id: string;
    name: string;
    reason: string;
    email: string;
    description: string;
    updatedAt: Date;
};
