import { React, styled } from 'core-front/libs';

import { MMMaskedInput, DateInputs, FileUploader, InputLoader } from '../components';

import ERRORS from '../errors';
import dictionary from '../dictionary';
import DateSelect from '../components/DateSelect';

export const normalizeNumber = value => {
    if (!value) return value;
    const replaced = value.replace(/[^\d]/g, '');

    return replaced ? parseInt(replaced) : '';
};

const getTranslation = (item, type) => {
    let translation;

    if (dictionary(type) && dictionary(type).hasOwnProperty(item)) {
        translation =  dictionary(type)[item];
    }

    return translation || item;
};

export const renderField = ({
    fieldType, input, label, loading, meta: { asyncValidating, touched, error }, className, ...rest
}) => {
    const inputName = input.name;
    const isError = touched && error;

    let errorMessage = error;

    if (ERRORS.hasOwnProperty(inputName) && ERRORS[inputName][error]) {
        errorMessage = ERRORS[inputName][error];
    } else if (ERRORS[error]) {
        errorMessage = ERRORS[error];
    }

    const fieldError = isError && (
        <StyledError
            dangerouslySetInnerHTML={{ __html: errorMessage }}
            className="error"
        />
    );

    const fieldErrorCheckbox = isError && (
        <StyledError
            dangerouslySetInnerHTML={{ __html: errorMessage }}
            className="error"
            style={{ left: '15px', bottom: '-20px' }}
        />
    );

    const labelClassName = (className || 'col-xs-12');

    return fieldType !== 'checkbox' ? (
        <StyledLabel
            htmlFor={input.name}
            className={`${labelClassName} ${isError ? 'is-invalid' : ''}`}
            invalid={isError}
        >
            {label} {renderFieldComponent(fieldType, input, rest)} {fieldError}
            {(asyncValidating || loading) && <InputLoader />}
        </StyledLabel>
    ) : (
        <StyledCheckBoxLabel className={labelClassName} invalid={isError}>
            {renderFieldComponent(fieldType, input, rest, label)} {fieldErrorCheckbox}
        </StyledCheckBoxLabel>
    );
};

const renderFieldComponent = (fieldType, input, rest, label) => {
    const { options } = rest;

    switch (fieldType) {
    case 'radio':
        return (
            <StyledRadioWrap>
                {options && options.values && options.values.map((item, i) => (
                    <label key={i}>
                        <input
                            type="radio"
                            id={input.name}
                            {...input}
                            value={item}
                            checked={input.value === item}
                        />
                        <StyledRadio><i /></StyledRadio>
                        {getTranslation(item, options.type)}
                    </label>
                ))}
            </StyledRadioWrap>
        );
    case 'select':
        return (
            <FormSelect className="form-select">
                <select {...input} id={input.name} disabled={rest.disabled}>
                    <option value="" style={{ display: 'none' }}>
                        {rest.placeholder}
                    </option>
                    {options && options.values && options.values.map((item, i) => {
                        const val = (item.value || item);
                        const label = (item.label || getTranslation(item, options.type));

                        return (
                            <option value={val} key={i}>{label}</option>
                        );
                    })}
                </select>
            </FormSelect>
        );
    case 'masked':
        return <MMMaskedInput {...input} {...rest} />;
    case 'date':
        return <DateInputs {...input} {...rest} normalize={normalizeNumber} />;
    case 'dateSelect':
        return <DateSelect {...input} {...rest} />;
    case 'file':
        return <FileUploader type="file" id={input.name} {...input} {...rest} />;
    case 'checkbox':
        return (
            <StyledCheckBoxWrapper>
                <StyledCheckBoxInput
                    className="form-check-input"
                    id={input.name}
                    type="checkbox"
                    {...input} {...rest}
                    checked={input.value}
                />
                <CheckBox checked={input.value}><i /></CheckBox>
                <StyledCheckBoxDesc>{label}</StyledCheckBoxDesc>
            </StyledCheckBoxWrapper>
        );
    case 'textarea':
        return <textarea {...input} id={input.name} {...rest} className="form-control" />;
    default:
        return <input type="text" className="form-control" {...input} id={input.name} {...rest} />;
    }
};

export const replaceMask = val => val.replace(/[^0-9a-zA-Z.-]/g, '');

const StyledLabel = styled.label`
    display: block;
    margin-top: 30px;
    font-size: 18px;
    line-height: 1;
    color: #4c4c4c;

    @media (max-width: 767px) {
        margin-top: 20px;
        font-size: 17px;
    }

    input, select, textarea {
        border: 1px solid ${props => props.invalid ? '#ff4b4b' : 'transparent'};
        appearance: none;
    }
    
    .form-select::before {
        background: ${props => props.invalid ? '#ff4b4b' : '#d8d8d8'};;
    }

    .form-control {
        margin-top: 15px;

        @media (max-width: 767px) {
            margin-top: 10px;
        }
    }
`;

const StyledCheckBoxLabel = styled(StyledLabel)`
    font-size: 1.15em;
    font-weight: 500;
    line-height: 1.6;
    margin: 30px 0 20px;
    @media (max-width: 767px) {
        font-size: .9em;
        line-height: 1.8;
    }
`;

const StyledCheckBoxInput = styled.input`
    display: block !important;
    position: absolute;
    left: -0.5px;
    width: 26px;
    height: 26px;
    margin: 0 10px 0 0 !important;
    border-radius: 2px;
    background: #fff;

    @media (min-width: 513px) and (max-width: 991px) {
        height: 25px;
    }
`;

const StyledCheckBoxWrapper = styled.div`
    position: relative;
    float: left;
    width: 100%;
    min-height: 1px;
`;

const CheckBox = styled.span`
    display: inline-block;
    margin: 0;
    margin-right: 15px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    cursor: pointer;
    float: left;

    @media (min-width: 513px) and (max-width: 991px) {
        bottom: 0;
    }

    @media (max-width: 512px) {
        bottom: 20px
    }

    i {
        display: block;
        width: 10px;
        height: 10px;
        margin: 7px;
        background: transparent !important;
        transform: rotate(-135deg) translate(1px,-1px);
        opacity: ${props => props.checked ? 1 : 0};

        &:before, &:after {
            content: '';
            display: block;
            background: #9edc15;
        }

        &:before {
            width: 9px;
            height: 3px;
        }

        &:after {
            width: 3px;
            height: 11px;
        }
    }
`;

const StyledCheckBoxDesc = styled.span`
    vertical-align: super;
    display: table-cell;
`;

const FormSelect = styled.div`
    background-image: linear-gradient(to bottom, #ffffff, #c9c9c9);
    box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 16px;
    border: none;
    position: relative;
    margin-top: 20px;
    &:focus-within::before {
        background: #9edc15;
    }
    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 25px;
        border-radius: 0 3px 3px 0;
        pointer-events: none;
    }
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 8px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #fff;
        pointer-events: none;
    }
    select {
        padding: 17px;
        background: transparent;
        font-size: 16px;
        @media (max-width: 767px) {
            padding: 12px;
        }
    }
`;

const StyledError = styled.span`
    font-size: 12px;
    padding-top: 6px;
    color: #ff4b4b;
    font-weight: 400;
    z-index: 2;

    @media (max-width: 767px) {
        padding-top: 2px;
    }
`;

export const StyledRadioWrap = styled.div`
    label {
        margin-top: 20px;
        display: inline-block;
        margin-right: 40px;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.6;
        position: relative;
    }
    input {
        position: absolute;
        opacity: 0;
        width: 0;

        &:checked + span i {
            background: #9edc15;
        }

        &:focus + span {
            border-color: #9edc15;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgb(158, 220, 21);
        }
    }
    strong {
      display: table-cell;
      color: #bbb;
    }
`;

export const StyledRadio = styled.span`
    background: #fff;
    display: inline-block;
    border-radius: 50%;
    margin-right: 10px;
    float: left;
    cursor: pointer;
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    i {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 7px;
        background: #eee;

    }
`;
