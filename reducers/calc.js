const initialState = {
    readyStatus: 'CALC_INVALID',
    initialProduct: {},
    savedProduct: {},
    config: {},
    offer: null,
    isOpen: false,
    messages: [],
    insurance: false,
    insuranceType: 'NONE'
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'CALCULATOR_FIND_PRODUCTS_SUCCESS':
        return {
            ...state,
            ...action.data,
            readyStatus: action.type,
            savedProduct: action.data.initialProduct
        };
    case 'CALCULATED':
        return {
            ...state,
            readyStatus: action.type,
            config: action.data.config
        };
    case 'CALCULATOR_OFFER_SUCCESS':
        return {
            ...state,
            readyStatus: action.type,
            offer: action.data.offer
        };
    case 'CALCULATOR_UPDATE_INSURANCE':
        return {
            ...state,
            insurance: action.insurance,
            insuranceType: action.insuranceType
        };
    case 'CALCULATOR_SET_SAVED_VALUES':
        return {
            ...state,
            readyStatus: action.type,
            savedProduct: action.data
        };
    case 'RELOAD_CALCULATOR':
        return {
            ...state,
            readyStatus: action.type
        };
    case 'RESET_CALCULATOR':
        return {
            ...initialState,
            readyStatus: action.type
        };
    case 'SET_CALCULATOR_VIEW_STATUS':
        return {
            ...state,
            isOpen: !state.isOpen,
            readyStatus: action.type
        };
    default:
        return state;
    }
};