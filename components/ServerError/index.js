import { React, styled } from 'core-front/libs';

export default () => (
    <StyledError>
        <img src="./img/ic-error.svg" alt="server error" />

        <h2>Ups! Un error inesperado ha ocurrido</h2>
        <p>
            Actualiza tu página pulsando F5 o inténtalo de nuevo en unos momentos. En caso de que el problema persista,
            contacte con nuestro equipo de atención al cliente
        </p>
    </StyledError>
);

const StyledError = styled.div`
    img {
        margin-left: -35px;
    }
    text-align: center;
`;
