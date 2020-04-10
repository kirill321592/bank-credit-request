import { notify } from 'core-front/api';

import { PRIVATE_AREA_API } from 'api';

import { sendGetRequest } from 'helpers/request';

export const setProducts = () => async dispatch => {
    try {
        const { products } = await sendGetRequest(PRIVATE_AREA_API.PRODUCTS);

        dispatch({ type: 'PA_SET_PRODUCTS', products });
    } catch (err) {
        notify(err);
    }
};

export const setBonusInfo = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.BONUS);

        dispatch({ type: 'PA_SET_BONUS_INFO', bonusInfo: data });
    } catch (err) {
        notify(err);
    }
};

export const checkLevelUp = history => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.BONUS);

        if (!(data.newProducts[0])) {
            history.push('/loan-bonus');
        }
        else {
            dispatch({ type: 'PA_SET_BONUS_INFO', bonusInfo: data });
        }
    } catch (err) {
        notify(err);
    }
};