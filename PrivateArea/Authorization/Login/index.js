import { React, styled } from 'core-front/libs';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Col, Button } from 'react-bootstrap';

import { confirmUserExistence, resetSmsTimer } from 'actions/privateArea/authorization';

import { renderField } from 'helpers/render';
import { onFormSubmitFail } from 'helpers/onSubmitFail';
import { validate } from 'helpers/schemaValidator';

import AuthorizationPageLayout from 'PrivateArea/Authorization/Layout';
import SmsCodeForm from 'PrivateArea/Authorization/Login/SmsCode';

import { LOGIN_VIA_EMAIL_PAGE } from 'PrivateArea/config';

import { jsonSchema, initialValues } from 'PrivateArea/Authorization/Login/formConfig';

const { useState, useEffect } = React;

const FORM_NAME = 'loginForm';
const selector = formValueSelector(FORM_NAME);

const LoginForm = ({ dispatch, identifier, valid, handleSubmit, submitting, smsLiveTime }) => {
    const [isSmsCodeSend, setIsSmsCodeSend] = useState(false);

    useEffect(() => {
        if (!smsLiveTime || isSmsCodeSend) {
            return;
        }

        setIsSmsCodeSend(true);

        return () => {
            dispatch(resetSmsTimer());
        };
    }, [smsLiveTime, isSmsCodeSend, dispatch]);

    return (
        <AuthorizationPageLayout title="Accede a tu cuenta">
            <form noValidate onSubmit={handleSubmit}>
                <Field
                    type="text"
                    name="identifier"
                    label="Teléfono móvil o DNI/NIF"
                    component={renderField}
                />

                <Col xs={12}>
                    <Button
                        className="btn-submit"
                        type="submit"
                        bsStyle="primary"
                        bsSize="large"
                        block
                        disabled={submitting}
                    >
                        INICIAR SESIÓN
                    </Button>
                </Col>

                <StyledCol xs={12}>
                    <Link
                        to={LOGIN_VIA_EMAIL_PAGE.url}
                        className="form-link"
                    >
                        Iniciar sesión con e-mail y contraseña
                    </Link>
                </StyledCol>
            </form>

            {isSmsCodeSend && (
                <SmsCodeForm
                    identifier={identifier}
                    isIdentifierValid={valid}
                    isIdentifierSubmitting={submitting}
                    formName={FORM_NAME}
                />
            )}
        </AuthorizationPageLayout>
    );
};

export default compose(
    withRouter,
    connect(state => ({
        identifier: selector(state, 'identifier'),
        smsLiveTime: state.privateAreaAuthorization.smsLiveTime,
        jsonSchema,
        initialValues,
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail: onFormSubmitFail,
        validate,
        onSubmit: (values, dispatch, props) => {
            delete values.smsCode;

            return confirmUserExistence(values, dispatch, props.history);
        },
    }),
)(LoginForm);

const StyledCol = styled(Col)`
    text-align: center;
    
    .form-link {
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;
