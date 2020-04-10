import { PRIVATE_AREA_API } from 'api';
import { sendGetRequest } from 'helpers/request';
import { notify } from 'core-front/api';
export const setFAQInfo = () => async dispatch => {
    try {
        const data = await sendGetRequest(PRIVATE_AREA_API.PA_FAQ_INFO);

        dispatch({ type: 'SET_FAQ_INFO', data });
    } catch (e) {
        notify(e);
    }
};