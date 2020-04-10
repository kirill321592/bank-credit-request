import { React, styled } from 'core-front/libs';
import { Field } from 'redux-form';
import cardMaster from "../../Registration/DebitCard/assets/card-mastercard.png";
import cardVisa from "../../Registration/DebitCard/assets/card-visa.png";
import { renderField, StyledRadioWrap, StyledRadio } from '../../helpers/render';
import { init, load, toggleCardType, toggleCardView, onCardSuccess, onCardError, paylandsProcessor } from '../../actions/debitCard';
import { compose } from "redux";
import { connect } from "react-redux";

class PaylandsWidget extends React.Component {
    componentDidUpdate() {
        const { widget: { verified } } = this.props;
        const iframe = document.querySelectorAll("#payment iframe")[0];
        if (verified) {
            paylandsProcessor.resolve(true);
            iframe.setAttribute('tabindex', '-1');
        } else {
            iframe.removeAttribute('tabindex');
        }
    }
    componentDidMount() {
        const { load, init, paylands, onCardSuccess, onCardError} = this.props;

        window.addEventListener('savedCard', onCardSuccess);
        window.addEventListener('error', onCardError);
        window.addEventListener('errorServer', onCardError);

        load(() => init(paylands));
    }

    componentWillUnmount() {
        const { onCardSuccess, onCardError} = this.props;

        window.removeEventListener('savedCard', onCardSuccess);
        window.removeEventListener('error', onCardError);
        window.removeEventListener('errorServer', onCardError);
    }

    render() {
        const { widget: { widgetStatus, errorMessage, cardType, cardSkip, verified },
            experiments,
            paylands: { card, suspiciousBorrower },
            toggleCardType,
            toggleCardView,
            hideSkipCheckbox } = this.props;

        const hideSkipButton = hideSkipCheckbox || (experiments['MMES_9989'] && experiments['MMES_9989'] === 'MMES_9989_B') || suspiciousBorrower;

        return (
            <DirectDebitWrapper>
                <div className={cardSkip ? 'hidden' : ''}>
                    <div>
                        <div className="card_form">
                            <div className="row">
                                <div className="card_images">
                                    <img src={ cardMaster } alt="master-card"/>
                                    <img src={ cardVisa } alt="visa"/>
                                </div>
                                <div className="col-xs-12 card_title">
                                    Detalles de tarjeta
                                </div>
                                {card && (
                                    <div className="col-xs-12 card_type">
                                        <StyledRadioWrap className="vertical-type">
                                            <label>
                                                <input type="radio" name="cardType" id="EXIST_CARD" value="EXIST_CARD" onClick={ toggleCardType } defaultChecked/>
                                                <StyledRadio><i/></StyledRadio>
                                                <strong>
                                                    Usar los datos de la tarjeta proporcionada previamente {card}
                                                </strong>
                                            </label>
                                        </StyledRadioWrap>
                                        <StyledRadioWrap className="vertical-type">
                                            <label>
                                                <input type="radio" name="cardType" id="NEW_CARD" value="NEW_CARD" onClick={ toggleCardType }/>
                                                <StyledRadio><i/></StyledRadio>
                                                <strong>
                                                    Añadir los datos de una tarjeta nueva
                                                </strong>
                                            </label>
                                        </StyledRadioWrap>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`paylands-widget-block ${cardType !== "EXIST_CARD" ? '' : 'hidden'} ${verified ? 'disabled' : ''}`}>
                                <Field
                                    className="text-uppercase-for-field card-label"
                                    name="paylands.cardHolder"
                                    placeholder="CARLOS GARCIA"
                                    label="Titular de la tarjeta"
                                    tabIndex={verified ? '-1': ''}
                                    component={ renderField }
                                />

                                <div className="form-label card-label">
                                    <span className="form-label-text">Tarjeta</span>
                                    <div id="payment"/>
                                </div>

                                { ['PAYLANDS_CARD_BLOCKED', 'PAYLANDS_ERROR'].includes( widgetStatus ) &&
                                <div className="alert alert-danger error-msg" role="alert">{ errorMessage }</div>
                                }
                            </div>
                        </div>
                    </div>

                    {cardType === "NEW_CARD" && (
                        <p className="text-justify iframe-bottom-text small">
                            Sólo tarjetas de débito, NO de crédito. La utilizaremos para activar el pago
                            automático y así realizar tus pagos mensuales cómodamente. No haremos ningún cargo
                            en tu tarjeta hasta la fecha de pago de la cuota del préstamo.
                        </p>
                    )}
                </div>

                {(!hideSkipButton && widgetStatus !== 'PAYALANDS_WAITING') && (
                    <SkipCardField className="row">
                        <Field
                            component={renderField}
                            fieldType="checkbox"
                            name="paylands.skip"
                            label="No tengo tarjeta de débito"
                            onChange={toggleCardView}
                        />
                    </SkipCardField>
                )}
            </DirectDebitWrapper>
        );
    }
}

export default compose(
    connect(state => ({
        widget: state.debitCard,
        experiments: state.step.experiments,
    }), {
        load,
        init,
        toggleCardType,
        toggleCardView,
        onCardSuccess,
        onCardError
    }),
)(PaylandsWidget);

const DirectDebitWrapper = styled.div`
   .direct-debit-header {
      .text-radio {
        font-weight: 600;
      }
    }

    .paylands-widget-block {

      #payment {
        margin-left: -15px;
        margin-right: -15px;
        height: 110px;
      }

      .error-msg {
        text-align: center;
      }

      &.paylands-recurrent {
        padding-top: 0;
      }

      &.disabled {
        position: relative;
        pointer-events: none;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(../img/card-success.svg);
          background-repeat: no-repeat;
          background-position: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          z-index: 10;
        }
      }
    }

    .card_form {
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      padding: 40px;
      position: relative;
      margin-bottom: 30px;
      .text-radio {
        color: #bbb;
      }
      &-recurrent {
        margin-top: 15px;
        margin-left:-10px;
        margin-right:-10px;
        padding: 0 10px;
      }
    }

   .card_title {
     font-size: 1.30em;
     font-weight: 700;
   }
   
   .card_type {
      margin-top:20px;
   }

   .card_form .form-label {
     font-size: 1.15em;
     font-weight: 500;
     color: #bbb;
   }

   .card_form .form-control {
     font-size: 14px;
     font-weight: 400;
     padding: 20px;
   }

    .card_images {
      position: absolute;
      right: 40px;
      top: 40px;
    }

    .card_images svg {
      width: 90px;
      float: right;
    }

    .card-omit {
      font-size: 1.2em;
      font-weight: 500;
      display: block;
      text-align: center;
      color: #4c4c4c;
    }

    .card-label {
       font-size: 1.15em;
       font-weight: 500;
       color: #bbb;
       margin-top: 15px;
       margin-bottom: 10px;
       input.form-control {
         height: 34px;
         font-size: 14px;
         font-weight: 400;
         margin-top: 5px;
         padding: 6px 12px;
         box-shadow: none;
         border: 1px solid #ccc;
       }
   }

   .skip-section {
      margin-bottom: 25px;
   }

    @media (max-width: 767px) {
      .card_form {
        padding: 20px;
      }
      .card_images {
        right: 20px;
        top: 20px;
      }
      .card_images img {
        max-height: 15px;
      }
      .card_title {
        font-size: 1.1em;
      }
      .card_form .form-label {
        font-size: 1em;
      }
      .card-omit {
        font-size: 1.1em;
        margin-bottom: 20px;
      }
    }
`;

const SkipCardField = styled.div`
    margin-top: 30px;
    & > label {
        margin-bottom: 0;
    }
`;