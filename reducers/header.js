const initialState = {
    height: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HEADER_RECTANGLE':
            return {
                ...state,
                height: action.height
            };
        default:
            return state;
    }
};