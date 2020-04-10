import { React, styled } from 'core-front/libs';
import { CountDown, ga } from 'core-front';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { smsExpired, loginUser } from 'actions/privateArea/authorization';

import { renderField } from 'helpers/render';
import { onFormSubmitFail } from 'helpers/onSubmitFail';
import { validate } from 'helpers/schemaValidator';

import { jsonSchema, initialValues } from 'PrivateArea/Authorization/Login/SmsCode/formConfig';

const { useEffect } = React;

const FORM_NAME = 'smsCodeForm';

const SmsCodeForm = ({
    dispatch, formName, identifier, isIdentifierValid, smsLiveTime, isConfirmationExpired, handleSubmit,
    isIdentifierSubmitting, submitting,
}) => {
    const history = useHistory();

    useEffect(() => {
        ga.setGaPage('/secure/login/sms-confirm');
        ga.pageView();
    }, []);

    const sendSms = () => dispatch(submit(formName));

    const preSubmitAction = (values, dispatch) => {
        if (!identifier) {
            sendSms();

            return;
        }

        values.identifier = identifier;

        return loginUser(values, dispatch, history);
    };

    const renderSmsResend = () => {
        if (isConfirmationExpired) {
            return (
                <div className="form-link" onClick={sendSms}>
                    Recibir otra vez el código
                </div>
            );
        }

        return (
            <>
                Enviar un nuevo código (
                <CountDown
                    onTimeEnd={() => dispatch(smsExpired())}
                    time={smsLiveTime}
                />
                )
            </>
        );
    };

    return (
        <Col xs={12}>
            <StyledLoginWrapper>
                <StyledTitle>
                    Código SMS
                </StyledTitle>

                <StyledDescription>
                    <p>Introduce el código SMS que te hemos enviado a tu móvil</p>
                </StyledDescription>

                <StyledForm>
                    <form noValidate onSubmit={handleSubmit(preSubmitAction)}>
                        <Field
                            disabled={!isIdentifierValid}
                            type="text"
                            name="smsCode"
                            placeholder="Código de SMS"
                            component={renderField}
                        />

                        <Button
                            type="submit"
                            block
                            disabled={submitting || isIdentifierSubmitting}
                        >
                            Enviar
                        </Button>
                    </form>
                </StyledForm>

                <StyledCol>
                    {renderSmsResend()}
                </StyledCol>
            </StyledLoginWrapper>
        </Col>
    );
};

export default compose(
    connect(({ privateAreaAuthorization }) => ({
        smsLiveTime: privateAreaAuthorization.smsLiveTime,
        isConfirmationExpired: privateAreaAuthorization.isConfirmationExpired,
        jsonSchema,
        initialValues,
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail: onFormSubmitFail,
        validate,
    }),
)(SmsCodeForm);

const StyledLoginWrapper = styled.div`
    border-top: 1px solid #d8d8d8;
    margin-top: 30px;
    padding-top: 30px;
`;

const StyledTitle = styled.div`
    color: #4c4c4c;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.05;
    margin-bottom: 0;
`;

const StyledDescription = styled.div`
    p {
        color: #4c4c4c;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.31;
        margin: 15px 0 0;
    }
`;

const StyledForm = styled.div`
    form {
        align-items: flex-start;
        display: flex;
        margin-top: 20px;
    }

    label, .form-control {
        margin-top: 0;
    }
    
    label {
        flex-grow: 1;
        float: none;
        padding-left: 0;
        padding-right: 0;
        
        &:not(.is-invalid):not(:focus) {
            .form-control {
                border-right: 1px solid rgba(0, 0, 0, .2);
            }
        }
    }

    .form-control {
        text-align: center;
        position: relative;
        z-index: 1;
    }

    button {
        background-image: linear-gradient(180deg, #fff, #c9c9c9);
        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, .2);
        border-radius: 0 4px 4px 0;
        border: none;
        color: #4c4c4c;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 0;
        max-width: 35%;
        padding-bottom: 16px;
        padding-top: 15px;
        text-transform: uppercase;
    }
`;

const StyledCol = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.17;
    color: #4c4c4c;
    padding-top: 23px;

    .form-link {
        cursor: pointer;
        display: inline-block;
        text-decoration: underline;

        &:hover {
            color: #ff9d00;
            text-decoration: none;
        }
    }
`;
