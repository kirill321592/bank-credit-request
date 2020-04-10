import { React } from 'core-front/libs';
import { Col, Row, Button } from 'react-bootstrap';

export default ({ submitDecision, submitting, userInfo: { name }}) => {
    return (
        <Row>
            <Col xs={12}>
                <h1>
                    <img src="./img/ico-title-check.svg" alt="DRAFT" />
                    {name}<br />
                    Conoce el estado de tu solicitud
                </h1>
            </Col>

            <Col xs={12}>
                <p>Casi hemos асаbadо:</p>
                <p>
                    <strong>Nuestros especialistas te contactarán al teléfono
                        facilitado durante el registro para su verificación.
                    </strong>
                </p>
                <p>Si todo es correcto, recibirás el dinero pronto.</p>

                <p>Si deseas más información sobre tu solicitud puedes enviar un email <a
                    href="mailto:respuestaprestamo@moneyman.es"
                >respuestaprestamo@moneyman.es
                </a>
                </p>
            </Col>

            <Col xs={12}>
                <Button
                    disabled={submitting}
                    onClick={submitDecision}
                    bsStyle="primary"
                    name="finishBtn"
                    bsSize="large"
                    type="button"
                    block
                >Finalizar
                </Button>
            </Col>
        </Row>
    );
};