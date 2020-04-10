const initialState = {
    status: 'INVALID',
    userData: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'USER_SESSION_EXPIRED':
        return {
            ...state,
            status: 'USER_SESSION_EXPIRED',
        };

    case 'USER_SUCCESS':
        return {
            ...state,
            userData: action.data,
        };

    default:
        return state;
    }
};
