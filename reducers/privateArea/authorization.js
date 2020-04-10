const initialState = {
    isConfirmationExpired: false,
    smsLiveTime: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'PA_USER_EXISTENCE_CONFIRMED':
        return {
            smsLiveTime: action.elapsedTime,
            isConfirmationExpired: false,
        };

    case 'PA_SMS_EXPIRED':
        return {
            ...state,
            isConfirmationExpired: true,
        };

    case 'PA_RESET_SMS_TIMER':
        return initialState;

    default:
        return state;
    }
};
