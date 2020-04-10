import { React } from 'core-front/libs';

import { Field, reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { renderField } from 'helpers/render';

import SettingsDetail from 'PrivateArea/Settings/Detail';

const formName = 'personalSettingsForm';

const PersonalSettings = () => (
    <SettingsDetail isPrivacyPolicyVisible title="Información de contacto">
        <Row>
            <form noValidate>
                <Field
                    type="text"
                    name="firstName"
                    label="Nombre"
                    component={renderField}
                    disabled
                />

                <Field
                    type="text"
                    name="firstLastName"
                    label="Apellidos"
                    component={renderField}
                    disabled
                />

                <Field
                    fieldType="dateSelect"
                    name="birthday"
                    label="Fecha de nacimiento"
                    yearsRange={{ from: -89, to: -18 }}
                    component={renderField}
                    dateFormat="DD/MM/YYYY"
                    disabled
                />

                <Field
                    type="text"
                    name="passportIdentificationNumber"
                    label="Número de DNI"
                    component={renderField}
                    disabled
                />

                <Field
                    type="email"
                    name="email"
                    label="Correo electrónico"
                    component={renderField}
                    disabled
                />
            </form>
        </Row>
    </SettingsDetail>
);

export default compose(
    connect(({ privateAreaUser }) => ({
        initialValues: privateAreaUser.profile.main,
    })),
    reduxForm({
        form: formName,
    }),
)(PersonalSettings);
