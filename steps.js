import { React } from 'core-front/libs';

import SignUp from './Registration/SignUp';

const AsyncConfirmUser = React.lazy(() => import('./Registration/ConfirmUser'));
const AsyncUserInfo = React.lazy(() => import('./Registration/UserInfo'));
const AsyncEmployment = React.lazy(() => import('./Registration/Employment'));
const AsyncTransferSource = React.lazy(() => import('./Registration/TransferSource'));
const AsyncTransferSourceRecurring = React.lazy(() => import('./Registration/TransferSourceRecurring'));
const AsyncInstantor = React.lazy(() => import('./Registration/Instantor'));
const AsyncInstantorHelpAndModal = React.lazy(() => import('./Registration/Instantor/InstantorHelpAndModal'));
const AsyncDebitCard = React.lazy(() => import('./Registration/DebitCard'));
const AsyncCalculator = React.lazy(() => import('./Registration/Calculator'));
const AsyncScoring = React.lazy(() => import('./Registration/Scoring'));
const AsyncDecision = React.lazy(() => import('./Registration/Decision'));
const AsyncFinpublic = React.lazy(() => import('./Registration/Finpublic'));
const AsyncUploadDocuments = React.lazy(() => import('./Registration/UploadDocuments'));
const AsyncPartialAPIPartners = React.lazy(() => import('./Registration/PartialAPIPartners'));

const DEFAULT_STEP_OPTIONS = {
    FULL_WIDTH: false,
    SHOW_CONTACT: true,
    SHOW_CALC: true,
    SHOW_INFO: false
};

const STEPS = {
    STEP_USER_ACCOUNT: {
        COMPONENT: <SignUp />,
        GTM_FRAGMENT: '/step1',
        GA: {
            STEP: '/secure/registration',
            CATEGORY: 'SignUp-s1'
        },
        CRUMB_STEP: 1,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_CONFIRM_USER: {
        COMPONENT: <AsyncConfirmUser />,
        GTM_FRAGMENT: '/confirm-user',
        GA: {
            STEP: '/secure/registration/sms-confirm',
            CATEGORY: 'SignUp-s2'
        },
        CRUMB_STEP: 1,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_ADDRESS: {
        COMPONENT: <AsyncUserInfo />,
        GTM_FRAGMENT: '/step3',
        GA: {
            STEP: '/secure/registration/step3',
            CATEGORY: 'SignUp-s3'
        },
        CRUMB_STEP: 2,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_EMPLOYMENT: {
        COMPONENT: <AsyncEmployment />,
        GTM_FRAGMENT: '/step4',
        GA: {
            STEP: '/secure/registration/step4',
            CATEGORY: 'SignUp-s4'
        },
        CRUMB_STEP: 3,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_TRANSFER_SOURCE: {
        COMPONENT: <AsyncTransferSource />,
        GTM_FRAGMENT: '/bank',
        GA: {
            STEP: '/secure/registration/step5',
            CATEGORY: 'SignUp-s5'
        },
        CRUMB_STEP: 4,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_TRANSFER_SOURCE_PARTNER: {
        COMPONENT: <AsyncPartialAPIPartners />,
        GTM_FRAGMENT: '/bank',
        GA: {
            STEP: '/secure/registration/step5',
            CATEGORY: 'SignUp-s5'
        },
        CRUMB_STEP: 4,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_TRANSFER_SOURCE_RECURRING: {
        COMPONENT: <AsyncTransferSourceRecurring />,
        GTM_FRAGMENT: '/bank-recurring',
        GA: {
            STEP: '/secure/registration/step5-recurring',
            CATEGORY: 'SignUp-s5-recurring'
        },
        CRUMB_STEP: 4,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_BANK_API: {
        COMPONENT: <AsyncInstantor />,
        GTM_FRAGMENT: '/instantor',
        GA: {
            STEP: '/secure/registration/step6',
            CATEGORY: 'instantor'
        },
        CRUMB_STEP: 5,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            TOP_SIDEBAR_COMPONENT: <AsyncInstantorHelpAndModal />,
            SHOW_INFO: false,
            SHOW_CONTACT: false
        }
    },
    STEP_DIRECT_DEBIT: {
        COMPONENT: <AsyncDebitCard />,
        GTM_FRAGMENT: '/direct-debit',
        GA: {
            STEP: '/secure/registration/step61',
            CATEGORY: 'SignUp-s61'
        },
        CRUMB_STEP: 6,
        OPTIONS: DEFAULT_STEP_OPTIONS
    },
    STEP_CALCULATOR: {
        COMPONENT: <AsyncCalculator />,
        GTM_FRAGMENT: '/calculator',
        GA: {
            STEP: '/secure/registration/step8',
            CATEGORY: 'SignUp-s8'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_CALC: false
        }
    },
    STEP_COUNTER_OFFER: {
        COMPONENT: <AsyncCalculator counterOffer />,
        GTM_FRAGMENT: '/calculator',
        GA: {
            STEP: '/secure/registration/step8',
            CATEGORY: 'SignUp-s8'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_CALC: false
        }
    },
    STEP_CALCULATOR_RECURRING: {
        COMPONENT: <AsyncCalculator recurring />,
        GTM_FRAGMENT: '/calculator',
        GA: {
            STEP: '/secure/registration/step8-merged',
            CATEGORY: 'SignUp-s8-merged'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_CALC: false
        }
    },
    STEP_SCORING: {
        COMPONENT: <AsyncScoring />,
        GTM_FRAGMENT: '/scoring',
        GA: {
            STEP: '/secure/registration/scoring',
            CATEGORY: 'SignUp-s7'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            FULL_WIDTH: true,
            SHOW_CONTACT: false,
            SHOW_CALC: false
        }
    },
    STEP_DECISION: {
        COMPONENT: <AsyncDecision />,
        GTM_FRAGMENT: '/decision',
        GA: {
            STEP: '/secure/registration/decision',
            CATEGORY: 'decision'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_CALC: false
        }
    },
    STEP_UPLOAD_DOCUMENTS: {
        COMPONENT: <AsyncUploadDocuments />,
        GTM_FRAGMENT: '/upload-docs',
        GA: {
            STEP: '/secure/registration/upload-documents',
            CATEGORY: 'doc-upload'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_INFO: true,
            SHOW_CALC: false
        }
    },
    STEP_REJECTED_LEAD: {
        COMPONENT: <AsyncFinpublic />,
        GTM_FRAGMENT: '/decision',
        GA: {
            STEP: '/secure/registration/finpublic',
            CATEGORY: 'finpublic'
        },
        CRUMB_STEP: 7,
        OPTIONS: {
            ...DEFAULT_STEP_OPTIONS,
            SHOW_CALC: false
        }
    }
};

// partners
STEPS.BR_DEFAULT_PARTNER_CONFIRMATION = STEPS.STEP_CONFIRM_USER_ACCOUNT;
STEPS.CONFIRM_SERASA_ECRED_PARTNER = STEPS.STEP_CONFIRM_USER_ACCOUNT;
STEPS.CONFIRM_LENDICO_PARTNER = STEPS.STEP_CONFIRM_USER_ACCOUNT;

// step copies
STEPS.STEP_CONFIRM_OLD_USER_ACCOUNT = STEPS.STEP_CONFIRM_USER_ACCOUNT;
STEPS.CHOOSE_TRANSFER_SOURCE = STEPS.STEP_CHOOSE_TRANSFER_SOURCE;
STEPS.STEP_CALCULATOR_MMBR_6708_A = STEPS.STEP_CALCULATOR;
STEPS.STEP_CALCULATOR_MMBR_6708_B = STEPS.STEP_CALCULATOR;
STEPS.STEP_CALCULATOR_8094 = STEPS.STEP_CALCULATOR;
STEPS.STEP_CREATE_PERSONAL_DATA_8094 = STEPS.STEP_CREATE_PERSONAL_DATA;

STEPS.STEP_CONFIRM_USER_ACCOUNT_8094 = STEPS.CONFIRM_USER_ACCOUNT_8094;

export default STEPS;
