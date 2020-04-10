export const jsonSchema = {
    email: {
        validators: [
            { type: 'required', message: 'error.required' },
        ],
    },
};

export const initialValues = {
    email: null,
};
