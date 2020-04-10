import { React, styled } from 'core-front/libs';

export default ({ partnerName }) => {
    return (
        <>
            <StyledPersonalInfo className="personal-info">
                <p className="personal-info__title"><b>INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS PERSONALES</b></p>
                <p>Tus datos personales han sido proporcionados por {partnerName} y
                 serán tratados por IDFINANCE SPAIN, S.L.U. con la finalidad de
                ejecutar el contrato de préstamo así como para aplicar las medidas
                precontractuales con el fin de tramitar y gestionar tu solicitud.
                </p>

                <p>
                    Te informamos que tus datos estarán ubicados en los servidores
                    de Amazon Web Services Inc. dentro de la Unión Europea (
                    <a
                        href="https://aws.amazon.com/legal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://aws.amazon.com/legal
                    </a>).<br />
                </p>

                <p>Puedes ejercer tus derechos de acceso, rectificación,
                supresión o limitación enviando un mail a <a href="mailto:dpd@moneyman.es">dpd@moneyman.es</a>,
                    así como presentar una reclamación ante la Autoridad de Control.
                </p>

                <p>
                    Puedes consultar la información adicional sobre el tratamiento
                    de tus datos personales en cualquier momento accediendo a la <a
                        href="https://www.moneyman.es/como-funciona/documentacion/politica-de-privacidad/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Política de Privacidad
                    </a>.
                </p>
            </StyledPersonalInfo>
        </>
    );
};

const StyledPersonalInfo = styled.div`
    p {
       font-size: 85%;
    }
`;
