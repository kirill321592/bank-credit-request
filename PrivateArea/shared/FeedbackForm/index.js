import { React, styled } from 'core-front/libs';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';

import { PRIVATE_AREA_API } from 'api';

import { renderField } from 'helpers/render';
import { onFormSubmitFail } from 'helpers/onSubmitFail';
import { validate } from 'helpers/schemaValidator';
import { sendGetRequest, sendPostRequest } from 'helpers/request';

import { jsonSchema, initialValues } from 'PrivateArea/shared/FeedbackForm/formConfig';

const { useState, useEffect } = React;

const FORM_NAME = 'feedbackForm';

const FeedbackForm = ({ handleSubmit, submitting, reset, isHidden = false }) => {
    const [subjectsList, setSubjectsList] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        sendGetRequest(PRIVATE_AREA_API.FEEDBACK_SUBJECTS)
            .then(({ reasons }) => {
                setSubjectsList(reasons);
            })
            .catch(() => {});
    }, []);

    const resetSubmitStatus = () => {
        if (isFormSubmitted) {
            setIsFormSubmitted(false);
        }
    };

    const submit = values => {
        sendPostRequest(PRIVATE_AREA_API.SEND_FEEDBACK, values)
            .then(() => {
                setIsFormSubmitted(true);
                reset();
            })
            .catch(() => {});
    };

    return (
        <StyledForm isHidden={isHidden}>
            <Row>
                <Col xs={12}>
                    <p>Envíanos un mensaje para que podamos resolver todas tus dudas</p>
                </Col>

                <form noValidate onSubmit={handleSubmit(submit)}>
                    <Field
                        options={{ values: subjectsList }}
                        component={renderField}
                        placeholder="Seleccionar…"
                        fieldType="select"
                        name="reason"
                        onChange={resetSubmitStatus}
                    />

                    <Field
                        type="text"
                        name="textMessage"
                        placeholder="Escribe tu consulta aquí"
                        fieldType="textarea"
                        rows="4"
                        component={renderField}
                        onChange={resetSubmitStatus}
                    />

                    <Col xs={12}>
                        <Button
                            className={`btn-submit btn-info ${isFormSubmitted ? 'is-send' : ''}`}
                            type="submit"
                            bsSize="large"
                            block
                            disabled={submitting}
                        >
                            {isFormSubmitted ? '¡Mensaje enviado!' : 'Enviar'}
                        </Button>
                    </Col>
                </form>
            </Row>
        </StyledForm>
    );
};

export default compose(
    connect(() => ({
        jsonSchema,
        initialValues,
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail: onFormSubmitFail,
        validate,
    }),
)(FeedbackForm);

const StyledForm = styled.div`
    max-height: ${props => (props.isHidden ? '0' : '500px')};
    transition: max-height ease .4s;
    overflow: hidden;

    label {
        &:not(:first-child) {
            margin-top: 10px;
        }

        .form-control, .form-select {
            margin-top: 0;
        }
    }

    select {
        font-weight: 400;
        padding-top: 11px;
        padding-bottom: 11px;
    }

    textarea {
        resize: none;
    }

    button {
        margin-top: 15px;
        
        &.is-send {
            background-color: #b1f221;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
            
            &:hover {
                background-color: #8fd000;
            }
        }
    }
`;
