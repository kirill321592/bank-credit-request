import { USER_CREDIT_STATUSES, USER_STATUSES } from 'constants/users';
import { prepareDate } from 'helpers/prepareDate';

const initialState = {
    isAuthenticated: false,
    status: USER_STATUSES.unauthorized,
    creditStatus: USER_CREDIT_STATUSES.loading,
    fileTypes: [],
    loanDetails: {},
    preCredit: {},
    profile: {},
    isProfileDataLoaded: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PA_USER_AUTHORIZED':
        return {
            ...state,
            isAuthenticated: true,
            status: USER_STATUSES.authorized,
        };

    case 'PA_USER_UNAUTHORIZED':
        return {
            ...state,
            isAuthenticated: false,
            status: USER_STATUSES.unauthorized,
        };

    case 'PA_USER_CREDIT_STATUS':
        return {
            ...state,
            creditStatus: action.creditStatus,
        };
    case 'PA_SET_DOC_LIST':
        return {
            ...state,
            fileTypes: action.fileTypes,
        };

    case 'PA_SET_LOAN_DETAILS':
        return {
            ...state,
            loanDetails: action.loanDetails,
        };
    case 'PA_SET_PRE_CREDIT':
        return {
            ...state,
            preCredit: prepareDate(action.data),
        };

    case 'PA_USER_PROFILE':
        return {
            ...state,
            isProfileDataLoaded: true,
            profile: action.profile,
        };

    default:
        return state;
    }
};
