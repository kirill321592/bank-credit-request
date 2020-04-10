import { moment } from 'core-front/libs';
import { scriptsLoader, ga } from 'core-front';

import { nextStep } from './step';

const { sendEvent, gaw, setGaPage } = ga;
const { loadScript } = scriptsLoader;

const INSTANTOR_$ = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
const INSTANTOR_LIB = 'https://frame.euc1.instantor.com/instantor-0.7.3.min.js';
const INSTANTOR_USER = 'moneyman-standardproduct-cffa75b6b91e.es';
const GA_CATEGORY = 'SignUp-s5';

const events = [];

export const load = callBack => () =>
    loadScript(INSTANTOR_$)
        .then(() => {
            loadScript(INSTANTOR_LIB).then(callBack);
        });

export const init = data => dispatch => {
    const {
        instantor: {
            environment,
            requestUuid,
            bankUuid
        },
        borrowerId
    } = data;

    try {
        const itor = new window.Instantor(INSTANTOR_USER);
        let initSent = false;

        itor.userParam('environment', environment);
        itor.userParam('request_uid', requestUuid);
        itor.userParam('borrower_id', borrowerId);

        if (bankUuid) itor.set_active_bank(bankUuid);

        itor.load('#itor');

        sendEvent('instantor', 'iframe-init', requestUuid);

        instantorHandleGa(itor);

        itor.listener(response => {
            events.push({
                date: moment().format('YYYY-MM-DDThh:mm:ss'),
                event: response
            });

            sendEvent('instantor', 'end-of-process');

            switch (response) {
            case 'process-finished':
                sendEvent('instantor', 'login-success');

                if (!initSent) {
                    initSent = true;

                    nextStep({ ...data, instantor: {
                        ...data.instantor, events
                    }}, dispatch);
                }

                break;
            case 'process-error':
            case 'invalid-login':
            case 'too-many-retries':
            case 'timed-out':
            case 'server-overloaded':
                sendEvent('instantor', response, requestUuid);

                if ([
                    'server-overloaded',
                    'too-many-retries',
                    'process-error',
                    'timed-out'
                ].includes(response)) {
                    nextStep({ ...data, instantor: {
                        ...data.instantor, events
                    }}, dispatch);
                }

                break;
            default:
                sendEvent('instantor', 'unhandled-error', requestUuid);
            }
        });
    } catch (err) {
        sendEvent('instantor', 'instantor-loading-failed');
        throw new Error(err);
    }
};

const instantorHandleGa = itor => {
    const promiseTimeout3s = window.setTimeout(() => {
        sendEvent(GA_CATEGORY, 'instantor-loading-3s');
    }, 3000);

    const promiseTimeout10s = window.setTimeout(() => {
        sendEvent(GA_CATEGORY, 'instantor-loading-10s');
    }, 10000);

    itor.attachEventListener('load', ({ status }) => {
        window.clearTimeout(promiseTimeout3s);
        window.clearTimeout(promiseTimeout10s);
        sendEvent('send', 'event', 'Instantor', 'load', !!status);
    });

    itor.attachEventListener('error', ({ status }) => {
        sendEvent(GA_CATEGORY, 'instantor-loading-failed');
        sendEvent('Instantor', 'error', status);
    });

    itor.attachEventListener('reload', ({ status }) => {
        sendEvent('Instantor', 'reload', !!status);
    });

    itor.attachEventListener('chooseBank', ({ bankAbbreviation }) => {
        sendEvent('Instantor', 'chooseBank', bankAbbreviation);
    });

    itor.attachEventListener('displayChange', ({ display }) => {
        setGaPage(`/registration/static/step5/${display}`);
        gaw('send', 'pageview');
    });
};
