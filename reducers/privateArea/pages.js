import { PAGE_STATUSES } from 'constants/pages';

const initialState = {
    readyStatus: PAGE_STATUSES.invalid,
    analyticsData: {},
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PAGE_REQUESTING':
        return {
            ...state,
            readyStatus: PAGE_STATUSES.requesting,
        };

    case 'PAGE_FAILURE':
        return {
            ...state,
            readyStatus: PAGE_STATUSES.failed,
            error: action.err,
        };

    case 'PAGE_SUCCESS':
        return {
            ...state,
            readyStatus: PAGE_STATUSES.success,
        };

    case 'SET_PAGE_ANALYTICS':
        return {
            ...state,
            analyticsData: action.analyticsData,
        };

    default:
        return state;
    }
};
