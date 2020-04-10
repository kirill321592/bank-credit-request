import { React } from 'core-front/libs';
import { validate } from 'core-front/helpers/schemeValidator';
import { Form, Field, reduxForm } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { normalizeNumber, renderField } from '../../helpers/render';
import onSubmitFail from '../../helpers/onSubmitFail';
import { PrivatePolicy } from '../../components';
import { nextStep } from '../../actions/step';

const FORM_NAME = 'userInfoForm';

const UserInfoForm = ({ dictionary, handleSubmit, submitting }) => (
    <>
        <h2>¿Dónde vives actualmente?</h2>

        <Form onSubmit={handleSubmit(nextStep)} noValidate>
            <Row>
                <Field
                    className="col-xs-12 text-uppercase-for-field"
                    name="address.city"
                    label="Localidad"
                    component={renderField}
                />

                <Field
                    className="col-xs-12 text-uppercase-for-field"
                    name="address.street"
                    label="Nombre de la vía (rellenar antes el campo localidad)"
                    component={renderField}
                />
            </Row>

            <Row>
                <Field
                    className="col-lg-6"
                    name="address.houseNumber"
                    label="Número"
                    maxLength="7"
                    normalize={normalizeNumber}
                    component={renderField}
                />

                <Field
                    className="col-lg-6"
                    name="address.apartment"
                    label="Piso – Puerta"
                    component={renderField}
                />
            </Row>

            <Row>
                <Field
                    className="col-lg-6"
                    name="address.zipCode"
                    label="Código postal"
                    maxLength="5"
                    component={renderField}
                />
            </Row>

            <Row>
                <Field
                    label="Teléfono fijo (opcional)"
                    component={renderField}
                    name="address.homePhone"
                    maxLength="9"
                    type="tel"
                />

                <Field
                    options={{
                        values: dictionary.address.habitation,
                        type: 'HABITATION'
                    }}
                    component={renderField}
                    label="Tipo de vivienda"
                    placeholder="Seleccionar…"
                    fieldType="select"
                    name="address.habitation"
                />

                <Field
                    options={{
                        values: dictionary.familyInformation.maritalStatus,
                        type: 'MARITAL_STATUS'
                    }}
                    component={renderField}
                    label="Situación familiar"
                    placeholder="Seleccionar…"
                    fieldType="select"
                    name="familyInformation.maritalStatus"
                />

                <Field
                    options={{
                        values: dictionary.familyInformation.dependants,
                        type: 'DEPENDANTS'
                    }}
                    component={renderField}
                    label="Personas a tu cargo"
                    placeholder="Seleccionar…"
                    fieldType="select"
                    name="familyInformation.dependants"
                />
            </Row>

            <Button
                disabled={submitting}
                bsStyle="primary"
                bsSize="large"
                name="nextBtn"
                type="submit"
                block
            >
                Siguiente paso
            </Button>

            <PrivatePolicy />
        </Form>
    </>
);

export default compose(
    connect(state => ({
        jsonSchema: state.step.jsonSchema,
        dictionary: state.step.dictionary,
        initialValues: state.step.data,
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate
    }),
)(UserInfoForm);
