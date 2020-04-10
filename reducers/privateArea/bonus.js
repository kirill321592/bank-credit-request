const initialState = {
    history: [],
    bonusError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_LOAN_BONUS_HISTORY':
        return {
            ...state,
            history: action.data.bonuses
        };
    case 'LOAN_BONUS_ERROR':
        return {
            ...state,
            bonusError: action.e
        };
    default:
        return state;
    }
};
