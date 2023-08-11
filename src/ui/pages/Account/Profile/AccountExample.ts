import { STATUS } from '../../../../typings/user';

export const OrganizationExample = {
    id: 'asdjasbhdiuashdasd',
    count: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    businessName: 'Merov',
    taxpayerNumber: 1020123,
    website: 'pupitos.com.uy',
    ownerId: 'sdasd5646asdasd',
    owner: 'Montana',
    members: [],
    businessAddress: 'Montevideo Uruguay L.A HERRERA 123123',
};

export const AccountExample = {
    accountName: 'Merov',
    avatarUrl: 'https://s.gravatar.com/avatar/6a5314a6f1ee36c6247407fe48b2b358?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fni.png',
    reviewCount: 123,
    rating: 2,
    organization: OrganizationExample,
    isOwner: true,
    idVerificationStatus: STATUS.Full,
    addresses: [
        {
            id: 'as5664das654das65d',
            state: 'Montevideo',
            postcode: '123123',
            phone: '+56464646948',
            city: 'Montevideo',
            country: 'Uruguay',
            street: 'L.A HERRERA 123123',
            name: 'test',
        },
    ],
};
