import { React, styled } from 'core-front/libs';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { setProducts, setBonusInfo } from 'actions/privateArea/products';

const { useEffect, useState } = React;


export default () => {
    const dispatch = useDispatch();
    const { current, bonusInfo, levelup, bonusInfoLoaded } = useSelector(state => (state.privateAreaProducts));
    const [toggled, toggle] = useState(true);

    useEffect(() => {
        !(current.id) &&  dispatch(setProducts());
        !bonusInfoLoaded && dispatch(setBonusInfo());
    }, [dispatch, bonusInfoLoaded, current.id]);

    return (
        <>

            <h1>Mis puntos
                <Styledh1Label>{bonusInfoLoaded && (<span> {bonusInfo.totalBonuses}p </span>)}</Styledh1Label>
            </h1>
            <StyledBlock
                bgColor="#fff"
                color="#4c4c4c"
            >
                {current.name && (
                    <StyledTitle>
                        <div className="point__img"><StyledImg src={`./img/${current.imageName}`} /></div>
                        <div className="point__legend">
                            <strong> Nivel {current.name}:</strong> <br />
                            <span> tienes {bonusInfo.totalBonuses} puntos</span>
                        </div>
                    </StyledTitle>
                )}

                <p>¡Premiamos tu lealtad! Por cada préstamo que devuelvas a tiempo recibirás puntos</p>
                <p className="point__link">
                    <StyledLink to="/loan-bonus/history">Ver historial de mis puntos</StyledLink>
                </p>
                <p>Haz uso de tus puntos acumulados para pagar el interés o solicitar una prórroga de tu préstamo.
                    Consiguiendo más puntos podrás subir de nivel y beneficiarte de sus condiciones.
                </p>
                <p className="point__link">
                    <StyledLink to="/loan-bonus/levels">Ver niveles de préstamo</StyledLink>
                </p>

            </StyledBlock>
            <StyledBlock
                bgColor="#9edc15"
                color="#fff"
            >
                <StyledGreenTitle
                    onClick={() => toggle(!toggled)}
                >
                    <StyledArrow
                        toggled={toggled}
                    />
                    <strong>Usar mis puntos</strong>
                </StyledGreenTitle>
                <div className={toggled ? 'modal__body entered': 'modal__body'} >
                    <div>
                        <p className="small__text">Puedes usar tus puntos acumulados para:</p>
                        <StyledList>
                            <li>
                                <Link to="/loan-bonus/pay">1. Pagar interés del préstamo </Link>
                            </li>
                            <li>
                                <Link to="/prolongation/bonus-pay">2. Pedir una prórroga</Link>
                            </li>
                            {levelup &&
                            (<li>
                                <Link to="/loan-bonus/level-up">3. Pasar al siguiente nivel</Link>
                             </li>)
                            }
                        </StyledList>
                    </div>
                </div>
            </StyledBlock>
        </>
    );
};
const Styledh1Label = styled.div`
    float: right;
    margin: 15px 0 0;
    padding-left: 43px;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.16;
    color: #9edc15;
    letter-spacing: -0.3px;
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-image: url(/img/title-puntos.svg);
`;
const StyledTitle= styled.div`
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    padding-bottom: 20px;
    color: #9edc15;
    font-size: 1.6em;
    font-weight: 500;
    display:flex;
`;
const StyledGreenTitle = styled.div`
    position: relative;
    cursor: pointer;
    font-size: 1.4em;
`;
const StyledBlock = styled.div`
    color:${({ color }) => color};
    background:${({ bgColor }) => bgColor};
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 30px;
    .modal__body{
        max-height: 140px;
        opacity: 1;
        transition: opacity 1.75s, max-height 0.25s ease-out;
    }
    .modal__body > div{
        padding-top:10px;
    }
    .entered {
        max-height: 0;
        opacity: 0;
        transition: opacity 0.20s, max-height 0.25s ease-in;
    }
    .small__text{
        font-size: 1em;
        font-weight: 400;
        margin: 0 0 20px;
    }
`;
const StyledImg = styled.img`
    margin-right: 20px;
    min-width: 50px;
`;
const StyledLink = styled(Link)`
    color: rgba(182, 182, 182, 0.9);
    margin: 0 0 20px;
    display:block;
    :hover{
        color: rgba(182, 182, 182, 0.9);
    }
`;
const StyledList= styled.ul`
    margin: 0;
    list-style: none;
    padding: 0;
    li {
        margin: 10px 0;
    }
    a{
       color:#fff; 
    }
`;
const StyledArrow = styled.i`
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0;
    top: 30%;
    transition: transform ease .3s;
    transform: rotate(225deg);
    ${({ toggled }) => toggled && `
    transform: rotate(135deg);
  `}
    :before, :after {
        content: '';
        position: absolute;
        background: #fff;
        left: 0;
        top: 0;
    }
    :before{
        width: 3px;
        height: 10px;
    }
    :after {
        width: 10px;
        height: 3px;
    }
`;

