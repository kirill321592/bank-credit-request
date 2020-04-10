import { React, styled } from 'core-front/libs';

export default () => (
    <InfoBlockWrap>
        <InfoBlockItem className="info">
            <h5>¿Puedo enviar mis documentos en otro momento?</h5>
            <p>Puedes acceder a tu área personal y enviarnos los documentos por email o Whatsapp más tarde.</p>
        </InfoBlockItem>
        <InfoBlockItem className="lock">
            <h5>¿Es seguro enviar mi documentación personal?</h5>
            <p>Garantizamos la confidencialidad y la seguridad de tus datos personales</p>
        </InfoBlockItem>
    </InfoBlockWrap>
);

const InfoBlockWrap = styled.div`
    margin-top: 30px;
    padding: 30px;
    background: #9edc15;
    color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-radius: 4px;
`;

const InfoBlockItem = styled.div`
    padding-left: 40px;
    margin-bottom: 30px;
    position: relative;
    background-repeat: no-repeat;
    background-position: 0 0;
    &.info {
        background-image: url(./img/ico-info.svg);
    }
    &.lock {
        background-image: url(./img/ico-lock.svg);
    }
    h5 {
        margin-bottom: 10px;
        font-size: 1.3em;
        font-weight: 700;
    }
    p {
        line-height: 1.6;
        font-weight: 400;
        font-size: 1.1em;
    }
`;