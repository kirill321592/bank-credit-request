import { api, ga } from 'core-front';
import { fetchStatusHandler } from 'core-front/api';

import { PRIVATE_AREA_API } from 'api';

import { setUserAuthorized } from 'actions/privateArea/user';

import { HTTP_RESPONSE_STATUSES } from 'constants/pages';

import { setFormErrors } from 'helpers/setErrors';

export const setSmsTimer = elapsedTime => ({
    type: 'PA_USER_EXISTENCE_CONFIRMED',
    elapsedTime,
});

export const resetSmsTimer = () => ({ type: 'PA_RESET_SMS_TIMER' });

export const smsExpired = () => ({ type: 'PA_SMS_EXPIRED' });

const handleResponse = (response, dispatch, history) => {
    const { status, url, exception, data } = response;

    let fieldName;
    let fieldValue;

    if (data && data.field) {
        fieldName = Object.keys(data.field)[0];
        fieldValue = data.field[fieldName];
    }

    if (exception) {
        if (fieldName && (typeof fieldValue === 'boolean') && !fieldValue) {
            ga.sendEvent('login', `${fieldName}-not-found`);
        }

        if (exception.password) {
            ga.sendEvent('login', 'wrong-password');
        }

        setFormErrors(exception);

        return;
    }

    if (data && data.time) {
        dispatch(setSmsTimer(data.time));

        return;
    }

    dispatch(setUserAuthorized());

    const shouldRedirectUser = ((status === HTTP_RESPONSE_STATUSES.redirect) && url);

    if (!shouldRedirectUser) {
        return;
    }

    if (fieldName) {
        ga.sendEvent('login', fieldName);
    }

    if (url !== history.location.pathname) {
        history.push(url);
    }
};

const handleLogin = (values = {}, dispatch, history, url) => {
    return fetch(url, {
        ...api.headers.post,
        body: JSON.stringify(values),
    })
        .then(fetchStatusHandler)
        .then(res => res.json())
        .then(res => handleResponse(res, dispatch, history));
};

export const confirmUserExistence = (values = {}, dispatch, history) => {
    return handleLogin(values, dispatch, history, PRIVATE_AREA_API.CONFIRM_USER);
};

export const loginUser = (values = {}, dispatch, history) => {
    return handleLogin(values, dispatch, history, PRIVATE_AREA_API.LOGIN_USER);
};

export const loginUserViaEmail = (values = {}, dispatch, history) => {
    return handleLogin(values, dispatch, history, PRIVATE_AREA_API.LOGIN_USER_VIA_EMAIL);
};

export const resetPassword = (values = {}) => {
    return fetch(PRIVATE_AREA_API.PASSWORD_RECOVERY, {
        ...api.headers.post,
        body: JSON.stringify(values),
    })
        .then(fetchStatusHandler)
        .then(res => res.json())
        .then(({ exception }) => {
            if (exception) {
                setFormErrors(exception);

                return;
            }

            ga.sendEvent('password-recovery', 'successful');
        });
};
