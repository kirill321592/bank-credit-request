import moment from 'moment';

let errors;

const getDate = val => moment(val, val.includes('-') ? 'YYYY-MM-DD' : 'DD.MM.YYYY');

const validateField = (fieldKey, fieldValue, { validators, type: fieldType }) => {
    validators.forEach(({ type, message, value }) => {
        if (fieldType === 'date' && fieldValue) {
            const date = getDate(fieldValue);

            if (!date.isValid()) errors[fieldKey] = 'data.invalid';
        }

        if (fieldType === 'double' && fieldValue) {
            const num = Number(fieldValue);

            if (isNaN(num)) errors[fieldKey] = 'error.invalid';
        }

        if (!errors[fieldKey]) {
            switch (type) {
            case 'required':
                errors[fieldKey] = !fieldValue && !(Number(fieldValue) === fieldValue) ? message : null;

                break;
            case 'regExp':
                errors[fieldKey] = !fieldValue || new RegExp(value).test(fieldValue) ? null : message;

                break;
            case 'max':
                if (fieldValue && Number(fieldValue) > Number(value)) errors[fieldKey] = message;

                break;
            case 'min':
                if (fieldValue && Number(fieldValue) <= Number(value)) errors[fieldKey] = message;

                break;
            case 'maxLength':
                errors[fieldKey] = (fieldValue && fieldValue.length > +value) ? message : null;

                break;
            case 'minLength':
                errors[fieldKey] = (fieldValue && fieldValue.length < +value) ? message : null;

                break;
            case 'minAge':
                if (fieldValue) {
                    const date = getDate(fieldValue);

                    if (date.isValid()) {
                        errors[fieldKey] = moment().diff(date, 'years', true) < value ? message : null;
                    } else {
                        errors[fieldKey] = 'data.invalid';
                    }
                }

                break;
            case 'dateNowOrAfter':
                if (fieldValue) {
                    const date = getDate(fieldValue);

                    if (date.isValid()) {
                        //errors[fieldKey] = moment().diff(date, 'days', true) < value ? message : null;
                    } else {
                        errors[fieldKey] = 'data.invalid';
                    }
                }

                break;
            case 'maxDiffDays':
                if (fieldValue) {
                    const date = getDate(fieldValue);

                    if (date.isValid()) {
                        errors[fieldKey] = Math.abs(moment().diff(date, 'days'), true) > Number(value) ? message : null;
                    } else {
                        errors[fieldKey] = 'data.invalid';
                    }
                }
                break;
            case 'dateAfterNow':
                if (fieldValue) {
                    const date = getDate(fieldValue);

                    if (date.isValid()) {
                        errors[fieldKey] = moment().diff(date, 'days', true) >= 0 ? message : null;
                    } else {
                        errors[fieldKey] = 'data.invalid';
                    }
                }

                break;
            case 'enum':
                break;
            default:
                console.log(`${type} - is unsupported validation rule`);
            }
        }
    });
};

export const validate = (values, { jsonSchema, localErrors = {}}) => {
    if (!jsonSchema) {
        return localErrors;
    }

    errors = {};

    Object.keys(values).forEach(field => {
        const fieldSchema = jsonSchema[field];

        if (fieldSchema && fieldSchema.validators) {
            validateField(field, values[field], fieldSchema);
        }
    });

    return errors;
};
