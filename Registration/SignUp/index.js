import { React, styled } from 'core-front/libs';
import { Row, Button, Col } from 'react-bootstrap';
import { Form, Field, reduxForm, formValueSelector, change, untouch } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ga } from 'core-front';

import { asyncValidateEmail } from '../../actions/signUp';
import onSubmitFail from '../../helpers/onSubmitFail';
import { renderField } from '../../helpers/render';
import { nextStep } from '../../actions/step';

import PersonalInfo from './personaInfo';

const FORM_NAME = 'signUpForm';
const selector = formValueSelector(FORM_NAME);

class SignUpForm extends React.Component {
    static resetSecondLastName({ dispatch, form }, e, newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
            dispatch(change(form, 'userAccount.secondLastName', null));
            dispatch(untouch(form, 'userAccount.secondLastName'));
        }
    }

    sendGoogleAnalytics()  {
        const { errors, analytics: { CATEGORY }} = this.props;

        if (errors.hasOwnProperty('userAccount')) {
            if (errors.userAccount['phone'] === 'error.exists') {
                ga.sendEvent(CATEGORY, 'mphone-already-exists');
            }

            if (errors.userAccount['email'] === 'error.exists') {
                ga.sendEvent(CATEGORY, 'email-already-exists');
            }
        }

        if (errors.hasOwnProperty('personalData') && errors.personalData['idNumber'] === 'error.exists') {
            ga.sendEvent(CATEGORY, 'dni-already-exists');
        }
    }

    componentDidUpdate(prevProps) {
        const { errors } = this.props;

        if (errors && prevProps.errors !== errors) {
            this.sendGoogleAnalytics();
        }
    }

    render() {
        const {
            noSecondLastName,
            handleSubmit,
            dictionary,
            submitting,
        } = this.props;

        return (
            <>
                <h2>Introduce tus datos personales</h2>

                <Form onSubmit={handleSubmit(nextStep)}>
                    <Row>
                        <Col xs={12}>
                            <a className="btn btn-md btn-success btn-block" href="#/login">
                                Ya estoy registrado
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Field
                            className="col-xs-12 text-uppercase-for-field"
                            name="userAccount.firstName"
                            label="Nombre"
                            component={renderField}
                        />

                        <Field
                            className="col-xs-12 text-uppercase-for-field"
                            name="userAccount.firstLastName"
                            label="Primer apellido"
                            component={renderField}
                        />

                        {!noSecondLastName && (
                            <Field
                                className="col-xs-12 text-uppercase-for-field"
                                disabled={noSecondLastName}
                                name="userAccount.secondLastName"
                                label="Segundo apellido"
                                component={renderField}
                            />
                        )}

                        <Field
                            onChange={SignUpForm.resetSecondLastName.bind(this, this.props)}
                            fieldType="checkbox"
                            name="userAccount.noSecondLastName"
                            label="Marcar si no tengo segundo apellido"
                            component={renderField}
                        />

                        <StyledInfoContainer className="col-xs-12">
                            <strong>IMPORTANTE:</strong> Introduce los datos tal y como
                            aparecen en tu DNI/NIE
                        </StyledInfoContainer>

                        <Field
                            options={{ values: dictionary.personalData.sex, type: 'SEX' }}
                            component={renderField}
                            fieldType="radio"
                            label="Género"
                            name="personalData.sex"
                        />

                        <Field
                            fieldType="dateSelect"
                            name="personalData.birthday"
                            label="Fecha de nacimiento"
                            yearsRange={{ from: -89, to: -18 }}
                            component={renderField}
                        />

                        <Field
                            className="col-xs-12 text-uppercase-for-field"
                            name="personalData.idNumber"
                            label="Número de DNI o NIE"
                            component={renderField}
                            maxLength={9}
                        />

                        <Field
                            type="tel"
                            name="userAccount.phone"
                            fieldType="masked"
                            label="Télefono móvil"
                            component={renderField}
                            maxLength={9}
                        />

                        <Field
                            type="email"
                            name="userAccount.email"
                            label="Correo electrónico"
                            component={renderField}
                        />
                    </Row>

                    <Button
                        name="nextBtn"
                        type="submit"
                        bsStyle="primary"
                        bsSize="large"
                        block
                        disabled={submitting}
                    >
                        Siguiente paso
                    </Button>
                </Form>

                <PersonalInfo />
            </>
        );
    }
}

export default compose(
    connect(state => ({
        noSecondLastName: selector(state, 'userAccount.noSecondLastName'),
        jsonSchema: {
            ...state.step.jsonSchema,
            userAccount: {
                ...state.step.jsonSchema.userAccount,
                secondLastName: {
                    ...state.step.jsonSchema.userAccount.secondLastName,
                    validators: [
                        ...state.step.jsonSchema.userAccount.secondLastName.validators,
                        { type: 'required', message: 'error.required' }
                    ]
                }
            }
        },
        initialValues: state.step.data,
        dictionary: state.step.dictionary,
        analytics: state.step.analytics,
        errors: state.step.errors,
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate,
        asyncValidate: asyncValidateEmail,
        shouldAsyncValidate: ({ syncValidationPasses, trigger }) =>
            syncValidationPasses && trigger === 'submit'
    }),
)(SignUpForm);

const StyledInfoContainer = styled.div`
    font-size: 14px;
    padding: 0 10px;
    margin: 0;
`;
