import { notify } from 'core-front/api';
import { PRIVATE_AREA_API } from 'api';
import { sendGetRequest, sendPostRequest } from 'helpers/request';
import { setBonusInfo } from './products';

export const setProlongationInfo = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.PROLONGATION_INFO);

        dispatch({ type: 'PA_SET_PROLONGATION_INFO', data });
    } catch (err) {
        notify(err);
    }
};
export const updateProlongationInfo = rolloverDuration => async dispatch => {
    try {
        const { data } = await sendPostRequest(PRIVATE_AREA_API.UPDATE_PROLONGATION_INFO, { rolloverDuration });

        dispatch({ type: 'PA_SET_PROLONGATION_INFO', data });
    } catch (e) {
        notify(e);
    }
};
export const setProlongationPayInfo = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.PROLONGATION_PAY_INFO);

        dispatch({ type: 'PA_SET_PROLONGATION_PAY_INFO', data });
    } catch (err) {
        notify(err);
    }
};
export const updateProlongationPayInfo = rolloverDuration => async dispatch => {
    try {
        const { data } = await sendPostRequest(PRIVATE_AREA_API.UPDATE_PROLONGATION_INFO, { rolloverDuration });

        dispatch({ type: 'PA_SET_PROLONGATION_PAY_INFO', data });
    } catch (e) {
        notify(e);
    }
};

export const setIframe = params => async dispatch => {
    try {
        const { data: { provider }} = await sendGetRequest(PRIVATE_AREA_API.PROLONGATION_CARD_PROVIDER);

        if (provider) {
            switch (provider) {
            case 'MYMOID': {
                const { data } = await sendPostRequest(PRIVATE_AREA_API.PROLONGATION_IFRAME_URL_MYMOID, params);

                dispatch({ type: 'PA_SET_IFRAME_URL', data });
            }
                break;
            default:
            case 'PAYLANDS': {
                const { data } = await sendPostRequest(PRIVATE_AREA_API.PROLONGATION_IFRAME_URL_PAYLANDS, params);

                dispatch({ type: 'PA_SET_IFRAME_URL', data });
            }
                break;
            }
        }
    } catch (e) {
        notify(e);
    }
};

export const prolongationPayBonus = (value, history) => async dispatch => {
    try {
        await sendPostRequest(PRIVATE_AREA_API.PROLONGATION_BONUS_PAY, { value });
        dispatch(setBonusInfo());
        history.push('/loan-detail');
    } catch (e) {
        notify(e);
    }
};
