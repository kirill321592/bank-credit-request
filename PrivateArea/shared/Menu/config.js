import * as PA_PAGES from 'PrivateArea/config';

export default [
    {
        id: 'loan-details',
        name: 'Mi préstamo',
        url: PA_PAGES.LOAN_DETAILS_PAGE.url,
    },
    {
        id: 'history',
        name: 'Historial',
        url: PA_PAGES.LOAN_HISTORY.url,
    },
    {
        id: 'bonus',
        name: 'Mis puntos',
        url: PA_PAGES.LOAN_BONUS.url,
    },
    {
        id: 'cards',
        name: 'Mis tarjetas',
        url: PA_PAGES.CARDS.url,
    },
    {
        id: 'faq',
        name: 'FAQs',
        url: PA_PAGES.FAQ.url,
    },
    {
        id: 'settings',
        name: 'Ajustes',
        url: PA_PAGES.SETTINGS.url,
    },
    {
        id: 'contacts',
        name: 'Contacto',
        url: PA_PAGES.CONTACTS.url,
        isHiddenOnDesktop: true,
    },
];
