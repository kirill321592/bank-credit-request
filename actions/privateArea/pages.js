import { notify } from 'core-front/api';
import { api } from 'core-front';

import { PRIVATE_AREA_API } from 'api';

import { setUserAuthorized, setUserUnauthorized } from 'actions/privateArea/user';

import { HTTP_RESPONSE_STATUSES } from 'constants/pages';

import { LOGIN_PAGE, LOAN_DETAILS_PAGE } from 'PrivateArea/config';

export const fetchNextPage = (history, isAvailableForUnauthorizedUsers = false) => async dispatch => {
    dispatch({ type: 'PAGE_REQUESTING' });

    try {
        const res = await fetch(`${PRIVATE_AREA_API.PAGE}`, api.headers.post);

        const { status, url, exception } = await res.json();

        if (exception) {
            dispatch({ type: 'MAIN_PAGE_ERROR' });

            return;
        }

        const shouldRedirectUser = ((status === HTTP_RESPONSE_STATUSES.redirect) && url);
        const isUserAuthorized = (shouldRedirectUser && (url === LOAN_DETAILS_PAGE.url));
        const setUserStatus = (isUserAuthorized ? setUserAuthorized : setUserUnauthorized);

        dispatch(setUserStatus());

        if (shouldRedirectUser && (url !== history.location.pathname)) {
            url.includes('/registration') && history.push('/registration');
        }

        if (isUserAuthorized || isAvailableForUnauthorizedUsers) {
            dispatch({ type: 'PAGE_SUCCESS' });

            return;
        }

        history.push(LOGIN_PAGE.url);
    } catch (err) {
        notify(err);
    }
};
