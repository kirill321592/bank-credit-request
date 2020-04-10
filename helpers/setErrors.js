import { SubmissionError } from 'redux-form';

export const setFormErrors = errors => {
    if (Object.keys(errors).length) {
        throw new SubmissionError(errors);
    }
};

export default serverErrors => {
    const errors = serverErrors.reduce((acc, cur) => {
        if (cur.subject && cur.code) {
            const assign = (obj, keyPath, value) => {
                const lastKeyIndex = keyPath.length-1;

                for (let i = 0; i < lastKeyIndex; ++i) {
                    const key = keyPath[i];

                    if (!(key in obj)) obj[key] = {};
                    obj = obj[key];
                }
                obj[keyPath[lastKeyIndex]] = value;
            };

            assign(acc, cur.subject.split('.'), cur.code);
        }

        return acc;
    }, {});

    if (serverErrors.length) {
        throw new SubmissionError(errors);
    }
};
