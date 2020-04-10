const initialState = {
    FAQInfo: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_FAQ_INFO':
        return {
            ...state,
            FAQInfo: action.data
        };
    default:
        return state;
    }
};

