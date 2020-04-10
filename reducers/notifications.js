const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_NOTIFICATION':
        return {
            ...state,
            list: [action.data]
        };
    case 'CLEAR_NOTIFICATIONS':
        return {
            ...state,
            list: []
        };
    default:
        return state;
    }
};
