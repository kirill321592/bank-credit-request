import { scriptsLoader } from 'core-front';

const PAYLANDS_$ = 'https://ws-paylands.paynopain.com/js/v1-iframe.js';
let SERVICE_CODE = 'F7D15E97-D468-4950-B25A-D10A7D7B6CC5';

export const paylandsProcessor = {};

export const checkCardByPaylands = dispatch => {
    window.paylands.storeSourceCard(true, SERVICE_CODE);

    dispatch({ type: 'PAYLANDS_SUBMITTING' });
};

const initPaylands = data => {
    const wrapperId = 'payment';
    const { token, serviceCode, card } = data;

    if (process.env.REACT_APP_ENV !== 'prod') {
        window.paylands.setMode('sandbox');
    }

    window.paylands.initializate(token, wrapperId);

    SERVICE_CODE = serviceCode;

    return { type: 'PAYLANDS_INITIATED', data: card ? 'EXIST_CARD' : 'NEW_CARD' };
};

export const load = callBack => () =>
    scriptsLoader.loadScript(PAYLANDS_$).then(callBack);

export const init = data => dispatch => {
    if (window.paylands) {
        dispatch(initPaylands(data));
    } else {
        window.addEventListener('paylandsLoaded', function () {
            dispatch(initPaylands(data));
        });
    }
};

export const toggleCardType = e => dispatch => {
    dispatch({ type: 'PAYLANDS_CARD_TYPE_TOGGLE', data: e.target.value });
};

export const toggleCardView = e => dispatch => {
    dispatch({ type: 'PAYLANDS_CARD_VIEW_TOGGLE', data: e.target.checked });
};

export const onCardSuccess = e => dispatch => {
    dispatch({ type: 'PAYLANDS_VERIFIED', data: e.data });
};

export const onCardError = e => () =>  {
    if (e.data && !e.data.valid) {
        paylandsProcessor.reject({
            paylands: {
                paylands: 'error.direct_debit.invalid'
            }
        });
    }
};

export const asyncValidateCard = (values, dispatch, { widget }) => {
    const paylandsPromise = new Promise((resolve, reject) => {
        paylandsProcessor.resolve = resolve;
        paylandsProcessor.reject = reject;
    });

    if (widget.cardSkip || widget.cardType === 'EXIST_CARD') {
        paylandsProcessor.resolve();
    } else {
        checkCardByPaylands(dispatch);
    }

    return paylandsPromise;
};

export const onSubmitFailCard = (errors, dispatch) => {
    if (errors && errors.paylands) {
        dispatch({ type: 'PAYLANDS_UNVERIFIED' });
        switch (errors.paylands.paylands) {
        case 'error.direct_debit.blocked':
            dispatch({ type: 'PAYLANDS_CARD_BLOCKED' });
            break;
        case 'error.direct_debit.invalid':
            dispatch({ type: 'PAYLANDS_ERROR' });
            break;
        default:
            break;
        }
    }
};