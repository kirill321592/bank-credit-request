import { api } from 'core-front';
import { API } from '../api';

export const sendIovation = data => async dispatch => {
    dispatch({ type: 'SEND_IOVATION_REQUESTING' });

    try {
        const res = await fetch(API.SEND_IOVATION, {
            ...api.headers.post,
            body: JSON.stringify({ blackbox: data })
        });
        const response = await res.json();

        response && dispatch({ type: 'SEND_IOVATION_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'SEND_IOVATION_FAILURE', err });
    }
};
