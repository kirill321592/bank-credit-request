const initialState = {
    boletoLinks: [],
    err: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'BOLETO_DEFAULT':
        return {
            ...state,
            boletoLinks: action.data
        };
    case 'BOLETO_SUCCESS':
        return {
            ...state,
            boletoLinks: action.data
        };
    default:
        return state;
    }
};
