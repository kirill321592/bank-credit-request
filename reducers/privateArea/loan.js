const initialState = {
    loanPayInfo: {},
    iframeUrl: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_LOAN_PAY_INFO':
        return {
            ...state,
            loanPayInfo: action.data
        };
    case 'PA_SET_LOAN_IFRAME_URL':
        return {
            ...state,
            iframeUrl: action.data
        };
    case 'CHANGE_LOAN_AMOUNT': {
        const loanPayInfo = { ...state.loanPayInfo };

        loanPayInfo.amount = action.amount;

        return {
            ...state,
            loanPayInfo
        };
    }
    default:
        return state;
    }
};

