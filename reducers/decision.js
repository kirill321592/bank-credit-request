const initialState = {
    status: 'INVALID'
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'DECISION_FINISH_REQUESTING':
        return {
            ...state,
            status: 'DECISION_FINISH_REQUESTING'
        };
    case 'DECISION_FINISH_SUCCESS':
        return {
            ...state,
            status: 'DECISION_FINISH_SUCCESS'
        };
    case 'DECISION_FINISH_FAILURE':
        return {
            ...state,
            status: 'DECISION_FINISH_FAILURE'
        };

    case 'DECISION_CONFIRM_REQUESTING':
        return {
            ...state,
            status: 'DECISION_CONFIRM_REQUESTING'
        };
    case 'DECISION_CONFIRM_SUCCESS':
        return {
            ...state,
            status: 'DECISION_CONFIRM_SUCCESS'
        };
    case 'DECISION_CONFIRM_FAILURE':
        return {
            ...state,
            status: 'DECISION_CONFIRM_FAILURE'
        };
    default:
        return state;
    }
};
