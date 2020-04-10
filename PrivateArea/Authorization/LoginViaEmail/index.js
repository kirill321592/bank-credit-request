import { React, styled } from 'core-front/libs';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';

import { loginUserViaEmail } from 'actions/privateArea/authorization';

import { renderField } from 'helpers/render';
import { onFormSubmitFail } from 'helpers/onSubmitFail';
import { validate } from 'helpers/schemaValidator';

import { LOGIN_PAGE, PASSWORD_RECOVERY_PAGE } from 'PrivateArea/config';

import AuthorizationPageLayout from 'PrivateArea/Authorization/Layout';

import { jsonSchema, initialValues } from 'PrivateArea/Authorization/LoginViaEmail/formConfig';

const FORM_NAME = 'loginViaEmailForm';

const LoginViaEmailForm = ({ handleSubmit, submitting }) => {
    return (
        <AuthorizationPageLayout title="Accede a tu cuenta">
            <form noValidate onSubmit={handleSubmit(loginUserViaEmail)}>
                <Field
                    type="text"
                    name="login"
                    label="Email"
                    component={renderField}
                />

                <Field
                    type="password"
                    name="password"
                    label="Contraseña"
                    component={renderField}
                />

                <StyledColRestore xs={12}>
                    <Link
                        to={PASSWORD_RECOVERY_PAGE.url}
                        className="form-link"
                    >
                        ¿Has olvidado tu contraseña?
                    </Link>
                </StyledColRestore>

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
                        to={LOGIN_PAGE.url}
                        className="form-link"
                    >
                        Iniciar sesión con teléfono móvil o DNI
                    </Link>
                </StyledCol>
            </form>
        </AuthorizationPageLayout>
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
)(LoginViaEmailForm);

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

const StyledColRestore = styled(Col)`
    .form-link {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 500;
        line-height: 1.17;
        color: #4c4c4c;
        
        &:hover {
            color: #ff9d00;
        }
    }
`;
