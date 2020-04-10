import { React, styled } from 'core-front/libs';
import { ga } from 'core-front';
import { change, Form, reduxForm, submit, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { nextStep } from '../../actions/step';
import { renderField } from '../../helpers/render';
import finpublicImg from './assets/finpublic.png';
import { validate } from 'core-front/helpers/schemeValidator';
import onSubmitFail from '../../helpers/onSubmitFail';

const FORM_NAME = 'finpublicForm';
const selector = formValueSelector(FORM_NAME);

class Finpublic extends React.Component {
    state = {
        showAgreementInfo: false
    };

    toggleAgreementInfoView = e => {
        const { showAgreementInfo } = this.state;

        e.preventDefault();

        this.setState({ showAgreementInfo: !showAgreementInfo });
    };

    submitDecision = reason => {
        const { dispatch, form } = this.props;

        dispatch(change(form, 'rejectedLead.actionType', reason));
    };

    componentDidUpdate(prevProps) {
        const { dispatch, form, actionType } = this.props;

        if (actionType && actionType !== prevProps.actionType) {
            dispatch(submit(form));
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        const { showAgreementInfo } = this.state;

        return (
            <FinpublicSection>
                <Form onSubmit={handleSubmit(nextStep)} noValidate>
                    <Row>
                        <Col xs={12} className="step-header">
                            <div className="finpublic-img">
                                <img src={finpublicImg} alt="Prestamos alternativos" />
                            </div>
                            <h1>Prestamos alternativos</h1>
                        </Col>

                        <Field
                            className="checkbox col-xs-12"
                            name="rejectedLead.dataAgreement"
                            component={renderField}
                            fieldType="checkbox"
                            label={
                                <span>Autorizo expresamente a que mis datos personales sean comunicados a
                                    empresas con las que IDFinance Spain, S.L.U. tenga acuerdos para que
                                    puedan informarme sobre productos financieros.<br />
                                <span
                                    onClick={this.toggleAgreementInfoView}
                                    className="show-more"
                                >Consulta más información aquí
                                </span>
                                </span>
                            }
                        />

                        <Col xs={12}>
                            <div className={`more-info ${showAgreementInfo ? 'visible' : ''}`}>
                                <div className="more-info-text">
                                    <p>Al marcar la casilla autorizas a que IDFinance Spain, S.L.U. comunique tus datos
                                        personales (nombre y apellidos, email, teléfono móvil y fijo, sexo, fecha de nacimiento,
                                        DNI, educación, dirección completa, código postal, ciudad, tipo de vivienda, estado
                                        civil, ingresos mensuales y tipo, fecha de la próxima nómina, teléfono de la empresa,
                                        gastos, cantidad, propósito y duración del préstamo e IP) a las empresas con las que
                                        haya alcanzado acuerdos que puedan ser beneficiosos para ti, a fin de que puedan
                                        proporcionarte información de sus productos o servicios.
                                    </p>

                                    <p>La empresa con la que IDFinance Spain, S.L.U. ha alcanzado un acuerdo es Newprop
                                        Investment, S.L.U.
                                    </p>

                                    <p>
                                        En ningún caso se comunicará información referente a tu perfil que IDFinance Spain,
                                        S.L.U. pueda disponer.
                                    </p>

                                    <p>
                                        En caso de que quieras retirar tu consentimiento, puedes comunicárnoslo a través del
                                        correo electrónico <a href="mailto:dpd@moneyman.es">dpd@moneyman.es</a>, tu Área de
                                        Usuario o dirigiéndote directamente a la
                                        empresa Newprop Investment, S.L.U. IDFinance Spain, S.L.U. informará a la empresa
                                        anunciadora de tu revocación de consentimiento, si bien, IDFinance Spain, S.L.U. no
                                        asume ninguna responsabilidad respecto de la ejecución efectiva de esta revocación por
                                        parte de la empresa Newprop Investment, S.L.U, siendo esta última, en todo caso,
                                        responsable del fin del tratamiento.
                                    </p>

                                    <p>Recuerda acceder a la Política de Privacidad para consultar toda la información de
                                        tratamiento de sus datos personales y del Responsable del tratamiento.
                                    </p>

                                    <p>Finalmente, te informamos de que tienes derecho a recabar la tutela de la Agencia
                                        Española de Protección de datos a través de su página web <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href="https://www.aepd.es/"
                                    >www.agpd.es
                                    </a>
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12}>
                            <Button
                                disabled={submitting}
                                onClick={() => {
                                    this.submitDecision('OUTBOUND');
                                }}
                                bsStyle="primary"
                                bsSize="large"
                                name="finishBtn"
                                type="button"
                                block
                            >
                                VER PRÉSTAMOS ALTERNATIVOS
                            </Button>
                            <Button
                                disabled={submitting}
                                onClick={() => {
                                    this.submitDecision('CANCEL');
                                }}
                                bsStyle="primary"
                                className="btn-transparent"
                                bsSize="large"
                                name="finishBtn"
                                type="button"
                                block
                            >
                                VOLVER A APLICAR
                            </Button>
                        </Col>

                        <Col xs={12}>
                            Si deseas más información sobre tu solicitud puedes enviar un email a <a
                                href="mailto:clientes@moneyman.es"
                            >clientes@moneyman.es
                            </a>
                        </Col>
                    </Row>
                </Form>
            </FinpublicSection>
        );
    }
}

export default compose(
    connect(state => ({
        header: state.header,
        actionType: selector(state, 'rejectedLead.actionType'),
        initialValues: state.step.data,
        jsonSchema: state.step.jsonSchema,
        analytics: state.step.analytics
    })),
    reduxForm({
        onSubmitFail: (errors, dispatch, submitError, props) => {
            dispatch(change(props.form, 'rejectedLead.actionType', null));

            onSubmitFail(errors, dispatch, submitError, props);
        },
        validate,
        onSubmitSuccess: (result, dispatch, props) => {
            const { actionType, analytics: { CATEGORY }} = props;

            switch (actionType) {
            case 'OUTBOUND':
                ga.sendEvent(CATEGORY, 'go-to-FP');
                break;
            case 'CANCEL':
            default:
                ga.sendEvent(CATEGORY, 'go-to-PA');
                break;
            }
        },
        form: FORM_NAME
    })
)(Finpublic);

const FinpublicSection = styled.div`
  padding-bottom: 40px;

  h1 {
    font-size: 32px;
  }

  .more-info {
    background: #fefefe;
    border-radius: 4px;
    height: 0;
    margin: 0;
    position: relative;
    .more-info-text {
      font-size: 12px;
      overflow: auto;
      max-height: 100%;
      padding: 0;
      color: rgba(76, 76, 76, 0.9);
    }

    &::after {
      display: none;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
      content: '';
      position: absolute;
      height: 64px;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 2;
    }

    &.visible {
      transition: margin 0.1s, height .3s;
      margin: 28px 0 0;
      height: 200px;
      .more-info-text {
        padding: 20px 0 60px 20px;
      }
      &::after {
        display: block;
      }
    }
  }

  .show-more {
    cursor:pointer;
    font-weight: 700;
    color: #000;
    text-decoration: underline;
    &:hover {
      color: #9edc15;
    }
  }

  .form-label-check {
    margin: 26px 0 0;
  }

  .btn {
    margin: 30px 0;
  }

  .btn + .btn {
    margin-top: 0;

  }

  #dataAgreementBox {
    padding-left: 40px;
  }
  
  .finpublic-img {
      img {
        display: block;
        max-width: 100%;
        width: auto;
        margin-bottom: 45px;
      }
  }
 `;
