import { React, styled } from 'core-front/libs';
import { Link } from 'react-router-dom';
export default () => (
    <StyledError>
        <div className="wink__message">
            <span>No tienes puntos suficientes.<br /> Consulta cómo obtenerlos en
                <strong>
                    <Link to="/loan-bonus"> Conseguir puntos</Link>
                </strong>
            </span>
        </div>
    </StyledError>
);

const StyledError = styled.div`
    background: #ff4b4b;
    .wink__message{
        padding:10px;
        color: #fff;
        font-weight: 500;
        font-size: 19px;
    }

    .wink__message a {
        text-decoration: underline;
        font-weight: 700;
        line-height: 1.29;
        color: #fff;
    }
`;
