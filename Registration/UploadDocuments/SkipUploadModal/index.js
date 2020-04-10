import { React, styled } from 'core-front/libs';
import { Button, Modal } from 'react-bootstrap';

export default class extends React.Component {
    componentDidMount() {
        const { open } = this.props;

        if (open) {
            this.handleShow();
        }
    }

    render() {
        const { open, closeModal, applySkip } = this.props;

        return (
            <StyledModal
                onHide={closeModal}
                container={this}
                show={open}
            >
                <Modal.Header closeButton >
                    <Modal.Title >
                        Tu préstamo está pre-aprobado. <br />
                        ¡Sube tus documentos!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tu solicitud no está completa sin tus documentos. <br />
                    ¡Súbelos ahora para obtener tu dinero ya!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        name="returnForUploadDocs"
                        onClick={closeModal}
                        bsStyle="primary"
                        bsSize="large"
                        block
                    >
                        Subir documentos
                    </Button>
                    <Button
                        name="skipUploadingDocs"
                        onClick={applySkip}
                        bsStyle="link"
                        type="submit"
                        block
                    >
                        No me interesa mi préstamo pre-aprobado
                    </Button>
                </Modal.Footer>
            </StyledModal>
        );
    }
}

const StyledModal = styled(Modal)`
    .modal-dialog {
        @media (max-width: 767px) {
          margin: 0;
      }
    }
     .modal-content {
        padding: 60px 70px 35px;
         .modal-header {
            padding: 5px 0;
            border-bottom: 0;
             h4.modal-title {
                margin: 0;
                font-size: 30px;
                font-weight: 700;
                line-height: 1.27;
                letter-spacing: -0.5px;
                text-align: center;
            }
        }
         .close {
            position: absolute;
            width: 20px;
            height: 20px;
            right: 30px;
            top: 30px;
            font-size: 0;
            color: transparent;
            background-image: url(./img/ico-close-modal.svg);
            opacity: .9;
            cursor: pointer;
            outline: none;
        }
         .modal-body {
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.33;
            letter-spacing: -0.2px;
        }
         .modal-footer {
            border-top: 0;
             button {
                display: block;
                width: 300px;
                margin-left: auto;
                margin-right: auto;
            }
             .btn-link {
                text-align: center;
                font-size: 14px;
                font-weight: 600;
                line-height: 1.57;
                letter-spacing: -0.4px;
            }
        }
         @media (max-width: 767px) {
            padding: 65px 18px 0;
            margin: 20px;
             .modal-header {
                h4.modal-title {
                    margin-top: 25px;
                    font-size: 21px;
                    line-height: 1.33;
                    letter-spacing: -0.4px;
                }
                 .close {
                      top: 20px;
                      right: 20px;
                      transform: scale(.7);
                }
            }
             .modal-body {
                font-size: 16px;
                line-height: 1.38;
                letter-spacing: -0.4px;
            }
             .modal-footer button {
                padding: 20px 40px;
                margin-bottom: 25px;
                font-size: 18px;
                line-height: 0.67;
            }
             .modal-footer .btn-link {
                padding: 20px 10px;
                margin-top: 0;
                font-size: 14px;
                line-height: 0.67;
            }
        }
         @media (max-width: 512px) {
            padding: 60px 15px 0;
             .modal-footer button {
                width: 88%;
                min-width: 200px;
                padding: 20px 5px;
                font-size: 14px;
            }
             .modal-footer .btn-link {
                padding: 10px 0;
                font-size: 10px;
            }
        }
    }
`;
