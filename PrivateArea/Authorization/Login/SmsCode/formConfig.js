export const jsonSchema = {
    smsCode: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
};

export const initialValues = {
    smsCode: null,
};
