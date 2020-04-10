import { React, styled } from 'core-front/libs';
import { sendPostRequest } from 'helpers/request';

import { Field, reduxForm } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { renderField } from 'helpers/render';
import { setFormErrors } from 'helpers/setErrors';
import { validate } from 'helpers/schemaValidator';
import { onFormSubmitFail } from 'helpers/onSubmitFail';

import SettingsDetail from 'PrivateArea/Settings/Detail';

import { initialValues } from 'PrivateArea/Settings/Password/formConfig';

import { PRIVATE_AREA_API } from 'api';

const formName = 'passwordSettingsForm';

const PasswordSettings = ({ handleSubmit, reset }) => {
    const submit = values => {
        return sendPostRequest(PRIVATE_AREA_API.CHANGE_PASSWORD, values)
            .then(({ exception }) => {
                if (!exception) {
                    reset();

                    return;
                }

                setFormErrors(exception);
            });
    };

    return (
        <SettingsDetail isEditable title="Cambiar contraseña">
            <Row>
                <form noValidate onSubmit={handleSubmit(submit)}>
                    <Field
                        type="password"
                        name="oldPassword"
                        label="Escribe tu contraseña actual"
                        component={renderField}
                    />

                    <Field
                        type="password"
                        name="newPassword"
                        label="Escribe la nueva contraseña"
                        component={renderField}
                    />

                    <StyledHint xs={12}>
                        8 o más carácteres, incluye almenos una mayúscula y un número sin espacios en blanco.
                    </StyledHint>

                    <Field
                        type="password"
                        name="repeatNewPassword"
                        label="Repite la nueva contraseña"
                        component={renderField}
                    />

                    <Col xs={12}>
                        <Button
                            className="btn-submit"
                            type="submit"
                            bsStyle="primary"
                            bsSize="large"
                            block
                        >
                            GUARDAR CAMBIOS
                        </Button>
                    </Col>
                </form>
            </Row>
        </SettingsDetail>
    );
};

export default compose(
    connect(() => ({
        initialValues,
    })),
    reduxForm({
        form: formName,
        onSubmitFail: onFormSubmitFail,
        validate,
    }),
)(PasswordSettings);

const StyledHint = styled(Col)`
    margin-top: 10px;
`;
