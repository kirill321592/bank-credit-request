import { PRIVATE_AREA_API } from 'api';
import { sendGetRequest, sendPostRequest } from 'helpers/request';
import { notify } from 'core-front/api';

export const setLoanPayInfo = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.PA_LOAN_PAY_INFO);

        dispatch({ type: 'SET_LOAN_PAY_INFO', data });
    } catch (e) {
        notify(e);
    }
};

export const changeLoanAmount = amount => ({
    type: 'CHANGE_LOAN_AMOUNT',
    amount,
});

export const setIframe = params => async dispatch => {
    try {
        const { data: { provider }} = await sendGetRequest(PRIVATE_AREA_API.PROLONGATION_CARD_PROVIDER);

        if (provider) {
            switch (provider) {
            case 'MYMOID': {
                const { data } = await sendPostRequest(PRIVATE_AREA_API.PA_LOAN_PAY_MYMOID, params);

                dispatch({ type: 'PA_SET_LOAN_IFRAME_URL', data });
            }
                break;
            case 'PAYLANDS': {
                const { data } = await sendPostRequest(PRIVATE_AREA_API.PA_LOAN_PAY_PAYLANDS, params);

                dispatch({ type: 'PA_SET_LOAN_IFRAME_URL', data });
            }
                break;
            default:
                break;
            }
        }
    } catch (e) {
        notify(e);
    }
};