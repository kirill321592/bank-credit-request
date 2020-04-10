import { validateByMailbox } from 'core-front/helpers/mailboxValidator';
import { ga, api } from 'core-front';
import { API } from '../api';

export const confirmMobilePhone = (body = {}) => async dispatch => {
    dispatch({ type: 'CONFIRM_PHONE_REQUESTING' });

    const res = await fetch(API.SEND_SMS, {
        ...api.headers.post,
        body: JSON.stringify(body)
    });

    const { data: { elapsed, blocked }} = await res.json();

    if (blocked) {
        dispatch({ type: 'CONFIRM_PHONE_BLOCKED' });
    } else if (elapsed) {
        dispatch({ type: 'CONFIRM_PHONE_SUCCESS', data: elapsed });
    }
};

export const resetConfirmationTimer = () => ({ type: 'RESET_CONFIRM_TIMER' });

export const asyncValidateEmail = values =>
    validateByMailbox(values.userAccount.email)
        .then(valid => {
            if (!valid) {
                ga.sendEvent('SignUp-s1', 'email-error');

                // eslint-disable-next-line
                throw { userAccount: { email: 'error.not_accepted' }};
            }
        });

export const smsExpired = () => ({ type: 'SMS_EXPIRED' });
