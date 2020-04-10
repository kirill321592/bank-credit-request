import { React, styled } from 'core-front/libs';

const PersonalInfoChangesNote = () => (
    <StyledMessage>
        Puedes ejercer tu derecho de rectificación de datos enviando un correo electrónico a la dirección de
        email <a href="mailto:dpd@moneyman.es"><b>dpd@moneyman.es</b></a>
    </StyledMessage>
);

export default PersonalInfoChangesNote;

const StyledMessage = styled.p`
    margin: 20px 0;
`;
