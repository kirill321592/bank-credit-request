import { React } from 'core-front/libs';
import { Col, Row, Button } from 'react-bootstrap';

export default ({ submitDecision, submitting, userInfo: { name }}) => {
    return (
        <Row>
            <Col xs={12}>
                <h1>
                    <img src="./img/ico-title-check.svg" alt="PROCESSING" />
                    ¡Enhorabuena, tu solicitud ha sido aprobada!
                </h1>
            </Col>

            <Col xs={12}>
                <p>{name}</p>

                <p>¡Felicidades! — tu petición ha sido aprobada! Pronto te transferiremos el dinero a tu cuenta.
                    Gracias por utilizar los servicios de "MoneyMan".</p>

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