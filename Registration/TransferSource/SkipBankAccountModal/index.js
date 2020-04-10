import { React, styled } from 'core-front/libs';
import { Button, Modal, Row } from 'react-bootstrap';
import { ga } from 'core-front';
import bannerDesktop from './assets/banner_desktop.png';
import bannerMobile from './assets/banner_mobile.png';

export default ({ open, applyBankApi, applySkip, CATEGORY }) => {
    return (
        <StyledModal
            container={this}
            show={open}
            restoreFocus={false}
        >
            <Modal.Body>
                <div className="photo-header">
                    <img src={bannerDesktop} className="hidden-xs hidden-sm" alt="" />
                    <img src={bannerMobile} className="hidden-md hidden-lg" alt="" />
                </div>
                <div className="text-section">
                    <div className="title">Préstamo al 0% si añades tu banca online</div>

                    <p>Para poder conseguir un préstamo sin intereses en Moneyman, añade los datos de tu banca online.</p>

                    <p className="text-secure">Nuestra plataforma es segura y el proceso será más rápido</p>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Button
                        name="returnToBankAccount"
                        onClick={() => {
                            ga.sendEvent(CATEGORY, 'return-to-choose-online-banking');
                            applyBankApi();
                        }}
                        bsStyle="primary"
                        bsSize="large"
                        block
                    >
                        Introducir datos de banca online
                    </Button>
                </Row>
                <Row>
                    <Button
                        name="skipBankAccount"
                        onClick={() => {
                            ga.sendEvent(CATEGORY, 'go-without-online-banking');
                            applySkip();
                        }}
                        bsStyle="link"
                        type="submit"
                        block
                    >
                        Quiero continuar sin banca online
                    </Button>
                </Row>
            </Modal.Footer>
        </StyledModal>
    );
};

const StyledModal = styled(Modal)`
    .modal-dialog {
        @media (max-width: 767px) {
          margin: 10px;
      }
    }
    
    .photo-header {
      border-radius: 5px 5px 0 0;
      overflow: hidden;
      img {
          width: auto;
          display: block;
          max-width: 100%;
      }
    }

     .modal-content {
        padding: 0;
         .modal-body {
            padding: 0;
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.33;
            letter-spacing: -0.2px;
            @media (max-width: 767px) {
              font-size: 16px;
            }
        }
    }
    
    .text-section {
       padding: 24px 14px 0;
       font-size: 16px;
       line-height: 24px;
       text-align: center;
       color: #4C4C4C;

      .title {
        font-size: 22px;
        line-height: 28px;
        font-weight: bold;
        text-align: center;
        color: #4C4C4C;
        margin-bottom: 16px;
        @media (max-width: 767px) {
          margin-bottom: 8px;
        }
      }
    }
    
    .text-secure {
      padding-top: 10px;
      color: #9EDC15;
      @media (max-width: 767px) {
          font-size: 16px;
          line-height: 16px;
          padding-left: 30px;
          padding-right: 30px;
      }
        &:before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 15px;
          background: url('./img/security.svg') no-repeat center center;
          margin-right: 10px;
        }
    }
    
    .modal-footer {
        border-top: 0;
        padding-bottom: 30px;
        text-align: center;
        @media (max-width: 767px) {
          padding-bottom: 24px;
          padding-top: 10px;
        }
         button {
            margin: 0 0 18px;
            display: inline-block;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            width: auto;
            text-transform: none;
            min-width: 320px;
        }
         .btn-link {
            display: inline-block;
            width: auto;
            min-width: 0;
            font-weight: 300;
            text-decoration: none;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            color: #FF9D00;
            transition: all .3s ease;
            &:hover {
              color: #4c4c4c;
              text-decoration: underline;
            }
             @media (max-width: 767px) {
                margin-bottom: 0;
             }
        }
    }
`;
