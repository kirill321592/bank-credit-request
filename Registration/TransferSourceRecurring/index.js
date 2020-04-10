import { React } from 'core-front/libs';
import { validate } from 'core-front/helpers/schemeValidator';
import { Row, Col, Button } from 'react-bootstrap';
import { Form, Field, reduxForm, getFormValues } from 'redux-form';
import { gaw } from 'core-front/actions/ga';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { renderField, replaceMask } from '../../helpers/render';
import onSubmitFail from '../../helpers/onSubmitFail';
import { PrivatePolicy, PaylandsWidget } from '../../components';
import { asyncValidateCard, onSubmitFailCard } from '../../actions/debitCard';
import { nextStep } from '../../actions/step';

const FORM_NAME = 'transferSourceRecurringForm';

class TransferSourceRecurrent extends React.Component {
    constructor(props) {
        super(props);

        this.preSubmitAction = this.preSubmitAction.bind(this);
    }

    preSubmitAction = (values, dispatch) => {
        const { widget: { paylands, cardType, cardSkip }} = this.props;

        if (cardType === 'EXIST_CARD' || cardSkip) {
            values.paylands.cardHolder = null;
        } else {
            values.paylands.response = paylands;
        }

        return nextStep({
            ...values,
            transferSource: {
                type: 'BANK_ACCOUNT'
            },
            directDebit: {
                type: 'PAYLANDS'
            }
        }, dispatch);
    };


    render() {
        const { handleSubmit, initialValues: { paylands }, submitting } = this.props;

        return (
            <>
                <h2>Cuenta bancaria</h2>

                <Form onSubmit={handleSubmit(this.preSubmitAction)}>
                    <Row>
                        <Field
                            className="col-xs-12 text-uppercase-for-field"
                            name="bankAccount.iban"
                            component={renderField}
                            fieldType="masked"
                            parse={replaceMask}
                            mask="ES99 9999 9999 9999 9999 9999"
                        />

                        <Field
                            options={{ values: ['INSTANTOR', 'NONE'], type: 'BANK_API' }}
                            component={renderField}
                            fieldType="radio"
                            label="¿Tienes banca online?"
                            name="bankApi.type"
                        />

                        <Col xs={12}>
                            <p><strong>Introduce tu tarjeta de débito</strong></p>

                            <PaylandsWidget
                                paylands={paylands}
                            />
                        </Col>

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
                </Form>
            </>
        );
    }
}

export default compose(
    connect(state => ({
        jsonSchema: state.step.jsonSchema,
        analytics: state.step.analytics,
        initialValues: state.step.data,
        widget: state.debitCard,
        formValues: getFormValues(FORM_NAME)(state),
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        asyncValidate: asyncValidateCard,
        onSubmitFail: (errors, dispatch) => {
            onSubmitFailCard(errors, dispatch);
            onSubmitFail(errors, dispatch);
        },
        validate: (values, props) => {
            const { cardType, cardSkip } = props.widget;

            if (cardType === 'EXIST_CARD' || cardSkip) delete props.jsonSchema.paylands;
            return validate(values, props);
        },
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
        },
        shouldAsyncValidate: ({ syncValidationPasses, trigger }) => {
            return syncValidationPasses && trigger === 'submit';
        },
    }),
)(TransferSourceRecurrent);