import { React, styled } from 'core-front/libs';
import { Form, reduxForm, Field } from 'redux-form';
import { validate } from 'core-front/helpers/schemeValidator';
import { Button, Row } from 'react-bootstrap';
import { compose } from 'redux';
import { renderField } from 'helpers/render';
import { PRIVATE_AREA_API } from 'api';

const FORM_NAME = 'PAuploadDocumentsForm';
const required = value => value ? undefined : 'Required';

const UploadDoc  = props => {
    const {
        handleSubmit,
        handleShow,
        submitting,
        invalid,
        documents
    } = props;

    return (
        <StyledModal>
            <div className="row">
                <div className="col-xs-2 hidden-xs">
                    <div className="documentation-icon">
                        <img src="/img/ico-doc-id.svg" alt="" />
                    </div>
                </div>
                <div className="col-sm-10 col-xs-12">
                    <div className="documentation-title">
                    Para finalizar el proceso de solicitud debes adjuntar tu documentación
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="documentation-text">
                    Los documentos pueden ser escaneados o puedes hacer fotos con tu cámara.
                    </div>
                </div>

                <Form
                    onSubmit={handleSubmit(() => handleShow(false))}
                >
                    <Row>
                        {documents && documents.map(({ documentType }) => (
                            <Field
                                key={documentType}
                                component={renderField}
                                url={`${PRIVATE_AREA_API.PA_UPLOAD_DOC}/${documentType}`}
                                className="col-md-6"
                                name={documentType}
                                fieldType="file"
                                validate={[required]}
                            />
                        ))}

                    </Row>
                    <Button
                        disabled={invalid || submitting}
                        bsStyle="primary"
                        bsSize="large"
                        name="nextBtn"
                        type="submit"
                        block
                    >
                     Enviar Para Aprobación
                    </Button>
                </Form>
            </div>
        </StyledModal>
    );
};

export default compose(
    reduxForm({
        form: FORM_NAME,
        validate
    }),
)(UploadDoc);

const StyledModal = styled.div`
    padding:0 60px;
`;