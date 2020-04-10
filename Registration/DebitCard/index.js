import { React, styled } from 'core-front/libs';
import { Form, reduxForm, getFormValues } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncValidateCard, onSubmitFailCard } from '../../actions/debitCard';
import onSubmitFail from '../../helpers/onSubmitFail';
import { PrivatePolicy, PaylandsWidget } from '../../components';
import { nextStep } from '../../actions/step';

const FORM_NAME = 'creditCardForm';

class DebitCardForm extends React.Component {
    constructor(props) {
        super(props);

        this.preSubmitAction = this.preSubmitAction.bind(this);
    }

    preSubmitAction = (values, dispatch) => {
        const { widget: { paylands, cardSkip }} = this.props;

        if (cardSkip) {
            values.paylands.cardHolder = null;
        } else {
            values.paylands.response = paylands;
        }

        return nextStep({
            ...values,
            directDebit: {
                type: 'PAYLANDS'
            }
        }, dispatch);
    };

    skipStep = () => {
        const { dispatch, initialValues } = this.props;

        nextStep(initialValues, dispatch);
    };

    render() {
        const { handleSubmit,
            submitting,
            experiments,
            initialValues: { paylands },
            widget: { widgetStatus }} = this.props;

        const hideSkipButton = (experiments['MMES_9989'] && experiments['MMES_9989'] === 'MMES_9989_B') ||
            paylands.suspiciousBorrower;

        return (
            <>
                <h2>Introduce tu tarjeta de débito</h2>
                <p>¡Activa el pago automático y aumenta la probabilidad de conseguir un préstamo!</p>

                <Form
                    onSubmit={handleSubmit((values, dispatch) =>
                        this.preSubmitAction(values, dispatch)
                    )} noValidate
                >
                    <Row>
                        <Col xs={12}>
                            <PaylandsWidget
                                paylands={paylands}
                                hideSkipCheckbox={true}
                            />
                        </Col>
                        <Col xs={12}>
                            <Button
                                disabled={submitting}
                                name="nextBtn"
                                type="submit"
                                bsStyle="primary"
                                bsSize="large"
                                block
                            >
                                Siguiente paso
                            </Button>

                            {!hideSkipButton && widgetStatus !== 'PAYALANDS_WAITING' && (
                                <StyledParagraph className="text-center skip-section">
                                    <Button
                                        className="btn-link green-link"
                                        onClick={this.skipStep}
                                        name="skipDebetCard"
                                        type="button"
                                    >
                                        No tengo tarjeta de débito
                                    </Button>
                                </StyledParagraph>
                            )}

                            <PrivatePolicy />
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

export default compose(
    connect(state => ({
        jsonSchema: state.step.jsonSchema,
        initialValues: state.step.data,
        widget: {
            ...state.debitCard
        },
        formValues: getFormValues(FORM_NAME)(state),
        experiments: state.step.experiments,
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        asyncValidate: asyncValidateCard,
        onSubmitFail: (errors, dispatch) => {
            onSubmitFailCard(errors, dispatch);
            onSubmitFail(errors, dispatch);
        },
        shouldAsyncValidate: ({ syncValidationPasses, trigger }) => {
            return syncValidationPasses && trigger === 'submit';
        },
        validate
    })
)(DebitCardForm);

const StyledParagraph = styled.p`
    .btn-link.green-link {
        margin-top: 0;
        font-size: 16.8px;
        color: #9edc15;
    }
`;