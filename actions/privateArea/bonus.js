import { PRIVATE_AREA_API } from 'api';
import { sendPostRequest, sendGetRequest } from 'helpers/request';
import { notify } from 'core-front/api';
import { setBonusInfo, setProducts } from './products';


export const actionPay = (payBonusDebtVal, history) => async dispatch => {
    let val;

    !Array.isArray(payBonusDebtVal) ? val = payBonusDebtVal : val = payBonusDebtVal[0];
    try {
        await sendPostRequest(PRIVATE_AREA_API.LOAN_BONUS_PAY, val);
        dispatch(setBonusInfo());
        history.push('/loan-detail');
    } catch (e) {
        notify(e);
    }
};

export const changeRange = value => ({
    type: 'ONCHANGE_RANGE',
    value,
});
export const changeInput = value => ({
    type: 'ONCHANGE_INPUT',
    value,
});
export const blurInput = value => ({
    type: 'ONBLUR_INPUT',
    value,
});

export const setLoanBonusHistory = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.LOAN_BONUS_HISTORY);

        dispatch({ type: 'SET_LOAN_BONUS_HISTORY', data });
    } catch (e) {
        dispatch({ type: 'LOAN_BONUS_ERROR', e });
    }
};

export const setLevelUp = (id, history) => async dispatch => {
    try {
        await sendPostRequest(PRIVATE_AREA_API.LOAN_BONUS_LEVEL_UP, id);
        dispatch(setBonusInfo());
        dispatch(setProducts());
        history.push('/loan-bonus');
    } catch (e) {
        dispatch({ type: 'LOAN_BONUS_ERROR', e });
    }
};