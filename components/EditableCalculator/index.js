import { React, styled } from 'core-front/libs';
import { ga, FormattedDate } from 'core-front';
import { Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, reduxForm, formValueSelector, change } from 'redux-form';
import { SETTINGS } from '../../settings';
import {
    getCalculatorData,
    updateSettings,
    getOffer,
    getDurationByIndex,
    getProduct,
    toggleCalculatorView,
    getInsuranceByType,
    setSavedValues } from '../../actions/calc';
import { Calculator } from '../index';

const FORM_NAME = 'editableCalculatorForm';
const selector = formValueSelector(FORM_NAME);
const CALC_STORAGE = 'MM_CALCULATOR';

const amountInfo = ({ paymentsCount = 1, installment, total, info=[], defaultInstallment, defaultTotal }) => {
    const isPromocodeApplied = info.includes(SETTINGS.CALCULATOR.MESSAGE_TYPES.INFO_PROMO_APPLIED);

    if (paymentsCount > 1) {
        return (
            <>
                <span className="total-back-text">{paymentsCount} cuotas de: </span>
                <span className="total-back">
                    {isPromocodeApplied && (
                        <span className="total-back-cross">{Math.round(defaultInstallment)}€</span>
                    )}
                    {Math.round(installment)}€
                </span>
            </>
        );
    } else {
        return (
            <>
                <span className="total-back-text">Total devolver: </span>
                <span className="total-back">
                    {isPromocodeApplied && (
                        <span className="total-back-cross">{Math.round(defaultTotal)}€</span>
                    )}
                    {Math.round(total)}€
                </span>
            </>
        );
    }
};

const durationInfo = ({ paymentsCount = 1, dueDate, firstPaymentDate }) => {
    if (paymentsCount > 1 && firstPaymentDate) {
        return (
            <>
                <span className="getDate-text">Fecha del primer pago</span>:<br />
                <FormattedDate
                    date={firstPaymentDate}
                    format="DD/MM/YYYY"
                />
            </>
        );
    } else {
        return (
            <>
                <span className="getDate-text">Fecha de devolución</span>:<br />
                <FormattedDate
                    date={dueDate}
                    format="DD/MM/YYYY"
                />
            </>
        );
    }
};

class EditableCalculator extends React.Component {
    componentDidMount() {
        const { dispatch, callOffer, calcReadyStatus, data={}} = this.props;

        if (calcReadyStatus === 'CALC_INVALID' ||
            (data.decisionReason && data.decisionReason.reason === 'CONFIRM_COUNTER_OFFER')) {
            this.loadProducts();
        } else if (callOffer) {
            getOffer(dispatch);
        }
    }

    loadProducts() {
        const { dispatch, callOffer, experiments: { MMES_16808 }} = this.props;
        const calcStorage = window.localStorage.getItem(CALC_STORAGE);
        let initialValue;
        let insurance;

        try {
            initialValue = JSON.parse(calcStorage);
            if (MMES_16808 === 'MMES_16808_G') {
                insurance = getInsuranceByType(initialValue.insurances).type;
                dispatch({ type: 'CALCULATOR_UPDATE_INSURANCE', insurance });
            }
            getCalculatorData({ dispatch, initialValue, callOffer, insurance });
        } catch (e) {
            getCalculatorData({ dispatch, callOffer });
        }
    }

    componentDidUpdate(prevProps) {
        const { calcReadyStatus } = this.props;

        if ((prevProps.calcReadyStatus !== calcReadyStatus) && calcReadyStatus === 'RELOAD_CALCULATOR') {
            this.loadProducts();
        }
    }

    getDurationByIndex = durationIndex => {
        const { editable: { amount }} = this.props;

        return getDurationByIndex(durationIndex, amount);
    };

    toggle = areValuesChanged => {
        const { toggleCalculatorView, isOpen, analytics: { CATEGORY }} = this.props;

        if (isOpen) {
            ga.sendEvent(CATEGORY, `calculator-close-changes-${areValuesChanged ? 'yes' : 'no'}`);
        } else {
            ga.sendEvent(CATEGORY, 'calculator-open');
        }

        toggleCalculatorView(isOpen);
    };

    setCalcValues = values => {
        const { dispatch, form, callOffer, saved: { amount, duration }} = this.props;
        const areValuesChanged = (values.editable.amount !== amount || values.editable.duration !== duration);

        dispatch(change(form, 'savedValues', values.editable));
        setSavedValues(dispatch, values.editable);

        if (callOffer) {
            getOffer(dispatch, values.editable.id);
        }

        this.toggle(areValuesChanged);
    };

    renderDiscount = () => {
        const { isCalculatorStep, editable={}, isOpen } = this.props;
        const { CALCULATOR: { MESSAGE_TYPES }} = SETTINGS;

        if (isCalculatorStep && editable.info && editable.info.includes(MESSAGE_TYPES.INFO_PROMO_APPLIED) &&
            !isOpen) {
            return (
                <CalculatorInfo className="hidden-xs hidden-sm">
                    <strong>Descuento de {Math.round(editable.discount)} EUR</strong>
                </CalculatorInfo>
            );
        }
    };

    render() {
        const { editable = {}, config, updateSettings, handleSubmit, saved = {}, dispatch, isOpen,
            isCalculatorStep, insurance, experiments: { MMES_16808 }} = this.props;

        const initedInsurance = isCalculatorStep && insurance && insurance !== 'NONE';
        const showRequiredInsurance = MMES_16808 === 'MMES_16808_G';
        const showInsuranceAcceptText = initedInsurance && MMES_16808 !== 'MMES_16808_G' && MMES_16808 !== 'MMES_16808_A';

        return (
            <CalculatorWrapper>
                <EditableCalculatorWrapper open={isOpen}>
                    <Form onSubmit={handleSubmit(this.setCalcValues)}>
                        <div className="green-block">
                            <div className="calc-header">
                                <h4>
                                    <span className="hidden-md hidden-lg">Importe: </span>
                                    <span className="hidden-xs hidden-sm">Importe del préstamo: </span>
                                    <span>{saved.amount} €</span>
                                </h4>
                                <h4>
                                    <span className="hidden-md hidden-lg">Duración: </span>
                                    <span className="hidden-xs hidden-sm">Duración total: </span>
                                    <span>{saved.duration} {saved.stepType !== 'MONTH' ? 'días' : 'm'}</span>
                                </h4>

                                <StyledButton
                                    type="button"
                                    className="edit-btn"
                                    name={isOpen ? 'closeCalculator': 'openCalculator'}
                                    onClick={() => {
                                        this.toggle(false);
                                    }}
                                    open={isOpen}
                                />
                            </div>

                            {editable.duration && editable.amount && (
                                <Calculator
                                    getDurationByIndex={this.getDurationByIndex}
                                    closed={!isOpen}
                                    changeCalculator={(a, d, changedField) => {
                                        const currentProduct = getProduct(a, d, changedField);

                                        updateSettings(currentProduct);
                                        dispatch(change(FORM_NAME, 'editable', currentProduct));
                                    }}
                                    editable={editable}
                                    config={config}
                                />
                            )}

                            <StyledCalcFooter open={isOpen} type="TEMP">
                                <Button
                                    type="submit"
                                    bsStyle="info"
                                    bsSize="large"
                                    name="saveChanges"
                                    block
                                >
                                    Guardar Cambios
                                </Button>

                                <div className="calc-info">
                                    <div className="calc-col">
                                        <span>Importe del préstamo</span>:
                                        <span className="total-money"> {editable.amount}</span><span>€</span><br />
                                        {amountInfo(editable)}
                                        {showInsuranceAcceptText && (<><br />(Seguro incluido)</>)}
                                    </div>
                                    <div className="calc-col">
                                        {durationInfo(editable)}
                                    </div>
                                </div>

                                <p className="calc-note">Ejemplo TAE: 300€ a 62 días. Coste préstamo: 148€. Total a
                                    devolver:
                                    448€. TAE 2035%.&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.moneyman.es/secci.php?pers=0.011&tae=3112.64&back=290&back_date=13%20de%20septiembre%20de%202018&current_time=30&current_sum=290&is62=false"
                                >Más información
                                </a>
                                </p>
                            </StyledCalcFooter>

                            <StyledCalcFooter open={!isOpen} type="MODEL" className="hidden-xs hidden-sm">
                                <div className="calc-info">
                                    <div className="calc-col">
                                        {amountInfo(saved)}
                                        {showInsuranceAcceptText && (<><br />(Seguro incluido)</>)}
                                    </div>
                                    <div className="calc-col">
                                        {durationInfo(saved)}
                                    </div>
                                </div>
                            </StyledCalcFooter>

                            {showRequiredInsurance && (
                                <StyledInsuranceAlert
                                    className="hidden-xs hidden-sm"
                                >Seguro incluido
                                </StyledInsuranceAlert>
                            )}

                            {this.renderDiscount()}
                        </div>
                    </Form>
                </EditableCalculatorWrapper>

                {isCalculatorStep && (
                    <DubbedMobileCalculator className="hidden-md hidden-lg">
                        <div className="green-block">
                            <div className="calc-header">
                                <h4 className="block-title">Importe del préstamo: {saved.amount} €
                                </h4>
                                <h4 className="block-title">Duración total: {saved.duration} {saved.stepType !== 'MONTH' ? 'días' : 'm'}
                                </h4>
                            </div>
                            <StyledCalcFooter open={true} type="MODEL">
                                <div className="calc-info">
                                    <div className="calc-col">
                                        {amountInfo(saved)}
                                        {showInsuranceAcceptText && (<><br />(Seguro incluido)</>)}
                                    </div>
                                    <div className="calc-col">
                                        {durationInfo(saved)}
                                    </div>
                                </div>
                            </StyledCalcFooter>

                            {this.renderDiscount()}

                            {showRequiredInsurance && (
                                <StyledInsuranceAlert>Seguro incluido</StyledInsuranceAlert>
                            )}
                        </div>
                    </DubbedMobileCalculator>
                )}
            </CalculatorWrapper>
        );
    }
}

export default compose(
    connect(state => ({
        calcReadyStatus: state.calc.readyStatus,
        jsonSchema: state.step.jsonSchema,
        data: state.step.data,
        editable: selector(state, 'editable'),
        saved: selector(state, 'savedValues'),
        initialValues: {
            savedValues: state.calc.savedProduct || state.calc.initialProduct,
            editable: state.calc.savedProduct || state.calc.initialProduct
        },
        isOpen: state.calc.isOpen,
        insurance: state.calc.insurance,
        config: {
            ...state.calc.config,
            amount: {
                ...state.calc.config.amount,
                step: 50
            },
            duration: {
                ...state.calc.config.duration,
                step: 1
            }
        },
        analytics: state.step.analytics,
        experiments: state.step.experiments,
    }), { updateSettings, toggleCalculatorView }),
    reduxForm({
        form: FORM_NAME,
        enableReinitialize: true
    })
)(EditableCalculator);

const CalculatorInfo = styled.div`
    padding: 10px;
    background: #fff;
    color: #4c4c4c;
    border-radius: 0 0 4px 4px;
    text-align: center;
    font-size: 16px;
    border-top: 2px solid #9edc16;
    margin: 15px -20px -20px;
`;

const StyledInsuranceAlert = styled.div`
    font-weight: 600;
    background-color: #8fc31e;
    background-image: url(./img/ic-secure.png);
    background-repeat: no-repeat;
    background-position: 20px;
    margin: 0 -20px -20px;
    padding: 18px 20px 18px 60px;
    font-size: 18px;
    margin-top:20px;
`;

const CalculatorWrapper = styled.div`
    .green-block {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      border-radius: 4px;
      background: #9edc15;
      color: #fff;
      padding: 20px;
      position: relative;
      margin-bottom: 0;
      width: 100%;
    }

    .calc-header {
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;
        transition: margin-bottom .4s ease;

        @media screen and (max-width: 991px) {
            border: none;
            padding-bottom: 0;
            position: relative;
            margin-bottom: ${props => props.open ? '30px' : '0'};
        }

        h4 {
            font-size: 1.3em;
            font-weight: 700;
            &:first-child {
                margin-top: 0;
            }

            @media screen and (max-width: 991px) {
                display: inline-block;
                margin: 0;
                font-size: 1em;
                font-weight: 500;
                margin-right: 20px;
            }
        }
    }
`;

const DubbedMobileCalculator = styled.div`
    .green-block {
        margin-bottom: 30px;
    }

    .calc-header {
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;

        h4.block-title {
            @media screen and (max-width: 991px) {
                display: block;
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: 700;
            }
        }
    }
`;

const EditableCalculatorWrapper = styled.div`
      margin-bottom: 30px;
      position: relative;

      @media screen and (max-width: 991px) {
        position: fixed;
        width: 100%;
        z-index: ${props => props.open ? 98 : 99};
        left: 0;
        border-radius: 0;
        border-top: 1px solid rgba(0,0,0,.3);
        min-height: ${props => props.open ? '100vh' : 'auto'};
        top: ${props => props.open ? '0' : '48px'};
        margin: 0 auto;
      }

      .green-block {
         @media screen and (max-width: 991px) {
            border-radius: 0;
            box-shadow: inset 0 3px 3px 0 rgba(0,0,0,.1);
            min-height: ${props => props.open ? '100%' : '0'};
            padding-top: ${props => props.open ? '68px' : '20px'};
            position: ${props => props.open ? 'absolute' : 'relative'};
            z-index: ${props => props.open ? 98 : 100};
         }
      }
`;

const StyledButton = styled(Button)`
    &.edit-btn {
        width: 26px;
        height: 26px;
        padding: 0;
        position: absolute;
        top: 20px;
        right: 20px;
        transition: .1s;
        background-color: transparent;
        background-image: url(./img/ico-${props => props.open ? 'close-green' : 'edit'}.svg);
        background-repeat: no-repeat;
        background-size: 26px 26px;
        background-position: 50%;
        opacity: .8;
        &:focus {
          outline: 0;
        }
        &:hover {
            opacity: 1;
        }
        @media (max-width: 991px) {
            top: 0;
            right: 0;
        }
    }
`;

const StyledCalcFooter = styled.section`
    max-height: ${props => props.open ? '500px' : '0'};
    overflow: hidden;
    transition: max-height ease .4s;

    @media screen and (max-width: 991px) {
      display: ${props => props.open ? 'block' : 'none'};
    }

    .btn {
        margin-top: ${props => props.type === 'TEMP' ? '20px' : '0'};

        @media screen and (max-width: 991px) {
          display: ${props => props.open ? 'block' : 'none'};
        }
    }

    @media (max-width: 375px) {
        max-height: ${props => props.open ? '500px' : '60px'};
    }

    .calc-info {
        display: table;
        width: 100%;
        font-size: 12px;
        line-height: 1.8;
        font-weight: 700;
        margin: 20px 0 0;
        transition: margin ease .4s;

        .calc-col {
            display: table-cell;
        }
    }
    
    .total-back-cross {
      display: inline-block;
      text-decoration: line-through;
      margin-right: 5px;
    }

    .calc-note {
        font-size: 9px;
        line-height: 1.62;
        letter-spacing: .5px;
        padding-top: 15px;
        border-top: 1px solid #fff;
        margin: 20px 0 0;
        a {
          color: #fff;
        }
    }
`;
