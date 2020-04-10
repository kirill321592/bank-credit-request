const initialState = {
    readyStatus: 'DICTIONARY_INVALID',
    list: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'DICTIONARY_REQUESTING':
        return {
            ...state,
            readyStatus: 'DICTIONARY_REQUESTING'
        };
    case 'DICTIONARY_FAILURE':
        return {
            ...state,
            readyStatus: 'DICTIONARY_FAILURE',
        };
    case 'DICTIONARY_SUCCESS':
        return {
            ...state,
            readyStatus: 'DICTIONARY_SUCCESS',
            list: {
                ...state.list,
                ...action.data
            },
        };
    default:
        return state;
    }
};
