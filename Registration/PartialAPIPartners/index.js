import { React, styled } from 'core-front/libs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col, Button, Modal } from 'react-bootstrap';

import { CountDown, ga } from 'core-front';
import { validate } from 'core-front/helpers/schemeValidator';
import { gaw } from 'core-front/actions/ga';
import { renderField, replaceMask } from '../../helpers/render';
import onSubmitFail from '../../helpers/onSubmitFail';
import { PersonalInfo } from '../../components';
import { nextStep } from '../../actions/step';
import {
    resetConfirmationTimer,
    confirmMobilePhone,
    smsExpired
} from '../../actions/signUp';

import ibanEmample from './assets/iban.jpg';
import phoneIcon from './assets/ico-doc-phone.svg';

const FORM_NAME = 'partialAPIPartnersForm';
const selector = formValueSelector(FORM_NAME);

class PartialAPIPartners extends React.Component {
    state = {
        showIbanExample: false
    };

    componentDidUpdate() {
        const {
            agreeTermsAndConditions,
            confirmPolicy,
            smsLiveTime
        } = this.props;

        confirmPolicy && agreeTermsAndConditions && !smsLiveTime &&
            this.sendSms();
    }

    componentWillUnmount() {
        const { mappedResetConfirmationTimer } = this.props;

        mappedResetConfirmationTimer();
    }

    handleClose = () => {
        this.setState({ showIbanExample: false });
    };

    showExampleIban = () => {
        this.setState({ showIbanExample: true });
    };

    resendSms = () => {
        const { analytics: { CATEGORY }} = this.props;

        ga.sendEvent(CATEGORY, 'sms-code-resend');
        this.sendSms();
    };

    sendSms = () => {
        const { initialValues, mappedConfirmMobilePhone } = this.props;

        mappedConfirmMobilePhone({
            confirmUser: {
                phone: initialValues.confirmUser.phone
            }
        });
    };

    render() {
        const { showIbanExample } = this.state;
        const {
            phoneConfirmationExpired,
            phoneConfirmationBlocked,
            agreeTermsAndConditions,
            mappedSmsExpired,
            confirmPolicy,
            initialValues,
            handleSubmit,
            smsLiveTime,
            submitting,
            dictionary,
        } = this.props;
        const { employment: { creditPurpose, industry }} = dictionary;
        const { partnerName, employment } = initialValues;

        return (
            <>
                <h2>Cuenta bancaria</h2>

                <Modal
                    show={showIbanExample}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Número de cuenta corriente IBAN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageHint>
                            <img src={ibanEmample} alt="IBAN" />
                        </ImageHint>
                    </Modal.Body>
                </Modal>

                <p><strong>Número de cuenta corriente IBAN</strong></p>
                <p>Introduce la cuenta en la que recibes tus ingresos mensuales. Aquí es donde enviaremos tu dinero.</p>
                <p><span className="link gray" onClick={this.showExampleIban}>Ver ejemplo</span></p>

                <Form onSubmit={handleSubmit(nextStep)}>
                    <Row>
                        <Field
                            className="col-xs-12 text-uppercase-for-field"
                            mask="ES99 9999 9999 9999 9999 9999"
                            name="bankAccount.iban"
                            component={renderField}
                            parse={replaceMask}
                            fieldType="masked"
                        />

                        {initialValues.bankApi && (
                            <Field
                                options={{
                                    values: ['INSTANTOR', 'NONE'],
                                    type: 'BANK_API'
                                }}
                                label="¿Tienes banca online?"
                                component={renderField}
                                name="bankApi.type"
                                fieldType="radio"
                            />
                        )}

                        {!employment.creditPurpose && !employment.industry && (
                            <>
                                <Field
                                    options={{
                                        values: creditPurpose,
                                        type: 'CREDIT_PURPOSE'
                                    }}
                                    name="employment.creditPurpose"
                                    placeholder="Seleccionar..."
                                    label="Motivo del préstamo"
                                    component={renderField}
                                    fieldType="select"
                                />

                                <Field
                                    options={{
                                        values: industry,
                                        type: 'INDUSTRY'
                                    }}
                                    label="Sector de la empresa donde trabajas"
                                    placeholder="Seleccionar..."
                                    name="employment.industry"
                                    component={renderField}
                                    fieldType="select"
                                />
                            </>
                        )}

                        <SmsConfirmPolicyField className="row col-xs-12">
                            <Field
                                name="confirmPolicy.confirmPolicy"
                                component={renderField}
                                fieldType="checkbox"
                                label={
                                    <span>
                                        He leído y acepto la{' '}
                                        <a
                                            href="https://www.moneyman.es/como-funciona/politica-de-privacidad"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Política de Privacidad
                                        </a>
                                    </span>
                                }
                            />

                            <Field
                                name="conditions.agreeTermsAndConditions"
                                component={renderField}
                                fieldType="checkbox"
                                label={
                                    <span>
                                        He leído y acepto la{' '}
                                        <a
                                            href="https://www.moneyman.es/como-funciona/condiciones-generales-contratacion-del-prestamo"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Términos y Condiciones
                                        </a>
                                    </span>
                                }
                            />
                        </SmsConfirmPolicyField>
                    </Row>

                    {confirmPolicy && agreeTermsAndConditions && (
                        <>
                        { phoneConfirmationBlocked
                            ? (
                                <Documentation>
                                    <Row>
                                        <Col xs={2}>
                                            <div className="documentation-icon">
                                                <img src={phoneIcon} alt="icon-phone" />
                                            </div>
                                        </Col>
                                        <Col xs={10}>
                                            <div className="documentation-title">
                                                ¿No recibes el código?
                                                <span className="documentation-title-span">
                                                Llama al 900-800-329
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Documentation>
                            )
                            : (
                                <Row>
                                    <Field
                                        className="col-xs-7 col-sm-6"
                                        name="confirmUser.code"
                                        component={renderField}
                                        label="Código SMS"
                                        maxLength={6}
                                    />
                                    <div className="clearfix" />

                                    <HelperSection className="col-xs-7 col-sm-6">
                                        {smsLiveTime && !phoneConfirmationExpired && (
                                            <span className="link">
                                                Enviar un nuevo código (
                                                <CountDown
                                                    time={smsLiveTime}
                                                    onTimeEnd={mappedSmsExpired}
                                                />)
                                            </span>
                                        )}

                                        {phoneConfirmationExpired && (
                                            <Button
                                                className="btn-link helper-section-btn"
                                                onClick={this.resendSms}
                                                name="resendSms"
                                                type="button"
                                            >
                                                Recibir otra vez el código
                                            </Button>
                                        )}
                                    </HelperSection>
                                </Row>
                            )}
                            <Row>
                                <Field
                                    className="col-xs-7 col-sm-6"
                                    name="confirmUser.phone"
                                    component={renderField}
                                    label="Teléfono móvil"
                                    type="tel"
                                />
                            </Row>
                        </>
                    )}

                    <Row>
                        <Col xs={12}>
                            <Button
                                disabled={
                                    phoneConfirmationBlocked ||
                                    submitting
                                }
                                bsStyle="primary"
                                bsSize="large"
                                name="nextBtn"
                                type="submit"
                                block
                            >
                                Siguiente paso
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <PersonalInfo partnerName={partnerName} />
            </>
        );
    }
}

export default compose(
    connect(state => ({
        phoneConfirmationExpired: state.signUp.phoneConfirmationExpired,
        phoneConfirmationBlocked: state.signUp.phoneConfirmationBlocked,
        smsLiveTime: state.signUp.smsLiveTime,
        dictionary: state.step.dictionary,
        jsonSchema: state.step.jsonSchema,
        analytics: state.step.analytics,
        agreeTermsAndConditions: selector(state, 'conditions.agreeTermsAndConditions'),
        confirmPolicy: selector(state, 'confirmPolicy.confirmPolicy'),
        phone: selector(state, 'confirmUser.phone'),
        initialValues: {
            ...state.step.data,
            transferSource: {
                type: 'BANK_ACCOUNT'
            }
        },
    }), {
        mappedResetConfirmationTimer: resetConfirmationTimer,
        mappedConfirmMobilePhone: confirmMobilePhone,
        mappedSmsExpired: smsExpired
    }),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate,
        onSubmitSuccess: (result, dispatch, props) => {
            const { values: { bankApi }, analytics: { CATEGORY }} = props;

            if (bankApi) {
                switch (bankApi.type) {
                case 'INSTANTOR':
                    gaw('send', 'event', CATEGORY, 'IB-yes');
                    break;
                case 'NONE':
                default:
                    gaw('send', 'event', CATEGORY, 'IB-no');
                    break;
                }
            }
        }
    }),
)(PartialAPIPartners);

const ImageHint = styled.div`
  text-align: center;
  img {
      display: inline-block;
      max-width: 100%;
  }
`;

const HelperSection = styled.div`
  padding-top: 10px;

  .btn-link.helper-section-btn {
      margin-top: 0;
      font-size: 14px;
      color: #9edc15;
  }
`;

const Documentation = styled.div`
  margin: 20px 0 40px;
  color: #666;

  .documentation-icon {
      padding: 10px 0;
  }

  .documentation-title {
      font-size: 1.4em;
      font-weight: 600;
      line-height: 1.3;
      margin: 10px 0;
  }

  .documentation-title-span {
      display: block;
      font-weight: 500;
      line-height: 1.5;
      font-size: .7em;
      margin-top: 10px;
  }
`;

const SmsConfirmPolicyField = styled.div`
  padding-top: 25px;

  label {
      margin-top: 10px;
  }

  @media (max-width: 767px) {
     padding-top: 15px;
  }
`;
