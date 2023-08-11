import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from 'next/router';
import { Category } from '../typings/category';
import { Chat } from '../typings/chat';
import { ProductFilters } from '../typings/filters';
import { ICreateOrder, ICreateOrderOffer, IUpdateOrder, Order, Review } from '../typings/order';
import { PaginatedResponse } from '../typings/paginatedResponse';
import { PageQuery } from '../typings/pageQuery';
import { ICreateProduct, Product, IUpdateProduct } from '../typings/product';
import { IUpdateUser, User } from '../typings/user';
import { ICreateWallet, Wallet } from '../typings/wallet';
import { getAccessToken, setAccessToken } from './auth';
import { ContactForm, ICreateContactForm } from '../typings/contact';
import { Notification } from '../typings/notification';
import { Brand } from '../typings/brand';
import { Model } from '../typings/model';
import { Offer, ICreateOffer } from '../typings/offer';
import { DeliveryAddress } from '../typings/deliveryAddress';
import { SardineDocumentVerifyRequest, SardineVerifyIdResponse } from '../typings/sardine';
import { ProveFinish, ProveStart } from '../typings/prove';
import { emailSubscribe } from '../typings/emailSubscribe';
import { IBlog, ICreateBlog } from '../typings/blog';
import { Account, IUpdateAccount } from '../typings/account';
import { Organization } from '../typings/organization';
import { Invitation } from '../typings/invitation';

// Only needed if we run docker-compose
// const isClient = typeof window !== 'undefined';
// const baseURL = isClient ? process.env.NEXT_PUBLIC_API_BASEURL?.replace(`backend`, `localhost`) : process.env.NEXT_PUBLIC_API_BASEURL;

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const isClient = typeof window !== 'undefined';
        if (config.headers && isClient) {
            const accessToken = await getAccessToken();
            if (accessToken) {
                // eslint-disable-next-line no-param-reassign
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
instance.interceptors.response.use(
    (response) => response.data,
    async (error: { response: AxiosResponse; config: AxiosRequestConfig & { retry: boolean } }) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            setAccessToken(null);
            if (error.response.config.url !== '/users/me') {
                await router.push('/api/auth/logout');
            }
            return instance(originalRequest);
        }

        return Promise.reject(error);
    },
);

export const getConfig = (accessToken?: string) => ({
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

const getUserById = async (userId: string): Promise<User> => instance.get(`/users/${userId}`);

const getAccountByName = async (name: string): Promise<Account> => instance.get(`/accounts/${name}`);

const getMyUser = async (accessToken?: string): Promise<User> => instance.get(`/users/me`, getConfig(accessToken));

const updateUser = async (user: IUpdateUser, accessToken?: string): Promise<User> =>
    instance.patch(`/users/me`, user, getConfig(accessToken));

const sendVerificationEmail = async (accessToken?: string): Promise<User> =>
    instance.post(`/users/me/verification-email`, getConfig(accessToken));

const changePassword = async (password: string, accessToken?: string): Promise<User> =>
    instance.patch(`/users/me/change-password`, { password }, getConfig(accessToken));

const postPhoneVerifyStart = async (accessToken?: string): Promise<ProveStart> =>
    instance.post(`/identity/verifications/start`, getConfig(accessToken));

const postPhoneVerifyFinish = async (otp: string, accessToken?: string): Promise<ProveFinish> =>
    instance.post(`/identity/verifications/otp/finish`, { otp }, getConfig(accessToken));

const getDocumentVerificationUrl = async (request?: SardineDocumentVerifyRequest, accessToken?: string): Promise<SardineVerifyIdResponse> =>
    instance.post(`/identity/verifications/documents/url`, request, getConfig(accessToken));

const getAddresses = async (accessToken?: string): Promise<DeliveryAddress[]> =>
    instance.get(`/accounts/me/addresses`, getConfig(accessToken));

const postAddress = async (address: Partial<DeliveryAddress>, accessToken?: string): Promise<DeliveryAddress> =>
    instance.post(`/accounts/me/addresses`, address, getConfig(accessToken));

const postOffer = async (offer: ICreateOffer, accessToken?: string): Promise<Offer> =>
    instance.post(`/offers`, offer, getConfig(accessToken));

const updateAddress = async (
    addressId: string,
    address: Partial<DeliveryAddress>,
    accessToken?: string,
): Promise<{ address: DeliveryAddress }> => instance.patch(`/accounts/me/addresses/${addressId}`, address, getConfig(accessToken));

const deleteAddress = async (addressId: string, accessToken?: string): Promise<DeliveryAddress> =>
    instance.delete(`/accounts/me/addresses/${addressId}`, getConfig(accessToken));

const postProduct = async (product: ICreateProduct, accessToken?: string): Promise<Product> =>
    instance.post(`/products`, product, getConfig(accessToken));

const updateProduct = async (productId: string, product: IUpdateProduct, accessToken?: string): Promise<Product> =>
    instance.patch(`/products/${productId}`, product, getConfig(accessToken));

const deleteProduct = async (productId: string, accessToken?: string): Promise<Product> =>
    instance.delete(`/products/${productId}`, getConfig(accessToken));

const getCategories = async (): Promise<Category[]> => instance.get(`/categories`);

const getBrands = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Brand>> =>
    instance.get(`/brands`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getModels = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Model>> =>
    instance.get(`/models`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getMyProductById = async (productId: string, accessToken?: string): Promise<Product> =>
    instance.get(`/accounts/me/products/${productId}`, {
        ...getConfig(accessToken),
    });

const getProductById = async (productId: string): Promise<Product> => instance.get(`/products/${productId}`);

const getRelatedProducts = async (productId: string): Promise<PaginatedResponse<Product>> => instance.get(`/products/${productId}/related`);

const getProducts = async (params: PageQuery & ProductFilters): Promise<PaginatedResponse<Product>> =>
    instance.get(`/products`, {
        params: {
            ...params,
        },
    });

const getReviews = async (accountId: string): Promise<Review[]> => instance.get(`/accounts/${accountId}/reviews`, {});

const getMyReviews = async (accessToken?: string): Promise<Review[]> => instance.get(`/accounts/me/reviews`, getConfig(accessToken));

const getMyProducts = async (params: PageQuery & ProductFilters, accessToken?: string): Promise<PaginatedResponse<Product>> =>
    instance.get(`/accounts/me/products`, {
        ...getConfig(accessToken),
        params: {
            ...params,
        },
    });

const getFeaturedProducts = async (): Promise<PaginatedResponse<Product>> => instance.get(`/products/featured`);

const updateOrder = async (orderId: string, order: IUpdateOrder, accessToken?: string): Promise<Order> =>
    instance.patch(`/orders/${orderId}`, order, getConfig(accessToken));

const postOrder = async (order: ICreateOrder, accessToken?: string): Promise<Order> =>
    instance.post(`/orders`, order, getConfig(accessToken));

const postOrderOffer = async (order: ICreateOrderOffer, accessToken?: string): Promise<Order> =>
    instance.post(`/orders/offer`, order, getConfig(accessToken));

const deleteOffer = async (offerId: string, accessToken?: string): Promise<Product> =>
    instance.patch(`/offers/${offerId}`, { status: 'Closed' }, getConfig(accessToken));

const getOrderById = async (orderId: string, accessToken?: string): Promise<Order> =>
    instance.get(`/orders/${orderId}`, getConfig(accessToken));

const getOfferById = async (offerId: string): Promise<Offer> => instance.get(`/offers/${offerId}`);

const getMyOrders = async (pagination: Record<string, unknown>, accessToken?: string): Promise<Order[]> =>
    instance.get(`/orders`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getTotalValueTransactedThisMonth = async (accessToken?: string): Promise<number> =>
    instance.get(`/orders/total-value-transacted-this-month`, {
        ...getConfig(accessToken),
    });

const getActiveMyOrders = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Order>> =>
    instance.get(`/orders/active`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getCompletedOrders = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Order>> =>
    instance.get(`/orders/completed`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getMyActiveOffers = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Offer>> =>
    instance.get(`/offers/active`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const getMyExpiredOffers = async (pagination: Record<string, unknown>, accessToken?: string): Promise<PaginatedResponse<Offer>> =>
    instance.get(`/offers/expired`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const postReview = async (review: Review, orderId: string, accessToken?: string): Promise<Review> =>
    instance.post(`/orders/${orderId}/reviews`, review, getConfig(accessToken));

const getOrderReviews = async (userId: string, accessToken?: string): Promise<Review[]> =>
    instance.get(`/orders/${userId}/reviews`, getConfig(accessToken));

const getMyWallets = async (accessToken?: string): Promise<Wallet[]> => instance.get(`/accounts/me/wallets`, getConfig(accessToken));

const postWallet = async (wallet: ICreateWallet, accessToken?: string): Promise<Wallet> =>
    instance.post(`/accounts/me/wallets`, wallet, getConfig(accessToken));

const deleteWallet = async (walletId: string, accessToken?: string): Promise<void> =>
    instance.delete(`/accounts/me/wallets/${walletId}`, getConfig(accessToken));

const createProductChat = async (productId: string, accessToken?: string): Promise<Chat> =>
    instance.post('/chats', { productId }, getConfig(accessToken));

const getChatById = async (chatId: string, accessToken?: string): Promise<Chat> => instance.get(`/chats/${chatId}`, getConfig(accessToken));

const getNotifications = async (accessToken?: string): Promise<Notification[]> => instance.get(`/notifications`, getConfig(accessToken));

const getNoticationsUnread = async (accessToken?: string): Promise<Notification[]> =>
    instance.get(`/notifications/unread`, getConfig(accessToken));

const setNotificationAsRead = async (notificationId: string, accessToken?: string): Promise<Notification> =>
    instance.post(`/notifications/${notificationId}/read`, getConfig(accessToken));

const getChats = async (accessToken?: string): Promise<Chat[]> => instance.get('/chats', getConfig(accessToken));

const getPrice = async (currency: string): Promise<number> => instance.get(`/currencies/${currency}/price`);

const postImage = async (image: FormData, accessToken?: string): Promise<{ url: string }> => {
    const config = {
        withCredentials: false,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    };

    return instance.post(`/images`, image, config);
};

const postContact = async (contact: ICreateContactForm): Promise<ContactForm> => instance.post(`/contact`, contact);
const listenEvents = (userId: string, action: (data: any) => void) => {
    const evtSource = new EventSource(`${baseURL}/notifications/stream/${userId}`);

    evtSource.onmessage = (message) => {
        action(JSON.parse(message.data));
    };

    evtSource.onerror = () => {
        console.log(`EventSource failed, disconnecting`);
        evtSource.close();
    };

    evtSource.addEventListener('close', () => evtSource.close());

    return evtSource;
};

const postEmail = async (emailSubscribe: emailSubscribe): Promise<any> => instance.post(`/emails`, emailSubscribe);
const postBlog = async (blog: ICreateBlog, accessToken?: string): Promise<IBlog> =>
    instance.post(`/blog/posts`, blog, getConfig(accessToken));

const getBlogById = async (blogId: string, accessToken?: string): Promise<IBlog> =>
    instance.get(`/blog/posts/${blogId}`, getConfig(accessToken));

const getMyAccount = async (accessToken?: string): Promise<Account> => instance.get(`accounts/me`, getConfig(accessToken));

const updateAccount = async (account: IUpdateAccount, accessToken?: string): Promise<User> =>
    instance.patch(`/accounts/me`, account, getConfig(accessToken));

const getOrganization = async (accessToken?: string): Promise<Organization> => instance.get(`/organizations/me`, getConfig(accessToken));

const getMembers = async (pagination: Record<string, unknown>, accessToken?: string): Promise<User[]> =>
    instance.get(`/organizations/me/members`, {
        ...getConfig(accessToken),
        params: {
            ...pagination,
        },
    });

const postInvitation = async (invitation: Invitation, accessToken?: string): Promise<void> =>
    instance.post(`/organizations/me/invitations`, { invites: [invitation] }, getConfig(accessToken));

const updateMember = async (permissions: string[], memberId: string, accessToken?: string): Promise<User> =>
    instance.patch(`/organizations/me/members/${memberId}/permissions`, { permissions }, getConfig(accessToken));

const deleteMember = async (memberId: string, accessToken?: string): Promise<void> =>
    instance.delete(`/organizations/me/members/${memberId}`, getConfig(accessToken));

const getMemberById = async (memberId: string, accessToken?: string): Promise<User & { permissions: string[] }> =>
    instance.get(`/organizations/me/members/${memberId}`, getConfig(accessToken));

const merovService = {
    api: {
        getProducts,
        getProductById,
        getReviews,
        getRelatedProducts,
        getFeaturedProducts,
        getUserById,
        getAccountByName,
        getOfferById,
        getPrice,
        getCategories,
        postContact,
        postEmail,
    },
    secureApi: (accessToken?: string) => ({
        getMyUser: () => getMyUser(accessToken),
        updateUser: (user: IUpdateUser) => updateUser(user, accessToken),
        changePassword: (password: string) => changePassword(password, accessToken),
        sendVerificationEmail: () => sendVerificationEmail(accessToken),
        getMyWallets: () => getMyWallets(accessToken),
        postWallet: (wallet: ICreateWallet, accessToken?: string) => postWallet(wallet, accessToken),
        deleteWallet: (walletId: string) => deleteWallet(walletId, accessToken),
        getAddresses: () => getAddresses(accessToken),
        updateAddress: (addressId: string, address: Partial<DeliveryAddress>) => updateAddress(addressId, address, accessToken),
        deleteAddress: (addressId: string) => deleteAddress(addressId, accessToken),
        getDocumentVerificationUrl: (request?: SardineDocumentVerifyRequest) => getDocumentVerificationUrl(request, accessToken),
        postAddress: (address: Partial<DeliveryAddress>) => postAddress(address, accessToken),
        postOffer: (offer: ICreateOffer) => postOffer(offer, accessToken),
        deleteOffer: (offerId: string) => deleteOffer(offerId),
        getMyProducts: (params: PageQuery & ProductFilters) => getMyProducts(params, accessToken),
        getMyReviews: () => getMyReviews(accessToken),
        postProduct: (product: ICreateProduct) => postProduct(product, accessToken),
        updateProduct: (productId: string, product: IUpdateProduct) => updateProduct(productId, product, accessToken),
        deleteProduct: (productId: string) => deleteProduct(productId, accessToken),
        updateOrder: (orderId: string, order: IUpdateOrder) => updateOrder(orderId, order, accessToken),
        postOrder: (order: ICreateOrder) => postOrder(order, accessToken),
        postOrderOffer: (order: ICreateOrderOffer) => postOrderOffer(order, accessToken),
        getOrderById: (orderId: string) => getOrderById(orderId, accessToken),
        getMyOrders: (pagination: Record<string, unknown> = {}) => getMyOrders(pagination, accessToken),
        getTotalValueTransactedThisMonth: () => getTotalValueTransactedThisMonth(accessToken),
        getMyActiveOrders: (pagination: Record<string, unknown>) => getActiveMyOrders(pagination, accessToken),
        getMyCompletedOrders: (pagination: Record<string, unknown>) => getCompletedOrders(pagination, accessToken),
        getMyActiveOffers: (pagination: Record<string, unknown> = {}) => getMyActiveOffers(pagination, accessToken),
        getMyExpiredOffers: (pagination: Record<string, unknown> = {}) => getMyExpiredOffers(pagination, accessToken),
        postReview: (review: Review, orderId: string) => postReview(review, orderId, accessToken),
        getOrderReviews: (userId: string) => getOrderReviews(userId, accessToken),
        postCreateProductChat: (productId: string) => createProductChat(productId, accessToken),
        getChatById: (chatId: string) => getChatById(chatId, accessToken),
        getChats: () => getChats(accessToken),
        postImage: (image: FormData) => postImage(image, accessToken),
        getNotifications: () => getNotifications(accessToken),
        getNoticationsUnread: () => getNoticationsUnread(accessToken),
        setNotificationAsRead: (notificationId: string) => setNotificationAsRead(notificationId, accessToken),
        listenEvents: (userId: string, action: (data: any) => void) => listenEvents(userId, action),
        getProductById: (productId: string) => getMyProductById(productId, accessToken),
        getBrands: (pagination: Record<string, unknown> = {}) => getBrands(pagination, accessToken),
        getModels: (pagination: Record<string, unknown> = {}) => getModels(pagination, accessToken),
        postPhoneVerifyStart: () => postPhoneVerifyStart(accessToken),
        postPhoneVerifyFinish: (otp: string) => postPhoneVerifyFinish(otp, accessToken),
        postBlog: (blog: ICreateBlog) => postBlog(blog, accessToken),
        getBlogById: (blogId: string) => getBlogById(blogId, accessToken),
        getMyAccount: () => getMyAccount(accessToken),
        updateAccount: (account: IUpdateAccount) => updateAccount(account, accessToken),
        getOrganization: () => getOrganization(accessToken),
        getMembers: (pagination: Record<string, unknown> = {}) => getMembers(pagination, accessToken),
        postInvitation: (invitation: Invitation) => postInvitation(invitation, accessToken),
        updateMember: (permissions: string[], memberId: string) => updateMember(permissions, memberId, accessToken),
        deleteMember: (memberId: string) => deleteMember(memberId, accessToken), 
        getMemberById: (memberId: string) => getMemberById(memberId, accessToken),
    }),
};

export default merovService;
