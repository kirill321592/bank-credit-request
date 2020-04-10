import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setProducts, checkLevelUp } from 'actions/privateArea/products';
import { setLevelUp } from 'actions/privateArea/bonus';

import { Loader } from 'components';
import BackLink from 'PrivateArea/shared/BackLink';

import { LOAN_BONUS } from 'PrivateArea/config';

const { useEffect } = React;

export default () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bonusInfo, levelup, current, bonusInfoLoaded } = useSelector(state => (state.privateAreaProducts));
    const { bonusError } = useSelector(state => (state.privateAreaBonus));

    useEffect(() => {
        !(current.id) &&  dispatch(setProducts());
        dispatch(checkLevelUp(history));
    }, [dispatch, current.id, history]);

    if (!levelup) {
        return  <Loader />;
    }
    const { id, name,imageName, description, percentPerDay, cost, prestamo, plazo } = levelup;

    return (
        <div className="row">
            <StyledHeader className="col-xs-12">
                <div>
                    {bonusInfoLoaded && (<span> {bonusInfo.totalBonuses}p </span>)}
                    <BackLink url={LOAN_BONUS.url} name="Pasar al siguiente nivel" />
                </div>
                <p>
                    Actualmente estás en el nivel <strong>{current.name}</strong>, sube al siguiente nivel{' '}
                    <strong>{name}</strong> usando tus puntos:
                </p>
            </StyledHeader>
            <div className="col-xs-12">
                <StyledBlock>
                    <StyledHead>
                        <div className="point__img" >
                            <img src={`/img/${imageName}`} alt={name} />
                        </div>
                        <div className="point__legend">
                            <StyledTitle><span>{name}</span>:</StyledTitle>
                            <div className="point__description">
                                Préstamo de <b><span> {prestamo}</span> €</b> <br />
                                Plazo de <b><span>{plazo}</span></b>
                            </div>
                        </div>
                    </StyledHead>
                    <StyledBody>
                        <StyledDsc>
                            {description}
                        </StyledDsc>
                        <StyledPoint>
                            El coste de pasar al siguiente nivel es de <b><span>{cost}</span> puntos</b>
                        </StyledPoint>
                    </StyledBody>
                    <StyledFooter>
                        <div>Tasa de interés:</div>
                        <span><span>{percentPerDay}</span> %</span>
                    </StyledFooter>
                </StyledBlock>
            </div>
            <div className="col-xs-12">
                {bonusError && <h2>Ups! Un error inesperado ha ocurrido.</h2>}
                <StyledBtn
                    onClick={() => dispatch(setLevelUp(id, history))}
                    type="button"
                    className="btn btn-lg"
                >
                    PASAR AL SIGUIENTE NIVEL
                </StyledBtn>
            </div>
        </div>
    );
};
const StyledHeader = styled.div`
    strong {
        text-transform: lowercase;
    }

    span {
        float: right;
        margin: 5px 0 0;
        padding-left: 43px;
        font-size: 22px;
        font-weight: 600;
        line-height: 1.16;
        color: #9edc15;
        letter-spacing: -0.3px;
        background-repeat: no-repeat;
        background-position: 0 50%;
        background-image: url(/img/title-puntos.svg);
    }
`;
const StyledTitle= styled.div`
    text-transform: uppercase;
    color: #9edc15;
    font-weight: 600;
    font-size: 31px;
    margin: 0 0 10px;
    line-height: .81;
`;
const StyledHead = styled.div`
    border: none;
    padding: 0;
    margin: 0 0 25px;
    color: #9edc15;
    font-size: 1.6em;
    font-weight: 500;
    .point__description {
        font-size: 20px;
        line-height: 1.3;
        letter-spacing: -.5px;
        color: #9edc15;
    }
    .point__img {
        vertical-align: middle;
        display: table-cell;
        padding-right: 20px;
    }
    .point__legend {
        vertical-align: top;
        display: table-cell;
        vertical-align: middle;
    }
    img {
        min-width: 50px;
    }
`;
const StyledBody= styled.div`
    padding: 0 0 10px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    line-height: 1.57;
    color: #737373;
`;
const StyledBlock = styled.div`
    background: #fff;
    padding: 20px 20px 10px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    margin-bottom: 30px;
`;
const StyledDsc = styled.p`
     margin: 0 0 10px;
     font-size: 1em;
    font-weight: 400;
`;
const StyledPoint = styled.p`
    font-weight: 600;
    color: #9edc15;
    line-height: 1.57;
    letter-spacing: -.2px;
    margin: 0 0 10px;
    font-size: 1em;
     b {
        font-size: 22px;
    }
`;
const StyledFooter = styled.div`
    padding: 20px 0 0;
    color: #4c4c4c;
    font-weight: 600;
    div {
        font-size: 16px;
        line-height: 1.1;
    }
    span {
        font-size: 30px;
        line-height: 1;
    }

`;
const StyledBtn = styled.button`
    background-color: #ff9d00;
    margin: 40px 0;
    width: 100%;
    white-space: wrap;
    :disabled {
        cursor: not-allowed;
        opacity: 0.65;
        filter: alpha(opacity=65);
        box-shadow: none;
    }
`;
