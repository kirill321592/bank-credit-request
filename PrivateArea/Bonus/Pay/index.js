import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';
import { Range, getTrackBackground  } from 'react-range';
import { useHistory } from 'react-router-dom';

import { changeRange, changeInput, blurInput, actionPay } from 'actions/privateArea/bonus';
import { setBonusInfo } from 'actions/privateArea/products';

import BackLink from 'PrivateArea/shared/BackLink';

import { LOAN_BONUS } from 'PrivateArea/config';

const { useEffect, useState } = React;

export default () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        bonusInfo: { payBonusSlideMin, payBonusSlideMax, payBonusDebtVal, payBonusSlideStep, totalBonuses },
        bonusInfoLoaded, payBonusSliderDept,
    } = useSelector(state => (state.privateAreaProducts));

    useEffect(() => {
        !bonusInfoLoaded && dispatch(setBonusInfo());
    }, [dispatch, bonusInfoLoaded]);

    const [checked, toggleCheck] = useState(false);

    return (
        <div className="row">
            <StyledHeader className="col-xs-12">
                <div>
                    {bonusInfoLoaded && (<span> {totalBonuses}p </span>)}
                    <BackLink url={LOAN_BONUS.url} name="Pagar interés" />
                </div>
                <p>Ahórrate el interés de tu préstamo usando tus puntos.</p>
            </StyledHeader>
            <div className="col-xs-12">
                <StyledSection>
                    <StyledSlider>
                        <StyledCalcHeader>
                            <StyledCalcTitle>
                                ¿Cuántos te quieres ahorrar?
                            </StyledCalcTitle>
                            <StyledInput>
                                <input
                                    onChange={e => dispatch(changeInput(e.target.value))}
                                    onBlur={e => dispatch(blurInput(e.target.value))}
                                    type="number"
                                    name="sum"
                                    value={!isNaN(payBonusSliderDept) && payBonusSliderDept}
                                />
                                <span>€</span>
                            </StyledInput>
                        </StyledCalcHeader>
                        <Range
                            step={payBonusSlideStep}
                            min={payBonusSlideMin}
                            max={payBonusSlideMax}
                            values={[payBonusDebtVal]}
                            onChange={payBonusDebtVal => dispatch(changeRange(payBonusDebtVal))}
                            renderTrack={({ props, children }) => (
                                <div
                                    onMouseDown={props.onMouseDown}
                                    onTouchStart={props.onTouchStart}
                                >
                                    <div
                                        ref={props.ref}
                                        style={{
                                            height: '10px',
                                            width: '100%',
                                            borderRadius: '7.3px',
                                            background: getTrackBackground({
                                                values: [payBonusDebtVal],
                                                colors: ['#9edc15', '#eee'],
                                                min: payBonusSlideMin,
                                                max: payBonusSlideMax
                                            })
                                        }}
                                    >
                                        {children}
                                    </div>
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        width: '25px',
                                        height: '25px',
                                        backgroundColor: '#fff',
                                        border: '4.4px solid #9edc15',
                                        borderRadius: '50%',
                                        marginLeft: '-13px',
                                        outline: 'none'
                                    }}
                                />
                            )}
                        />
                        <StyledLegend>
                            <span>{payBonusSlideMin}</span>
                            <span>{payBonusSlideMax}</span>
                        </StyledLegend>
                    </StyledSlider>
                    <StyledGreenBlock>
                        <StyledList>
                            <li>
                                <strong>Importe que te ahorrarás:</strong>
                                <span>{!isNaN(payBonusSliderDept) && payBonusSliderDept}</span>€
                            </li>
                            <li><strong>Puntos que gastarás:</strong> <span>{payBonusDebtVal}</span> puntos</li>
                        </StyledList>
                    </StyledGreenBlock>
                </StyledSection>
            </div>

            <StyledCheckCont className="col-xs-12">
                <input
                    checked={checked}
                    onChange={() => toggleCheck(!checked)}
                    type="checkbox"
                    className="form-checkbox"
                />
                <span className="pseudo"><i /></span>
                <span className="text-checkbox">Comprendo y acepto la información del modelo normalizado</span>
            </StyledCheckCont>

            <div className="col-xs-12">
                <StyledBtn
                    onClick={() => dispatch(actionPay(payBonusDebtVal, history))}
                    className="btn btn-lg"
                    type="button"
                    disabled={!checked}
                >
                    PAGAR INTERÉS CON PUNTOS ¡gastarás 0€!
                </StyledBtn>
            </div>
        </div>
    );
};
const StyledHeader = styled.div`
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
const StyledSection = styled.div`
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: #fff;
    padding: 25px 0 0;
`;

const StyledSlider = styled.div`
    padding: 0 30px 30px;
`;
const StyledGreenBlock = styled.div`
    background: #9edc15;
    padding: 30px;
    color: #fff;
`;
const StyledCalcTitle = styled.div`
    font-size: 17px;
    font-weight: 600;
    color: #4c4c4c;
    max-width: 75%;
    padding-top: 7px;
`;
const StyledCalcHeader = styled.div`
    display:flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const StyledInput = styled.div`
    max-width: 35%;
    border-bottom: 1.2px solid #9edc15;
    position:relative;
    input{
        display: block;
        border: none;
        font-size: 26px;
        font-weight: 500;
        color: #94d10c;
        outline: none;
        height: 37px;
        text-align: right;
        padding-right: 25px;
        -moz-appearance:textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    span {
        display: block;
        position: absolute;
        font-size: 26px;
        font-weight: 500;
        color: #94d10c;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
`;
const StyledCheckCont = styled.label`
    position: relative;
    margin: 30px 0 0;
    span.pseudo {
        background: #fff;
        display: inline-block;
        border-radius: 2px;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
        margin-right: 15px;
        float: left;
        cursor: pointer;
    }
    .form-checkbox:checked + span.pseudo i {
        opacity: 1;
    }
    .form-checkbox{
        position: absolute;
        opacity: 0;
        width: 0;
    }
    span.pseudo i {
        display: block;
        width: 10px;
        height: 10px;
        margin: 7px;
        background: transparent;
        opacity: 0;
        transform: rotate(-135deg) translate(1px, -1px);
    }
    span.pseudo i::before, span.pseudo i::after {
        content: '';
        display: block;
        background: #9edc15;
    }
    span.pseudo i::before {
        width: 9px;
        height: 3px;
    }
    span.pseudo i::after {
        width: 3px;
        height: 11px;
    }
    .text-checkbox {
        display: table-cell;
        font-size: 15px;
        font-weight: 500;
        color: #4c4c4c;
        line-height: 1.6;
    }
`;
const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        font-size: 1.3em;
        line-height: 1.7;
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
const StyledLegend = styled.div`
    overflow: hidden;
    font-size: 15px;
    font-weight: 500;
    color: #4c4c4c;
    line-height: 1.2;
    display:flex;
    justify-content: space-between;
    margin-top: 7px;
`;
