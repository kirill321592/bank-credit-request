import { PRIVATE_AREA_API } from 'api';
import { notify } from 'core-front/api';
import { sendGetRequest } from 'helpers/request';
import { USER_CREDIT_STATUSES } from 'constants/users';

export const setUserAuthorized = () => ({
    type: 'PA_USER_AUTHORIZED',
});

export const setUserUnauthorized = () => ({
    type: 'PA_USER_UNAUTHORIZED',
});

export const setCreditStatus = creditStatus => ({
    type: 'PA_USER_CREDIT_STATUS',
    creditStatus,
});

export const setDocList = () => async dispatch => {
    try {
        const { data: { fileTypes }} = await sendGetRequest(PRIVATE_AREA_API.DOC_LIST);

        dispatch({ type: 'PA_SET_DOC_LIST', fileTypes });
    } catch (e) {
        notify(e);
    }
};

export const setLoanDetails = () => async dispatch => {
    try {
        await sendGetRequest(PRIVATE_AREA_API.LOAN_DETAIL_LIST);

        const { data } = sendGetRequest(PRIVATE_AREA_API.LOAN_DETAIL_READ);

        if (!data.creditStatus) {
            const status = (data.requestEnabled ? USER_CREDIT_STATUSES.noActive : USER_CREDIT_STATUSES.blocked);

            data.creditStatus = status;
        }

        dispatch({ type: 'PA_SET_LOAN_DETAILS', loanDetails: data });
    } catch (err) {
        notify(err);
    }
};

export const setPreCredit = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.PRE_CREDIT_STATUS);

        dispatch({ type: 'PA_SET_PRE_CREDIT', data });
    } catch (e) {
        notify(e);
    }
};

export const setUserProfile = () => async dispatch => {
    try {
        const { data } = await sendGetRequest(PRIVATE_AREA_API.PROFILE);
        const { data: personalData } = await sendGetRequest(PRIVATE_AREA_API.PROFILE_PERSONAL);
        const { data: addressData } = await sendGetRequest(PRIVATE_AREA_API.PROFILE_ADDRESS);
        const { data: employmentData } = await sendGetRequest(PRIVATE_AREA_API.PROFILE_EMPLOYMENT);

        let employmentOptions = {};

        if (employmentData.employmentValues) {
            const options = Object.keys(employmentData.employmentValues).map(key => ({
                label: employmentData.employmentValues[key],
                value: key,
            }));

            employmentOptions = {
                values: options,
            };
        }

        const userProfile = {
            main: {
                ...data,
                ...addressData,
                employment: data.employment.value,
            },
            personal: personalData,
            employmentOptions,
        };

        dispatch({ type: 'PA_USER_PROFILE', profile: userProfile });
    } catch (e) {
        notify(e);
    }
};
