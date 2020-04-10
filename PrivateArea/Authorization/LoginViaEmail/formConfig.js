export const jsonSchema = {
    login: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
    password: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
};

export const initialValues = {
    login: null,
    password: null,
};
