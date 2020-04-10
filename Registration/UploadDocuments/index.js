import { React, styled } from 'core-front/libs';
import { ga } from 'core-front';
import { Form, reduxForm, formValueSelector, Field, submit } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SkipUploadModal from './SkipUploadModal';

import onSubmitFail from '../../helpers/onSubmitFail';
import { renderField } from '../../helpers/render';
import { nextStep } from '../../actions/step';

const FORM_NAME = 'uploadDocumentsForm';
const selector = formValueSelector(FORM_NAME);

class UploadDocumentsForm extends React.Component {
    state = {
        skipModalIsShow: false,
        documents: []
    };

    componentDidMount() {
        const { initialValues } = this.props;
        const documents = [];

        if (initialValues.document && initialValues.document.value && initialValues.document.value.length) {
            initialValues.document.value.forEach(({ type }) => {
                documents.push(type);
            });
        }

        window.onbeforeunload = e => {
            let confirmationMessage = 'Tu préstamo está pre-aprobado. ¡Sube tus documentos!';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        this.setState({ documents });
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
    }

    renderTitle = () => {
        const { experiments } = this.props;

        switch (experiments['MMES_13799']) {
        case 'MMES_13799_C':
            return (
                <h2>¡Tu préstamo está aprobado! Tu dinero ya está en camino. ¡Sube tus documentos ahora!</h2>
            );
        default:
            return (
                <h2>Tu préstamo está pre-aprobado. ¡Sube tus documentos!</h2>
            );
        }
    };

    skipStep = () => {
        const { dispatch, analytics: { CATEGORY }} = this.props;

        ga.sendEvent(CATEGORY, 'skip');

        return nextStep({
            document: {
                values: []
            }
        }, dispatch);
    };

    checkLoadedCount = () => {
        const { averseINE, reverseINE, bankStatement } = this.props;
        const { documents } = this.state;
        let accountProofIsReady = true;

        if (documents.includes('ACCOUNT_PROOF')) {
            accountProofIsReady = bankStatement && bankStatement.length;
        }

        return averseINE && averseINE.length &&
            reverseINE && reverseINE.length &&
            accountProofIsReady;
    };

    checkSubmitStatus = () => {
        const { experiments } = this.props;

        if (experiments.hasOwnProperty('MMES_13799') && experiments.MMES_13799 !== 'MMES_13799_A') {
            return this.checkLoadedCount();
        } else {
            return true;
        }
    };

    preSubmitAction(values, dispatch) {
        const { averseINE, reverseINE, bankStatement, experiments } = this.props;
        const { skipModalIsShow, documents } = this.state;

        values = { document: { value: []}};

        if (averseINE && averseINE.length) {
            values.document.value.push({
                type: 'ID',
                uuid: averseINE
            });
        }

        if (reverseINE && reverseINE.length) {
            values.document.value.push({
                type: 'ID',
                uuid: reverseINE
            });
        }

        if (documents.includes('ACCOUNT_PROOF') && (bankStatement && bankStatement.length)) {
            values.document.value.push({
                type: 'ACCOUNT_PROOF',
                uuid: bankStatement
            });
        }

        switch (experiments['MMES_13799']) {
        case 'MMES_13799_A':
            if (skipModalIsShow || this.checkLoadedCount()) {
                return nextStep(values, dispatch);
            } else {
                this.setState({ skipModalIsShow: true });
            }
            break;
        default:
            return nextStep(values, dispatch);
        }
    }

    render() {
        const {
            handleSubmit,
            experiments,
            submitting
        } = this.props;
        const { skipModalIsShow, documents } = this.state;

        return (
            <>
                {this.renderTitle()}

                <p>
                    Haz fotos de tu documento de identidad con un tamaño
                    máximo de 10MB en formato JPG, PNG, PDF o TIFF.
                </p>

                <Form
                    onSubmit={handleSubmit((values, dispatch) =>
                        this.preSubmitAction(values, dispatch)
                    )}
                >
                    <Row>
                        <Field
                            component={renderField}
                            className="col-md-6"
                            name="AVERSE_ID"
                            fieldType="file"
                        />
                        <Field
                            component={renderField}
                            className="col-md-6"
                            name="REVERSE_ID"
                            fieldType="file"
                        />
                    </Row>
                    <p>
                        Haz una foto de cualquier documento de tu banco que
                        muestre el titular y los dígitos de la cuenta bancaria.
                    </p>

                    {documents.includes('ACCOUNT_PROOF') && (
                        <Row>
                            <Field
                                component={renderField}
                                className="col-md-6"
                                name="ACCOUNT_PROOF"
                                fieldType="file"
                            />
                        </Row>
                    )}

                    <Button
                        disabled={!this.checkSubmitStatus() || submitting}
                        bsStyle="primary"
                        bsSize="large"
                        name="nextBtn"
                        type="submit"
                        block
                    >
                        Enviar Para Aprobación
                    </Button>

                    {experiments['MMES_13799'] && experiments['MMES_13799'] === 'MMES_13799_A' && (
                        <SkipUploadModal
                            open={skipModalIsShow}
                            applySkip={() => {
                                const { dispatch, form } = this.props;

                                dispatch(submit(form));
                            }}
                            closeModal={() => {
                                this.setState({ skipModalIsShow: false });
                            }}
                        />
                    )}

                    {experiments['MMES_13799'] && experiments['MMES_13799'] === 'MMES_13799_B' && (
                        <StyledParagraph className="col-xs-12 text-center skip-link">
                            <Button
                                className="skip btn-link green-link"
                                onClick={this.skipStep}
                                name="skipUploadDocs"
                                type="button"
                            >
                                Prefiero subirlo en otro momento
                            </Button>
                        </StyledParagraph>
                    )}
                </Form>
            </>
        );
    }
}

export default compose(
    connect(state => ({
        bankStatement: selector(state, 'ACCOUNT_PROOF'),
        reverseINE: selector(state, 'REVERSE_ID'),
        averseINE: selector(state, 'AVERSE_ID'),
        jsonSchema: state.step.jsonSchema,
        initialValues: state.step.data,
        experiments: state.step.experiments,
        analytics: state.step.analytics,
        header: state.header
    })),
    reduxForm({
        form: FORM_NAME,
        onSubmitFail,
        validate
    }),
)(UploadDocumentsForm);

const StyledParagraph = styled.p`
    .btn-link.green-link.skip {
        margin-top: 0;
        font-size: 16.8px;
        color: #9edc15;
    }
`;
