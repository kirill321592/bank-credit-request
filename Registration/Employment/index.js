import { React } from 'core-front/libs';
import { Form, Field, reduxForm, formValueSelector, change } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { Row, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { sendJuicyScoreEvent, getUserBrowserData } from '../../actions/juicyScore';
import { PrivatePolicy, JuicyScore } from '../../components';
import onSubmitFail from '../../helpers/onSubmitFail';
import { renderField } from '../../helpers/render';
import { nextStep } from '../../actions/step';

const FORM_NAME = 'employmentForm';
const selector = formValueSelector(FORM_NAME);

class EmploymentForm extends React.Component {
    static formatToNumber = (value, previousValue) => {
        if (!value) {
            return value;
        }
        const parsed = Number(value.replace(/[^\d]/g, ''));

        if (isNaN(Number(parsed))) {
            return previousValue;
        } else {
            return parsed;
        }
    };

    static resetHiddenFields({ dispatch, form }, e, newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            dispatch(change(form, 'employment.industry', null));
            dispatch(change(form, 'employment.workNumber', null));
            dispatch(change(form, 'employment.employer', null));

            newVal === 'UNEMPLOYED' && dispatch(change(form, 'employment.nextIncomeDate', null));
        }
    }

    preSubmitAction(values, dispatch) {
        sendJuicyScoreEvent();

        return nextStep({
            ...values,
            ...getUserBrowserData(true)
        }, dispatch);
    }

    render() {
        const {
            dictionary,
            handleSubmit,
            submitting,
            employment,
        } = this.props;

        return (
            <>
                <h2>Datos de empleo</h2>

                <Form onSubmit={handleSubmit(this.preSubmitAction)} noValidate>
                    <Row>
                        <Field
                            placeholder="Seleccionar..."
                            options={{ values: dictionary.employment.education, type: 'EDUCATION' }}
                            component={renderField}
                            label="Nivel de estudios"
                            fieldType="select"
                            name="employment.education"
                        />

                        <Field
                            onChange={EmploymentForm.resetHiddenFields.bind(this, this.props)}
                            placeholder="Seleccionar..."
                            options={{ values: dictionary.employment.employment, type: 'EMPLOYMENT' }}
                            component={renderField}
                            label="Situación laboral"
                            fieldType="select"
                            name="employment.employment"
                        />

                        {['FULL_TIME', 'PART_TIME', 'TEMPORAL', 'MILITARY', 'EMPLOYEE', null].includes(employment) && (
                            <>
                                <Field
                                    name="employment.employer"
                                    label="Nombre de la empresa"
                                    component={renderField}
                                />

                                <Field
                                    placeholder="Seleccionar..."
                                    options={{ values: dictionary.employment.industry, type: 'INDUSTRY' }}
                                    component={renderField}
                                    label="Tipo de actividad"
                                    fieldType="select"
                                    name="employment.industry"
                                />

                                <Field
                                    type="tel"
                                    name="employment.workNumber"
                                    fieldType="masked"
                                    label="Teléfono del trabajo (opcional)"
                                    component={renderField}
                                    maxLength={9}
                                />
                            </>
                        )}

                        <Field
                            normalize={EmploymentForm.formatToNumber}
                            component={renderField}
                            label="Ingresos netos mensuales"
                            name="employment.income"
                            maxLength="5"
                            type="tel"
                        />

                        {employment !== 'UNEMPLOYED' && (
                            <Field
                                fieldType="dateSelect"
                                name="employment.nextIncomeDate"
                                label="Fecha en la que recibirás el salario"
                                yearsRange={{ from: 0, to: 1 }}
                                component={renderField}
                            />
                        )}

                        <Field
                            placeholder="Seleccionar..."
                            options={{ values: dictionary.employment.creditPurpose, type: 'CREDIT_PURPOSE' }}
                            component={renderField}
                            label="Motivo del préstamo"
                            fieldType="select"
                            name="employment.creditPurpose"
                        />

                        <Field
                            normalize={EmploymentForm.formatToNumber}
                            component={renderField}
                            label="Gastos mensuales (préstamos, hipoteca…)"
                            name="employment.paymentsOnLoans"
                            type="number"
                        />

                        <Field
                            component={renderField}
                            fieldType="checkbox"
                            name="employment.agreeAdsCommunications"
                            label="Deseo recibir comunicaciones comerciales y ofertas adaptadas a mis intereses"
                        />

                        <Field
                            component={renderField}
                            fieldType="checkbox"
                            name="employment.agreeDirectMarketing"
                            label="Consiento la comunicación de mis datos personales a los colaboradores con los que
                            IDFinance Spain, S.L.U. tenga acuerdos suscritos, para recibir comunicaciones y ofertas
                            adaptadas a mis intereses sobre sus productos o servicios."
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

                    <JuicyScore />
                </Form>
            </>
        );
    }
}

export default compose(
    connect(state => ({
        employment: selector(state, 'employment.employment'),
        jsonSchema: {
            ...state.step.jsonSchema,
            employment: {
                ...state.step.jsonSchema.employment ,
                creditPurpose: {
                    ...state.step.jsonSchema.employment.creditPurpose,
                    validators: [
                        ...state.step.jsonSchema.employment.creditPurpose.validators,
                        { type: 'required', message: 'error.required' }
                    ]
                },
                industry: {
                    ...state.step.jsonSchema.employment.industry,
                    validators: [
                        ...state.step.jsonSchema.employment.industry.validators,
                        { type: 'required', message: 'error.required' }
                    ]
                }
            }
        },
        initialValues: state.step.data,
        dictionary: state.step.dictionary,
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate,
    }),
    withRouter,
)(EmploymentForm);