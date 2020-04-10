import { React, styled } from 'core-front/libs';
import { Modal, Button } from 'react-bootstrap';
import { Field, change, formValueSelector } from 'redux-form';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import insuranceDoc from './assets/insurance-doc.png';
import { renderField } from '../../../helpers/render';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getProduct, getCalculatorData, getInsuranceByType } from '../../../actions/calc';
import { ga } from 'core-front';

const selector = formValueSelector('editableCalculatorForm');

class Insurance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showButton: false,
            submitting: false
        };

        this.acceptInsurance = this.acceptInsurance.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.updateProductsByInsurance = this.updateProductsByInsurance.bind(this);
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    toggleShow = (e, value) => {
        if (value) {
            this.handleShow(true);
            e.preventDefault();
        } else {
            this.updateProductsByInsurance(false);
        }
    };

    updateProductsByInsurance = addInsurance => {
        const { dispatch, saved, editable, promoCode, formName, calcIsOpen } = this.props;
        const currentModel = calcIsOpen ? editable : saved;
        const currentProduct = getProduct(currentModel.amount, currentModel.duration);
        const insuranceType = addInsurance ? getInsuranceByType(currentProduct.insurances).type : 'NONE';

        getCalculatorData({ dispatch,
            initialValue: currentProduct,
            callOffer: true,
            insurance: insuranceType,
            promoCode }).then(() => {
            dispatch(change(formName, 'insurance', addInsurance));
            dispatch({ type: 'CALCULATOR_UPDATE_INSURANCE', insuranceType, insurance: addInsurance });
            this.handleClose();
        }).finally(() =>  {
            this.setState({ submitting: false });
        });
    };

    handleShow = showButton => {
        const { analytics: { CATEGORY }} = this.props;

        if (showButton) {
            ga.sendEvent(CATEGORY, 'insurance_checked');
        }
        this.setState({ show: true, showButton });
    };

    acceptInsurance = () => {
        const { analytics: { CATEGORY }} = this.props;

        this.setState({ submitting: true });
        ga.sendEvent(CATEGORY, 'insurance_tc_accept');
        this.updateProductsByInsurance(true);
    };

    getExpDescription = () => {
        const { experiments: { MMES_16808 }} = this.props;

        return {
            MMES_16808_B: 'Mejora tu aprobación incluyendo un seguro',
            MMES_16808_C: 'Tu préstamo sin sorpresas',
            MMES_16808_D: 'Asegura tu tranquilidad',
            MMES_16808_E: 'Incluye la mejor cobertura',
            MMES_16808_F: 'Minimiza tu riesgo',
        }[MMES_16808];
    };

    render() {
        const { experiments: { MMES_16808 }, insuranceInfo } = this.props;
        const { submitting } = this.state;

        return (
            <>
                {MMES_16808 === 'MMES_16808_G' ? (
                    <StyledInsuranceBlock isBoxed>
                        <h4>Ahora tu préstamo <br /> incluye un seguro de Allianz</h4>
                        <h5>Cobertura de accidentes, hospitalización y fallecimiento</h5>
                        <hr />
                        <p>Consulta las <span className="link" onClick={() => this.handleShow(false)}>condiciones del seguro</span></p>
                    </StyledInsuranceBlock>
                ) : (
                    <StyledInsuranceBlock>
                        <Field
                            name="insurance"
                            component={renderField}
                            fieldType="checkbox"
                            label={(
                                <>
                                    <h3>{this.getExpDescription()} <span>{insuranceInfo.price} €</span></h3>
                                    <span>No lo pagues ahora, págalo al final del préstamo</span>
                                </>
                            )}
                            onChange={this.toggleShow}
                        />
                        <p>Consulta las <span className="link" onClick={() => this.handleShow(false)}>condiciones del seguro</span></p>
                    </StyledInsuranceBlock>
                )}

                <StyledInsuranceModal
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered="true"
                    scrollable="true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Condiciones generales del seguro</Modal.Title>
                    </Modal.Header>

                    <div className="insurance-thumbnail">
                        <img src={insuranceDoc} alt="" onClick={() => this.setState({ isPreviewOpen: true })} />
                    </div>

                    {this.state.showButton && (
                        <Button
                            disabled={submitting}
                            onClick={this.acceptInsurance}
                            bsStyle="primary"
                            className="insurance-accept"
                        >
                            Entendido
                        </Button>
                    )}
                </StyledInsuranceModal>

                {this.state.isPreviewOpen && (
                    <Lightbox
                        mainSrc={insuranceDoc}
                        onCloseRequest={() => this.setState({ isPreviewOpen: false })}
                        reactModalStyle={{ overlay: { zIndex: 1050 }}}
                    />
                )}
            </>
        );
    }
}

export default compose(
    connect(state => ({
        experiments: state.step.experiments,
        saved: selector(state, 'savedValues'),
        editable: selector(state, 'editable'),
        analytics: state.step.analytics,
        calcIsOpen: state.calc.isOpen,
        insuranceInfo: state.calc.isOpen
            ? getInsuranceByType(selector(state, 'editable').insurances)
            : getInsuranceByType(selector(state, 'savedValues').insurances)
    })),
)(Insurance);

const StyledInsuranceBlock = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    box-sizing: border-box;
    ${({ isBoxed }) => isBoxed && `
        padding: 20px;
        background: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    `}
    h5 {
      font-size: 15px;
      font-weight: 600;
    }
    h4 {
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        padding-top:5px;
        padding-bottom:5px;
        padding-left: 65px;
        margin-top: 0;
        margin-bottom: 15px;
        background-image: url(./img/allianz-logo.png);
        background-repeat: no-repeat;
        background-position: 0;
    }
    h3 {
        line-height: 1.2;
        margin-top: 0;
        font-size: 18px;
        font-weight: 700;
        padding-right: 50px;
        span {
          position:absolute;
          top:0;
          right:0;
        }
    }
    ul {
        list-style: none;
        padding-left: 30px;
        margin-bottom: 20px;
        li {
            color: #737373;
            margin-bottom: 3px;
            &:before {
                content: "\\2022";
                font-size: 22px;
                line-height: 18px;
                color: #9edc15;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
        }
    }
    label {
      margin:0;
      & > div {
        float: none;
      }
      input:focus {
        outline: none;
      }
    }
    hr + p {
        margin: 0;
    }
    p {
        font-size: 12px;
        margin: 10px 0 0 40px;
        .link {
            text-decoration: underline;
            cursor: pointer;
            color: #666;
            font-weight: 700;
        }
    }
    @media (max-width: 767px) {
      ul {
        padding-left: 15px;
        li {
            font-size: 12px;
            margin-bottom: 5px;
            &:before {
                font-size: 14px;
                line-height: 14px;
            }
        }
      }
    }
`;

const StyledInsuranceModal = styled(Modal)`
    .modal-dialog {
        @media (max-width: 767px) {
          margin:0;
      }
    }
    .modal-content {
        padding: 60px 40px 30px;
        .modal-header {
          padding:0;
          h4.modal-title {
            font-size: 30px;
            font-weight: 700;
            margin: 0 0 20px;
        }
        .close {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 30px;
            top: 30px;
            cursor: pointer;
            outline: none;
            background-image: url(./img/ico-close-modal.svg);
            opacity: .9;
            font-size: 0;
            color: transparent;
                &:hover {
                  background-color: transparent;
                }
            }
        }
        .insurance-thumbnail {
            display: block;
            box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            margin-bottom: 10px;
            overflow-y: scroll;
            max-height: 600px;
            img {
                opacity: .5;
                width: 100%;
                height: auto;
                padding: 0;
                margin: 0;
                border: none;
                cursor:pointer;
            }
            &:hover img {
                opacity: .7;
            }
        }
        .insurance-accept {
            width: auto;
            display: block;
            margin: 30px auto 0;
            padding: 13px 90px;
            text-transform: uppercase;
        }
        @media (max-width: 767px) {
            padding: 20px;
            margin: 20px;
            .modal-header {
                h4.modal-title {
                    font-size: 17px;
                    margin-top: 25px;
                    line-height: 1.1;
                }
                .close {
                      transform: scale(.7);
                      top: 20px;
                      right: 20px;
                }
            }
            .insurance-accept {
                width: 100%;
                margin-top: 20px;
                text-align: center;
                padding-left: 0;
                padding-right: 0;
                font-size: 14px;
            }
        }
    }
`;
