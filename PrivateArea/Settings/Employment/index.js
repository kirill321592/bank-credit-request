import { React } from 'core-front/libs';

import { Field, reduxForm } from 'redux-form';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { renderField } from 'helpers/render';

import SettingsDetail from 'PrivateArea/Settings/Detail';

const formName = 'employmentSettingsForm';

const EmploymentSettings = ({ employmentOptions }) => (
    <SettingsDetail title="Dirección y empleo">
        <Row>
            <form noValidate>
                <Field
                    type="text"
                    name="city"
                    label="Localidad"
                    component={renderField}
                    disabled
                />

                <Field
                    type="text"
                    name="street"
                    label="Nombre de la vía"
                    component={renderField}
                    disabled
                />

                <Field
                    className="col-xs-6"
                    type="number"
                    name="number"
                    label="Número"
                    component={renderField}
                    disabled
                />

                <Field
                    className="col-xs-6"
                    type="text"
                    name="doorNumber"
                    label="Piso – Puerta"
                    component={renderField}
                    disabled
                />

                <Field
                    className="col-xs-6"
                    fieldType="masked"
                    mask="99999"
                    maskChar="_"
                    name="postalCode"
                    label="Código postal"
                    component={renderField}
                    disabled
                />

                <Field
                    fieldType="select"
                    name="employment"
                    label="Situación laboral"
                    component={renderField}
                    disabled
                    options={employmentOptions}
                />

                <Field
                    fieldType="masked"
                    mask="999-999-999"
                    maskChar="_"
                    name="phoneNumber"
                    label="Teléfono de trabajo"
                    component={renderField}
                    disabled
                />

                <Field
                    type="text"
                    name="income"
                    label="Ingresos netos mensuales"
                    component={renderField}
                    disabled
                />
            </form>
        </Row>
    </SettingsDetail>
);

export default compose(
    connect(({ privateAreaUser: { profile }}) => ({
        initialValues: profile.main,
        employmentOptions: profile.employmentOptions,
    })),
    reduxForm({
        form: formName,
    }),
)(EmploymentSettings);
