const initialState = {
    widgetStatus: 'PAYLANDS_WAITING',
    errorMessage: null,
    paylands: {},
    verified: false,
    cardType: 'NEW_CARD',
    cardSkip: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PAYLANDS_INITIATED':
        return {
            ...state,
            widgetStatus: action.type,
            cardType: action.data
        };
    case 'PAYLANDS_ERROR':
        return {
            ...state,
            errorMessage: 'Los datos introducidos son incorrectos, por favor inténtalo de nuevo',
            widgetStatus: action.type
        };
    case 'PAYLANDS_VERIFIED':
        return {
            ...state,
            widgetStatus: action.type,
            verified: true,
            paylands: action.data
        };
    case 'PAYLANDS_UNVERIFIED':
        return {
            ...state,
            verified: false
        };
    case 'PAYLANDS_CARD_BLOCKED':
        return {
            ...state,
            errorMessage: 'La tarjeta no es válida. Prueba a añadir otra',
            widgetStatus: action.type
        };
    case 'PAYLANDS_CARD_TYPE_TOGGLE':
        return {
            ...state,
            cardType: action.data
        };
    case 'PAYLANDS_CARD_VIEW_TOGGLE':
        return {
            ...state,
            cardSkip: action.data
        };
    case 'PAYLANDS_SUBMITTING':
        return {
            ...state,
            widgetStatus: action.type
        };
    default:
        return state;
    }
};