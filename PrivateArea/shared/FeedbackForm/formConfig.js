export const jsonSchema = {
    reason: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
    textMessage: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
};

export const initialValues = {
    reason: null,
    textMessage: null,
};
