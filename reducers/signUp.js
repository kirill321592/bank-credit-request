const initialState = {
    phoneConfirmationExpired: false,
    phoneConfirmationBlocked: false,
    smsLiveTime: null,
    newPhone: null,
    err: null,
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'CONFIRM_PHONE_SUCCESS':
        return {
            ...state,
            smsLiveTime: action.data,
            phoneConfirmationExpired: false,
            phoneConfirmationBlocked: false
        };
    case 'CONFIRM_PHONE_BLOCKED':
        return {
            ...state,
            phoneConfirmationBlocked: true
        };
    case 'SMS_EXPIRED':
        return {
            ...state,
            phoneConfirmationExpired: true
        };
    case 'RESET_CONFIRM_TIMER':
        return {
            ...initialState,
            readyStatus: action.type
        };
    default:
        return state;
    }
};
