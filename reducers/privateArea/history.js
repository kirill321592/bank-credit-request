const initialState = {
    historyItems: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_LOAN_HISTORY_ITEMS':
        return {
            ...state,
            historyItems: action.result
        };

    default:
        return state;
    }
};
