const initialState = {
    readyStatus: 'FLOW_INVALID',
    flow: null,
    step: null,
    err: null
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'FLOW_REQUESTING':
        return {
            ...state,
            readyStatus: 'FLOW_REQUESTING'
        };
    case 'FLOW_FAILURE':
        return {
            ...state,
            readyStatus: 'FLOW_FAILURE',
            err: action.err
        };
    case 'FLOW_SUCCESS':
        return {
            ...state,
            readyStatus: 'FLOW_SUCCESS',
            step: action.data.name,
            flow: action.data.flow
        };
    default:
        return state;
    }
};
