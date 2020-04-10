import { React } from 'core-front/libs';
import { Col, Row, Button } from 'react-bootstrap';

export default ({ submitDecision, submitting }) => {
    return (
        <Row>
            <Col lg={10} xs={12}>
                <h1>
                    <img src="./img/ic-cancel.svg" alt="CANCEL" />
                    Tu solicitud no ha sido aprobada
                </h1>
            </Col>
            <Col xs={12}>
                <p>
                    Nuestro análisis se realiza de manera automática, accediendo a varias fuentes crediticias y
                    combinando factores que determinan si será aprobado o no.
                </p>

                <p>Te recordamos que puedes solicitar un nuevo préstamo desde tu área personal.
                    En caso de que tu cuenta sea bloqueada por el sistema, podrás realizar una nueva
                        solicitud en un plazo de 30 días.
                </p>

                <p>Gracias por confiar en Moneyman, disculpa las molestias.
                </p>
            </Col>
            <Col xs={12}>
                <Button
                    disabled={submitting}
                    onClick={submitDecision}
                    bsStyle="primary"
                    bsSize="large"
                    name="finishBtn"
                    type="button"
                    block
                >
                    IR A MI ÁREA PERSONAL
                </Button>
                <a
                    className="btn btn-lg btn-primary btn-block btn-form"
                    href="http://finpublic.ru/offer.php?id=6"
                >Ver ofertas de préstamos alternativas
                </a>
            </Col>
            <Col xs={12}>
                <p>Si deseas más información sobre tu solicitud puedes enviar un email a <a
                    href="mailto:respuestaprestamo@moneyman.es"
                >respuestaprestamo@moneyman.es
                </a>
                </p>
            </Col>
        </Row>
    );
};