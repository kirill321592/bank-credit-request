import { React, styled } from 'core-front/libs';
import { ga } from 'core-front';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import phoneIcon from './assets/ico-doc-phone.svg';

import {
    confirmMobilePhone,
    smsExpired,
    resetConfirmationTimer
} from '../../actions/signUp';

import onSubmitFail from '../../helpers/onSubmitFail';
import { renderField } from '../../helpers/render';
import { nextStep } from '../../actions/step';
import { CountDown } from 'core-front';

const FORM_NAME = 'confirmUserForm';
const selector = formValueSelector(FORM_NAME);

class ConfirmUserForm extends React.Component {
    componentDidMount() {
        this.sendSms();
    }

    componentWillUnmount() {
        const { resetConfirmationTimer } = this.props;

        resetConfirmationTimer();
    }

    resendSms = () => {
        const { analytics: { CATEGORY }} = this.props;

        ga.sendEvent(CATEGORY, 'sms-code-resend');
        this.sendSms();
    };

    sendSms = () => {
        const {
            initialValues,
            confirmMobilePhone
        } = this.props;

        confirmMobilePhone({
            confirmUser: {
                phone: initialValues.confirmUser.phone
            }
        });
    };

    returnToPrevStep = () => {
        const { dispatch, initialValues } = this.props;

        nextStep({
            confirmUser: {
                isDataCorrect: false,
                phone: initialValues.confirmUser.phone
            }
        }, dispatch);
    };

    render() {
        const {
            phoneConfirmationExpired,
            phoneConfirmationBlocked,
            handleSubmit,
            smsLiveTime,
            submitting,
            smsExpired,
        } = this.props;

        return (
            <Row>
                <Col xs={12}>
                    <h2>Confirma tu teléfono</h2>
                </Col>

                <Form onSubmit={handleSubmit(nextStep)} className="col-xs-12">
                    <Row>
                        <Col xs={12}>
                            <p>
                                Introduce el código SMS que te hemos enviado a
                                tu móvil para continuar con el proceso:
                            </p>
                        </Col>
                    </Row>
                    {phoneConfirmationBlocked && (
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
                    )}

                    {!phoneConfirmationBlocked && (
                        <Row>
                            <Field
                                className="col-xs-7 col-sm-6"
                                name="confirmUser.code"
                                label="Código SMS"
                                component={renderField}
                                maxLength={6}
                            />
                            <div className="clearfix" />

                            <HelperSection className="col-xs-7 col-sm-6">
                                {smsLiveTime && !phoneConfirmationExpired && (
                                    <span className="link">
                                        Enviar un nuevo código (
                                        <CountDown
                                            time={smsLiveTime}
                                            onTimeEnd={smsExpired}
                                        />)
                                    </span>
                                )}

                                {phoneConfirmationExpired && (
                                    <Button
                                        type="button"
                                        className="btn-link helper-section-btn"
                                        onClick={this.resendSms}
                                        name="resendSms"
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
                            disabled="disabled"
                            label="Teléfono móvil"
                            component={renderField}
                            name="confirmUser.phone"
                            type="tel"
                        />
                        <div className="clearfix" />

                        <StyledBlock className="col-xs-7 col-sm-7 first-step-return">
                            <Button
                                type="button"
                                className="btn-link phone-correction-btn"
                                onClick={this.returnToPrevStep}
                                name="returnToPrevStep"
                            >
                                ¿Número de teléfono incorrecto?
                            </Button>
                        </StyledBlock>
                    </Row>

                    <AgreementField>
                        <Row>
                            <Field
                                component={renderField}
                                fieldType="checkbox"
                                name="whatsAppAgreement.whatsAppAgreement"
                                label={
                                    <span className="ico-whatsapp">
                                    Consiento expresamente recibir comunicaciones a través de sistemas de mensajería instantánea como WhatsApp con la finalidad de agilizar tanto la gestión de los servicios pre contratados como de los contratados. Más información sobre privacidad de WhatsApp {' '}
                                        <a
                                            href="https://www.whatsapp.com/legal?eea=1&lang=es#terms-of-service"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                        aquí
                                    </a>
                                </span>
                                }
                            />
                        </Row>
                        <Row>
                            <Field
                                component={renderField}
                                fieldType="checkbox"
                                name="confirmPolicy.confirmPolicy"
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
                        </Row>
                    </AgreementField>

                    <Row>
                        <Col xs={12}>
                            <Button
                                disabled={submitting || phoneConfirmationBlocked}
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
            </Row>
        );
    }
}

export default compose(
    connect(state => ({
        phoneConfirmationExpired: state.signUp.phoneConfirmationExpired,
        phoneConfirmationBlocked: state.signUp.phoneConfirmationBlocked,
        smsLiveTime: state.signUp.smsLiveTime,
        jsonSchema: state.step.jsonSchema,
        initialValues: {
            ...state.step.data,
            confirmUser: {
                ...state.step.data.confirmUser,
                isDataCorrect: true
            }
        },
        phone: selector(state, 'confirmUser.phone'),
        analytics: state.step.analytics,
        enableReinitialize: true,
        header: state.header
    }), {
        confirmMobilePhone,
        smsExpired,
        resetConfirmationTimer
    }),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate,
        shouldAsyncValidate: ({ blurredField }) =>
            blurredField && blurredField.target && blurredField.target.type === 'button'
    })
)(ConfirmUserForm);

const StyledBlock = styled.div`
    .btn-link.phone-correction-btn {
        font-size: 14px;
        color: #9edc15;
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

const AgreementField = styled.div`
  padding-top: 20px;
  @media (max-width: 767px) {
     padding-top: 15px;
  }
  
  label {
    margin-top: 0;
  }
  
  .ico-whatsapp {
    padding-left: 30px;
    background: url(./img/ico-whatsapp.svg) no-repeat 0 0;
    background-size: contain;
    
    @media (max-width: 767px) {
      padding-left: 25px;
    }
  }
`;
