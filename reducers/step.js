import STEPS from '../steps';

const initialState = {
    readyStatus: 'STEP_INVALID',
    experiments: {},
    analytics: {},
    jsonSchema: {},
    loanInfo: null,
    errors: null,
    data: {},
    name: null,
    formValid: true
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'STEP_REQUESTING':
        return {
            ...state,
            readyStatus: action.type
        };
    case 'STEP_FAILURE':
        return {
            ...state,
            readyStatus: action.type,
            errors: action.errors,
            formValid: false
        };
    case 'STEP_SUCCESS':
        return {
            ...state,
            readyStatus: action.type,
            name: action.data.step,
            analytics: STEPS[action.data.step].GA,
            data: action.data.data,
            experiments: action.data.experiments,
            jsonSchema: action.data.jsonSchema,
            dictionary: action.data.dictionary,
            formValid: true
        };
    case 'NEXT_STEP_REQUESTING':
        return {
            ...state,
            readyStatus: action.type
        };
    case 'NEXT_STEP_FAILURE':
        return {
            ...state,
            readyStatus: action.type,
            errors: action.errors,
            formValid: false
        };
    case 'NEXT_STEP_SUCCESS':
        return {
            ...state,
            readyStatus: action.type
        };
    case 'STEP_FORM_INVALID':
        return {
            ...state,
            readyStatus: action.type,
            errors: action.errors,
            formValid: false
        };
    default:
        return state;
    }
};
