const initialState = {
    prolongationInfo: {},
    prolongationPayInfo: {},
    iframeUrl: '',
    prolongationDays: [],
    prolongationRangeVal: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PA_SET_PROLONGATION_INFO':
        return {
            ...state,
            prolongationInfo: action.data
        };
    case 'PA_SET_IFRAME_URL':
        return {
            ...state,
            iframeUrl: action.data
        };
    case 'PA_SET_PROLONGATION_PAY_INFO':
        return {
            ...state,
            prolongationPayInfo: action.data,
            prolongationDays: Object.keys(action.data.rolloverDurationValues),
            prolongationRangeVal: Object.keys(action.data.rolloverDurationValues).findIndex(item => item == action.data.rolloverDuration)
        };
    default:
        return state;
    }
};
