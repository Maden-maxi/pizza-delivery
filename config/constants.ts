import { join } from 'path'

export const PATH_TO_HTTPS_KEY = join(__dirname, '/../https/key.pem');
export const PATH_TO_HTTPS_CERT = join(__dirname, '/../https/cert.pem');
export const RANDOM_STRING_COUNT = 20;
export const ROOT_DIR = join(__dirname, '../');

export const MENU_ITEMS = [
    {id: 1, name: 'Napoli', price: 1000, currency: 'EUR'},
    {id: 2, name: 'Mozzarella', price: 1500, currency: 'EUR'},
    {id: 3, name: 'Pasta', price: 3000, currency: 'EUR'},
];

export const CURRENCIES = [
    {code: 'usd', sign: '$'},
    {code: 'eur', sign: '€'},
    {code: 'btc', sign: '₿'}
];

export const TEMPLATE_GLOBALS = {
    baseUrl: '/',
    siteName: 'Pizza Delivery',
    menu: [
        {url: '/', title: 'Home', visibility: ['all']},
        {url: '/sign-up', title: 'Sign Up', visibility: ['guest']},
        {url: '/login', title: 'Login', visibility: ['guest']},
        {url: '/account', title: 'Account Settings', visibility: ['seller', 'buyer']},
        {url: '/create-product', title: 'Create Product', visibility: ['seller']},
        {url: '/logout', title: 'Logout', visibility: ['seller', 'buyer', 'logout']}
    ]
};