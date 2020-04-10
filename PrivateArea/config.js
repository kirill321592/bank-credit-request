import { React } from 'core-front/libs';

import { PAGE_LAYOUT_TYPES } from '../constants/pages';

const AsyncLogin = React.lazy(() => import('./Authorization/Login'));
const AsyncLoginViaEmail = React.lazy(() => import('./Authorization/LoginViaEmail'));
const AsyncPasswordRecovery = React.lazy(() => import('./Authorization/PasswordRecovery'));
const AsyncHistory = React.lazy(() => import('./History'));
const AsyncCards = React.lazy(() => import('./Cards'));
const AsyncAddCard = React.lazy(() => import('./Cards/AddCard'));
const AsyncBonus = React.lazy(() => import('./Bonus'));
const AsyncBonusPay = React.lazy(() => import('./Bonus/Pay'));
const AsyncBonusLevels = React.lazy(() => import('./Bonus/Levels'));
const AsyncBonusHistory = React.lazy(() => import('./Bonus/History'));
const AsyncBonusLevelUp = React.lazy(() => import('./Bonus/LevelUp'));
const AsyncProlongation = React.lazy(() => import('./Prolongation'));
const AsyncProlongationPay = React.lazy(() => import('./Prolongation/Pay'));
const AsyncProlongationBonusPay = React.lazy(() => import('./Prolongation/BonusPay'));
const AsyncContacts = React.lazy(() => import('./Contacts'));
const AsyncLoan = React.lazy(() => import('./Loan'));
const AsyncSettings = React.lazy(() => import('./Settings'));
const AsyncFAQ = React.lazy(() => import('./FAQ'));
const AsyncLoanPay = React.lazy(() => import('./Loan/Pay'));
const AsyncPersonalSettings = React.lazy(() => import('./Settings/Personal'));
const AsyncEmploymentSettings = React.lazy(() => import('./Settings/Employment'));
const AsyncPasswordSettings = React.lazy(() => import('./Settings/Password'));

const defaultAuthorizationPageOptions = {
    layoutType: PAGE_LAYOUT_TYPES.base,
    layoutSettings: {
        withWave: true,
        showLogos: true,
    },
    isAvailableForUnauthorizedUsers: true,
    shouldRequestLoanDetailInfo: false,
};

const defaultPageOptions = {
    layoutType: PAGE_LAYOUT_TYPES.twoColumn,
    layoutSettings: {
        showHeader: true,
        withWave: false,
        showLogos: false,
    },
    isAvailableForUnauthorizedUsers: false,
    shouldRequestLoanDetailInfo: true,
};

export const LOGIN_PAGE = {
    url: '/login',
    name: 'LOGIN',
    component: <AsyncLogin />,
    analytics: {
        pageUrl: '/secure/login',
    },
    options: defaultAuthorizationPageOptions,
    GTM_FRAGMENT: '/secure/login',
};

export const LOGIN_VIA_EMAIL_PAGE = {
    url: '/login-password',
    name: 'LOGIN_VIA_EMAIL',
    component: <AsyncLoginViaEmail />,
    analytics: {
        pageUrl: '/secure/login-password',
    },
    options: defaultAuthorizationPageOptions,
    GTM_FRAGMENT: '/login-password',
};

export const PASSWORD_RECOVERY_PAGE = {
    url: '/password-recovery',
    name: 'PASSWORD_RECOVERY_PAGE',
    component: <AsyncPasswordRecovery />,
    analytics: {
        pageUrl: '/secure/password-recovery',
    },
    options: defaultAuthorizationPageOptions,
    GTM_FRAGMENT: '/password-recovery',
};

export const LOAN_DETAILS_PAGE = {
    url: '/loan-detail',
    component: <AsyncLoan />,
    name: 'LOAN_DETAIL',
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.loanDetail,
        shouldRequestLoanDetailInfo: false,
    },
    GTM_FRAGMENT: '/loan-detail',
};
export const LOAN_DETAILS_PAY_PAGE = {
    url: '/loan-detail/pay',
    component: <AsyncLoanPay />,
    name: 'LOAN_DETAILS_PAY_PAGE',
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.loanDetail,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/loan/pay?payment=NEXT_PAYMENT',
    },

};
export const PROLONGATION_PAGE = {
    url: '/prolongation',
    component: <AsyncProlongation />,
    name: 'PROLONGATION_PAGE',
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.base,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/prolongation',
    },
};

export const PROLONGATION_PAY = {
    url: '/prolongation/pay',
    component: <AsyncProlongationPay />,
    name: 'PROLONGATION_PAY',
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/prolongation/pay',
    },
};
export const PROLONGATION_BONUS_PAY = {
    url: '/prolongation/bonus-pay',
    component: <AsyncProlongationBonusPay />,
    name: 'PROLONGATION_BONUS_PAY',
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/prolongation/bonus-pay',
    },
};
export const LOAN_HISTORY = {
    url: '/loan-history',
    component: <AsyncHistory />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn,
        shouldRequestLoanDetailInfo: false
    },
    analytics: {
        pageUrl: '/secure/loan/history',
    },
    name: 'LOAN_HISTORY',
};

export const LOAN_BONUS = {
    url: '/loan-bonus',
    component: <AsyncBonus />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn,
        shouldRequestLoanDetailInfo: false,
    },
    name: 'LOAN_BONUS',
};

export const CARDS = {
    url: '/cards',
    name: 'CARDS',
    component: <AsyncCards />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn
    },
    title: 'Mis tarjetas',
    analytics: {
        pageUrl: '/secure/cards',
    }
};

export const ADD_CARD = {
    url: '/cards/add',
    name: 'ADD_CARD',
    component: <AsyncAddCard />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn
    },
    analytics: {
        pageUrl: '/secure/card-new',
    }
};
export const LOAN_BONUS_PAY = {
    url: '/loan-bonus/pay',
    name: 'LOAN_BONUS_PAY',
    component: <AsyncBonusPay />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn
    },
    analytics: {
        pageUrl: '/secure/bonus/pay',
    }
};
export const LOAN_BONUS_LEVELS = {
    url: '/loan-bonus/levels',
    name: 'LOAN_BONUS_LEVELS',
    component: <AsyncBonusLevels />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.base
    },
    analytics: {
        pageUrl: '/secure/bonus/levels',
    }
};
export const LOAN_BONUS_HISTORY = {
    url: '/loan-bonus/history',
    name: 'LOAN_BONUS_HISTORY',
    component: <AsyncBonusHistory />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn
    },
    analytics: {
        pageUrl: '/secure/bonus/history',
    }
};
export const LOAN_BONUS_LEVEL_UP = {
    url: '/loan-bonus/level-up',
    name: 'LOAN_BONUS_LEVEL_UP',
    component: <AsyncBonusLevelUp />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.twoColumn
    },
    analytics: {
        pageUrl: '/secure/bonus/level-up',
    }
};

export const CONTACTS = {
    url: '/contacts',
    name: 'CONTACTS',
    component: <AsyncContacts />,
    options: {
        ...defaultPageOptions,
        layoutType: PAGE_LAYOUT_TYPES.base,
        shouldRequestLoanDetailInfo: false,
    },
    title: 'Contacta con nosotros',
    analytics: {
        pageUrl: '/secure/contacts',
    }
};

export const SETTINGS = {
    url: '/settings',
    name: 'SETTINGS',
    component: <AsyncSettings />,
    options: {
        ...defaultPageOptions,
        shouldRequestLoanDetailInfo: false,
    },
    title: 'Ajustes',
    analytics: {
        pageUrl: '/secure/settings',
    }
};

export const FAQ = {
    url: '/faq',
    name: 'FAQ',
    component: <AsyncFAQ />,
    options: {
        ...defaultPageOptions,
        shouldRequestLoanDetailInfo: false,
        layoutType: PAGE_LAYOUT_TYPES.base
    },
    analytics: {
        pageUrl: '/secure/faq',
    }
};

export const PERSONAL_SETTINGS = {
    url: '/settings/personal',
    name: 'PERSONAL_SETTINGS',
    component: <AsyncPersonalSettings />,
    options: {
        ...defaultPageOptions,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/settings/personal',
    }
};

export const EMPLOYMENT_SETTINGS = {
    url: '/settings/direccion',
    name: 'EMPLOYMENT_SETTINGS',
    component: <AsyncEmploymentSettings />,
    options: {
        ...defaultPageOptions,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/settings/direccion',
    }
};

export const PASSWORD_SETTINGS = {
    url: '/settings/change-password',
    name: 'PASSWORD_SETTINGS',
    component: <AsyncPasswordSettings />,
    options: {
        ...defaultPageOptions,
        shouldRequestLoanDetailInfo: false,
    },
    analytics: {
        pageUrl: '/secure/settings/change-password',
    }
};
