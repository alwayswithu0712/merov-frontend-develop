export interface SardineDocumentVerifyRequest {
    firstName: string;
    lastName: string;
    address: {
        street1: string;
        city: string;
        region: string;
        postalCode: string;
        countryCode: string;
    };
}

export interface SardineVerifyIdResponse {
    id: string;
    link: {
        expiredAt: string;
        url: string;
    };
}
