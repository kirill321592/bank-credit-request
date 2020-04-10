import { React, styled } from 'core-front/libs';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';

import { resetPassword } from 'actions/privateArea/authorization';

import { renderField } from 'helpers/render';
import { onFormSubmitFail } from 'helpers/onSubmitFail';
import { validate } from 'helpers/schemaValidator';

import AuthorizationPageLayout from 'PrivateArea/Authorization/Layout';

import { jsonSchema, initialValues } from 'PrivateArea/Authorization/PasswordRecovery/formConfig';

const FORM_NAME = 'passwordRecoveryForm';

const PasswordRecoveryForm = ({ handleSubmit, submitting, submitSucceeded }) => {
    if (submitSucceeded) {
        return (
            <StyledWrapper>
                <AuthorizationPageLayout title="Nueva contraseña restablecida" isLogotypeVisible={false}>
                    <Col xs={12}>
                        <p>Te hemos enviado un e-mail con tu nueva contraseña.</p>
                    </Col>
                </AuthorizationPageLayout>
            </StyledWrapper>
        );
    }

    return (
        <StyledWrapper>
            <AuthorizationPageLayout title="Recuperar contraseña">
                <form noValidate onSubmit={handleSubmit(resetPassword)}>
                    <Col xs={12}>
                        <p>
                            Introduce la dirección de email asociada a tu cuenta Moneyman.es y haz clic en “Confirmar y
                            recibir contraseña”. Te enviaremos una nueva contraseña directamente a esta misma dirección
                            de e-mail.
                        </p>
                    </Col>

                    <Field
                        type="text"
                        name="email"
                        label="Email"
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
                            CONFIRMAR Y RECIBIR CONTRASEÑA
                        </Button>
                    </Col>
                </form>
            </AuthorizationPageLayout>
        </StyledWrapper>
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
)(PasswordRecoveryForm);

const StyledWrapper = styled.div`
    label {
        margin-top: 0;
    }
    
    p {
         @media (max-width: 767px) {
            font-size: 16px;
         }
    }
`;
