import { React, styled } from 'core-front/libs';
import { Modal, Button } from 'react-bootstrap';

import instantorLogo from './assets/instantor-logo.png';

class InstantorHelpAndModal extends React.Component {
    state = { show: false };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    render() {
        return (
            <StyledHelpWrapper className="hidden-xs hidden-sm">
                <div className="title icon-ic-secure">Identificación rápida y segura.</div>
                <p>
                    Conecta con tu banco para que puedas acceder y verificar tu crédito.
                    La identificación se realiza a través de <strong>
                        <span
                            onClick={this.handleShow}
                            className="link"
                        >Instantor
                        </span>
                                                             </strong>,
                    líder mundial en verificación.
                </p>

                <Modal
                    dialogClassName="instantor-help-modal"
                    show={this.state.show}
                    onHide={this.handleClose}
                    container={this}
                >
                    <button
                        type="button"
                        onClick={this.handleClose}
                        className="close"
                        data-dismiss="modal"
                    />
                    <Modal.Body>

                        <img
                            className="instantor-modal-logo"
                            alt="instantor logo"
                            src={instantorLogo}
                        />
                        <div className="instantor-modal-title">
                            ¿Por qué proporcionar mis datos de banca online?
                        </div>

                        <p>
                            <b>Validar tu cuenta online con Instantor es:</b>
                        </p>

                        <ul className="cons-list">
                            <li className="cons-item icon-time"><strong>Rápido:</strong> recibirás el dinero de tu préstamo antes</li>
                            <li className="cons-item icon-lock"><strong>Seguro:</strong> tanto como tu propio banco, accedemos utilizando su pasarela segura que sólo permite consultar datos</li>
                            <li className="cons-item icon-check"><strong>Cómodo:</strong> sin necesidad de buscar y enviar comprobantes bancarios</li>
                        </ul>

                        <div className="text-center">
                            <Button
                                className="btn-outline-success"
                                onClick={this.handleClose}
                                name="closeModal"
                            >
                                ¡Entendido!
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </StyledHelpWrapper>
        );
    }
}

export default InstantorHelpAndModal;

const StyledHelpWrapper = styled.div`
    margin-bottom: 25px;
    overflow: hidden;

    .title {
        line-height: 36px;
        font-size: 24px;
        font-weight: 700;
        color: #9edc15;
        margin-bottom: 25px;
        position: relative;
        padding-left: 35px;

        :before {
            content: "";
            height: 37px;
            width: 28px;
            position: absolute;
            left: 0;
            background-repeat: no-repeat;
            background-image: url(./img/icon-secure.svg);
        }
    }

    .instantor-modal-logo {
      display: block;
      margin: 0 auto 25px;
      max-width: 80%;
    }

    .instantor-modal-title {
      font-size: 22px;
      line-height: 1.36;
      color: #4c4c4c;
      font-weight: 700;
      margin: 0 0 25px;
    }

    img.instantor-logo {
        margin: 20px auto;
        display: block;
    }

    .modal-content {
        border-radius: 4px;
        border: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        padding: 65px 30px 40px;
        position: relative;

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
        }
    }

    .cons-list {
      padding-left: 50px;
      margin: 0 0 60px;
    }

    .cons-item {
      list-style-type: none;
      font-size: 16px;
      margin: 25px 0;
      font-weight: 500;
      position: relative;
      line-height: 1.6;
    }

    .cons-item::before {
      content: '';
      height: 30px;
      width: 30px;
      position: absolute;
      left: -50px;
      background-repeat: no-repeat;
    }

    .icon-time::before {
      background-image: url('./img/time.svg');
    }

    .icon-lock::before {
      background-image: url('./img/lock.svg');
    }

    .icon-check::before {
      background-image: url('./img/icon-check.svg');
    }

    .btn-outline-success {
        color: #9edc15;
        border: 2px solid #9edc15;
        background: transparent;
        display: inline-block;
        width: auto;
        outline: 0;
        font-size: 16px;
        padding: 13px 30px;

        &:hover,&:focus {
          background-color: white;
          border-color: #86c800;
          box-shadow: none;
          color: #86c800;
        }
    }
`;
