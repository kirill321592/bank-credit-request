import { React, styled } from 'core-front/libs';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { initIovation } from 'core-front/actions/iovation';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getCalculatorData, resetCalc } from '../../actions/calc';
import onSubmitFail from '../../helpers/onSubmitFail';
import { EditableCalculator, JuicyScore, PrivatePolicy } from '../../components';
import { renderField } from '../../helpers/render';
import { nextStep } from '../../actions/step';
import iconCO from './assets/ic-counteroffer.svg';
import { sendJuicyScoreEvent, getUserBrowserData } from '../../actions/juicyScore';
import { SETTINGS } from '../../settings';
import Insurance from './Insurance';
import RecurringAddon from './RecurringAddon';
import { ga } from 'core-front';

const FORM_NAME = 'calculatorForm';
const selector = formValueSelector(FORM_NAME);

class CalculatorForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promoCodeStatus: '',
            showPromoBtn: false
        };

        this.showPromoBtn = this.showPromoBtn.bind(this);
        this.hidePromoBtn = this.hidePromoBtn.bind(this);
        this.preSubmitAction = this.preSubmitAction.bind(this);
        this.changeData = this.changeData.bind(this);
    }

    componentDidMount() {
        const { dispatch, initIovation, product } = this.props;

        initIovation(blackBoxes => {
            dispatch(change(FORM_NAME, 'iovation.blackbox', blackBoxes));
        });

        if (product) {
            dispatch(change(FORM_NAME, 'calculator.product', product.id));
        }
    }

    showPromoBtn() {
        this.setState({ showPromoBtn: true });
    }

    hidePromoBtn() {
        const { promoCode } = this.props;

        if (!promoCode) {
            this.setState({ showPromoBtn: false });
        }
    }

    componentDidUpdate(prevProps) {
        const { product, dispatch } = this.props;

        if (prevProps.product.id !== product.id) {
            dispatch(change(FORM_NAME, 'calculator.product', product.id));
        }
    }

    preSubmitAction(values, dispatch) {
        const { insuranceType, analytics: { CATEGORY }, recurring } = this.props;
        const recurringData = recurring ? { transferSource: { type: 'BANK_ACCOUNT' }}: {};

        if (insuranceType !== 'NONE') {
            ga.sendEvent(CATEGORY, 'insurance_taken');
        }

        sendJuicyScoreEvent();

        return nextStep({
            ...values,
            ...(getUserBrowserData(values.juicyScore)),
            ...recurringData
        }, dispatch);
    }

    changeData() {
        const { dispatch } = this.props;

        return nextStep({
            calculatorGenericProperties: {
                isDataIncorrect: true
            }
        }, dispatch);
    }


    render() {
        const {
            handleSubmit,
            asyncValidate,
            promoCode,
            counterOffer,
            recurring,
            offer,
            initialValues,
            submitting,
            promoApplied,
            experiments: { MMES_16808 },
            analytics: { CATEGORY }
        } = this.props;
        const { promoCodeStatus, showPromoBtn } = this.state;

        return (
            <Row>
                <Col xs={12}>
                    {!counterOffer && !recurring &&  (
                        <h2>¡Último paso!</h2>
                    )}

                    {recurring && (
                        <h2>Revisa tu información</h2>
                    )}

                    {counterOffer && (
                        <CounterOfferHeader>
                            <h2 className="clearfix">
                                <img src={iconCO} alt="Counter offer icon" />
                                <span>
                                        Te ofrecemos un préstamo a medida
                                </span>
                            </h2>
                            <p>No podemos ofrecerte un préstamo con las condiciones
                                que solicitas, por eso te proponemos las siguientes:
                            </p>
                        </CounterOfferHeader>
                    )}

                    <EditableCalculator isCalculatorStep callOffer />

                    {recurring && (
                        <RecurringAddon
                            CATEGORY={CATEGORY}
                            initialValues={initialValues}
                            changeData={this.changeData}
                        />
                    )}

                    <StyledCalculatorForm onSubmit={handleSubmit(this.preSubmitAction)} noValidate>
                        {!counterOffer && !promoApplied && (
                            <StyledPromoBlock
                                className={promoCodeStatus}
                            >
                                <PromocodeField
                                    filled={showPromoBtn || !!promoCode}
                                >
                                    <Field
                                        onFocus={this.showPromoBtn}
                                        onBlur={this.hidePromoBtn}
                                        name="promoCode"
                                        component={renderField}
                                        fieldType="text"
                                        placeholder="CÓDIGO PROMOCIONAL"
                                    />
                                </PromocodeField>

                                {(showPromoBtn || promoCode) && (
                                    <Button
                                        className="form-button"
                                        onClick={(...args) => {
                                            asyncValidate(...args).then(() => {
                                                this.setState({ promoCodeStatus: 'valid' });
                                            }).catch(() => {
                                                this.setState({ promoCodeStatus: 'invalid' });
                                            });
                                        }}
                                        name="submitPromoBtn"
                                        type="button"
                                    >
                                        APLICAR
                                    </Button>
                                )}

                            </StyledPromoBlock>
                        )}

                        {MMES_16808 && MMES_16808 !== 'MMES_16808_A' && (
                            <Insurance
                                promoCode={promoCode}
                                formName={FORM_NAME}
                            />
                        )}

                        <AgreementSection>
                            <Field
                                className="checkbox col-xs-12"
                                name="offerConfirmation.agree"
                                component={renderField}
                                fieldType="checkbox"
                                label={
                                    <span>Comprendo y acepto los Términos y Condiciones de contratación
                                        y la información del modelo normalizado
                                    </span>
                                }
                            />

                            {initialValues.hasOwnProperty('whatsAppAgreement') && (
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
                            )}
                        </AgreementSection>

                        <Button
                            disabled={submitting}
                            bsStyle="primary"
                            bsSize="large"
                            name="nextBtn"
                            type="submit"
                            block
                        >
                            CONFIRMAR SOLICITUD
                        </Button>

                        <StyleOfferBlock>
                            <div dangerouslySetInnerHTML={{ __html: offer }} />
                        </StyleOfferBlock>

                        <PrivatePolicy />

                        <JuicyScore />

                    </StyledCalculatorForm>
                </Col>
            </Row>
        );
    }
}

export default compose(
    connect(state => ({
        product: state.calc.savedProduct,
        promoApplied: state.calc.messages.includes(SETTINGS.CALCULATOR.MESSAGE_TYPES.INFO_PROMO_APPLIED),
        offer: state.calc.offer,
        insuranceType: state.calc.insuranceType,
        promoCode: selector(state, 'promoCode'),
        jsonSchema: state.step.jsonSchema,
        initialValues: state.step.data,
        header: state.header,
        analytics: state.step.analytics,
        experiments: state.step.experiments,
    }), {
        getCalculatorData,
        initIovation
    }),
    reduxForm({
        form: FORM_NAME,
        enableReinitialize: true,
        validate,
        onSubmitFail,
        touchOnChange: true,
        asyncValidate: ({ promoCode }, dispatch, { product, insuranceType }) => {
            return getCalculatorData({ dispatch, promoCode, initialValue: product, callOffer: true,
                insurance: insuranceType });
        },
        onSubmitSuccess: (result, dispatch) => resetCalc(dispatch),
        shouldAsyncValidate: ({ blurredField }) =>
            blurredField && blurredField.target && blurredField.target.type === 'button',
    }),
)(CalculatorForm);

const CounterOfferHeader = styled.div`
  margin-bottom: 30px;

  h2 {
      img {
        float: left;
      }

      span {
           display: block;
           overflow: hidden;
           padding-left: 7px;
       }
  }
`;

const PromocodeField = styled.div`
    max-width: ${props => props.filled ? '65%' : '100%'};
    transition: max-width .3s ease;

    label {
      margin: 0;
    }

    .form-control {
      margin-top: 0;
      text-align: center;
    }
`;
const StyledPromoBlock = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  &.valid, &.invalid {
    .form-button {
        color: white;
        border: solid #fff;
        border-width: 1px 1px 1px 0;
      }
  }
  &.valid {
    .form-control {
      &:focus {
        border-color: #9edc15;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #9edc15;
      }
    }
    .form-button {
      background: #9edc15;
    }
  }
  &.invalid {
    .form-control {
      &:focus {
        border-color: #ff5f5f;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff5f5f;
      }
    }

    .form-button {
      background: #ff5f5f;
    }
  }

   .form-button {
        color: #4c4c4c;
        position: absolute;
        top: 0;
        right: 0;
        width: 35%;
        height: 100%;
        opacity: 1;
        text-transform: uppercase;
        transition: opacity .3s ease;
        z-index: 11;
        background-image: linear-gradient(180deg,#fff,#c9c9c9);
        box-shadow: inset 0 1px 2px 0 rgba(0,0,0,.2);
        border-radius: 0 4px 4px 0;
        font-size: 15px;
        font-weight: 600;
        border: none;
    }
`;

const StyledCalculatorForm = styled.form`
    margin-top: 30px;

    label.checkbox {
      margin-bottom: 30px;
    }

    label {
        font-size: 14px;
        padding: 0;
    }
`;

const AgreementSection = styled.div`
  label + label {
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

const StyleOfferBlock = styled.div`
    border-radius: 4px;
    background-color: #fefefe;
    position: relative;
    padding: 20px 20px 10px;
    font-weight: 500;
    line-height: 1.67;
    margin: 30px 0;
    &:before, &:after {
        content: "";
        display: block;
        width: 100%;
        left: 0;
        position: absolute;
        z-index: 2;
    }
    &:before {
        bottom: 25px;
        height: 25px;
        background-image: linear-gradient(180deg,hsla(0,0%,100%,0),#fff);
    }
    &:after {
        bottom: 0;
        height: 25px;
        background-color: #fefefe;
    }
    & > div {
        width: 100%;
        min-height: 50px;
        max-height: 230px;
        border: 0;
        padding: 0;
        overflow: auto;
        position: relative;
        z-index: 1;
        p {
            font-size: 1em;
        }
        
        div, table {
            width: 100% !important;
            margin: 0 !important;
            padding-bottom: 30px;
        }
    }
`;