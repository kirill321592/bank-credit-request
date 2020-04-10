import { React, styled } from 'core-front/libs';
import { validate } from 'core-front/helpers/schemeValidator';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { Form, Field, reduxForm, change, formValueSelector  } from 'redux-form';
import { ga } from 'core-front';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { renderField, replaceMask } from '../../helpers/render';
import onSubmitFail from '../../helpers/onSubmitFail';
import { PrivatePolicy } from '../../components';
import { nextStep } from '../../actions/step';

import ibanEmample from './assets/iban.jpg';
import SkipBankAccountModal from './SkipBankAccountModal';

const FORM_NAME = 'transferSourceForm';
const selector = formValueSelector(FORM_NAME);

class TransferSource extends React.Component {
    constructor(props) {
        super(props);

        this.showExampleIban = this.showExampleIban.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showIbanExample: false,
            showBankAccountModal: false
        };
    }

    handleClose() {
        this.setState({ showIbanExample: false });
    }

    showExampleIban() {
        this.setState({ showIbanExample: true });
    }

    componentDidUpdate(prevProps) {
        const { bankApi, analytics: { CATEGORY } } = this.props;

        if (prevProps.bankApi !== bankApi && bankApi === 'NONE') {
            ga.sendEvent(CATEGORY, 'show-no-online-banking-modal');
            this.setState({ showBankAccountModal: true });
        }
    }

    render() {
        const { showIbanExample, showBankAccountModal } = this.state;
        const { handleSubmit, initialValues, submitting, analytics: { CATEGORY }} = this.props;

        return (
            <>
                <h2>Cuenta bancaria</h2>

                <Modal show={showIbanExample} onHide={this.handleClose}>
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
                            name="bankAccount.iban"
                            component={renderField}
                            fieldType="masked"
                            parse={replaceMask}
                            mask="ES99 9999 9999 9999 9999 9999"
                        />

                        {initialValues.bankApi && (
                            <>
                                <Field
                                    options={{ values: ['INSTANTOR', 'NONE'], type: 'BANK_API' }}
                                    component={renderField}
                                    fieldType="radio"
                                    label="¿Tienes banca online?"
                                    name="bankApi.type"
                                />

                                <BankApiDescription className="col-xs-12">
                                    <p>
                                        <small><b>Ventajas de utilizar banca online:</b></small>
                                    </p>
                                    <ol className="list-reset-indent">
                                        <li>Validación automática del DNI y cuenta bancaria (Instantor)</li>
                                        <li>Envío instantáneo de dinero</li>
                                        <li>Mayor probabilidad de conseguir el préstamo</li>
                                    </ol>
                                </BankApiDescription>
                            </>
                        )}

                        <Col xs={12}>
                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                name="nextBtn"
                                type="submit"
                                disabled={submitting}
                                block
                            >
                                Siguiente paso
                            </Button>

                            <PrivatePolicy />
                        </Col>
                    </Row>

                    <SkipBankAccountModal
                        CATEGORY={CATEGORY}
                        open={showBankAccountModal}
                        applyBankApi={() => {
                            const { dispatch, initialValues } = this.props;

                            this.setState({ showBankAccountModal: false });
                            dispatch(change(FORM_NAME, 'bankApi.type', initialValues.bankApi.type));
                        }}
                        applySkip={() => {
                            this.setState({ showBankAccountModal: false });
                        }}
                    />
                </Form>
            </>
        );
    }
}

export default compose(
    connect(state => ({
        jsonSchema: state.step.jsonSchema,
        analytics: state.step.analytics,
        bankApi: selector(state, 'bankApi.type'),
        initialValues: {
            ...state.step.data,
            transferSource: {
                type: 'BANK_ACCOUNT'
            }
        },
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate,
        onSubmitSuccess: (result, dispatch, props) => {
            const { values: { bankApi }, analytics: { CATEGORY }} = props;

            if (bankApi) {
                switch (bankApi.type) {
                case 'INSTANTOR':
                    ga.sendEvent(CATEGORY, 'IB-yes');
                    break;
                case 'NONE':
                default:
                    ga.sendEvent(CATEGORY,'IB-no');
                    break;
                }
            }
        }
    }),
)(TransferSource);

const ImageHint = styled.div`
  text-align: center;
  img {
      display: inline-block;
      max-width: 100%;
  }
`;

const BankApiDescription = styled.div`
  padding-top: 15px;

  .list-reset-indent {
      margin-left: 0;
      padding-left: 0;
      list-style-position: inside;
  }
`;
