const initialState = {
    dataBonus: null,
    dataBonusHistory: null,
    dataBonusPercentSpend: null,
    dataBonusRolloverSpend: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'GET_BONUS_SUCCESS':
        return {
            ...state,
            dataBonus: action.data
        };

    case 'GET_BONUS_HISTORY_SUCCESS':
        return {
            ...state,
            dataBonusHistory: action.data
        };

    case 'GET_BONUS_SPEND_SUCCESS':
        return {
            ...state,
            dataBonusPercentSpend: action.data.BONUS_PERCENT_SPEND_WIDGET.response,
            dataBonusRolloverSpend: action.data.BONUS_ROLLOVER_SPEND_WIDGET.response,
        };

    default:
        return state;
    }
};
