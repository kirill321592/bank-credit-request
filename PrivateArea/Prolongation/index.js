import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setProlongationInfo, updateProlongationInfo } from 'actions/privateArea/prolongation';

import BackLink from 'PrivateArea/shared/BackLink';

import { LOAN_DETAILS_PAGE } from 'PrivateArea/config';

const { useEffect } = React;

export default () => {
    const dispatch = useDispatch();
    const { prolongationInfo } = useSelector(state => (state.privateAreaProlongation));
    const {
        rolloverAmount, rolloverDurationValues, savePenalty, penaltiesCost, rolloverDuration, rolloverDueDateDay,
        rolloverDueDateMonth, rolloverDueDateYear,
    } = prolongationInfo;

    useEffect(() => {
        dispatch(setProlongationInfo());
    }, [dispatch]);

    return (
        <StyledSection className="container wrapper">
            <div className="row">
                <StyledHeader className="col-xs-12">
                    <BackLink url={LOAN_DETAILS_PAGE.url} name="¿No llegas a tiempo con el pago?" />
                </StyledHeader>

                <StyledText className="col-xs-12">
                    Pide una prórroga de
                    <StyledSelect>
                        <select
                            name="prolongation"
                            value={rolloverDuration}
                            onChange={e => dispatch(updateProlongationInfo(e.target.value))}
                        >
                            {rolloverDurationValues && (Object.keys(rolloverDurationValues)).map(val => (
                                <option
                                    key={val}
                                    value={val}
                                    name="rollover"
                                >
                                    {val} DÍAS
                                </option>
                            ))
                            }
                        </select>
                    </StyledSelect>
                    y ahorra <span>{savePenalty}€</span> en penalizaciones.
                </StyledText>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <StyledBlock>
                        <StyledTitle>
                        Detalles de ahorro
                        </StyledTitle>
                        <div className="table-row">
                            <span>Coste de prórroga </span>
                            <span> <b>{rolloverAmount}€</b> </span>
                        </div>
                        {penaltiesCost && (
                            <div className="table-row">
                                <span> Coste alternativa (penalización)</span>
                                <span>
                                    <b><strike>{penaltiesCost}€</strike></b>
                                </span>
                            </div>
                        )}
                        <div className="table-row">
                            <span>Nueva fecha de devolución</span>
                            <span>
                                <b>{rolloverDueDateDay}/{rolloverDueDateMonth}/{rolloverDueDateYear}</b>
                            </span>
                        </div>
                    </StyledBlock>
                </div>
                {penaltiesCost && (
                    <div className="col-md-5">
                        <StyledDsc>
                        ¡Pedir una prórroga evita que
                        te cobremos <b>penalizaciones!</b>
                        </StyledDsc>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-md-7">
                    <StyledBtn className="btn btn-lg" to="/prolongation/pay">
                        <span className="ico-clock" />PEDIR PRÓRROGA <span>DE  <span>{rolloverDuration}</span> DÍAS</span>
                    </StyledBtn>
                </div>
            </div>

        </StyledSection>
    );
};
const StyledHeader = styled.div`
    margin-top: 7px;
`;
const StyledSection= styled.div`
    background: url(../img/ico-prolongation.svg) no-repeat 55% 18px;
`;
const StyledTitle= styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #4c4c4c;
    padding: 0 0 15px;
    margin: 0 0 20px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.9);
    @media screen and (max-width: 767px){
        font-size: 18px;
    }

`;
const StyledText = styled.div`
    font-size: 18px;
    font-weight: 500;
    padding: 10px 15px 0;
    margin: 0 0 50px;
    span {
        font-size: 28px;
        font-weight: 600;
        color: #97d313;
    }
`;
const StyledBlock = styled.div`
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    padding: 40px 45px;
    .table-row {
        overflow: hidden;
        margin: 0 0 8px;
        display: table;
        width: 100%;
    }
    .table-row > span {
        display: table-cell;
        font-size: 17.5px;
        font-weight: 500;
        color: #737373;
        vertical-align: middle;
    }
    .table-row > span:nth-child(2) {
        text-align: right;
    }
    .table-row > span > b {
        font-size: 23px;
        font-weight: 600;
        color: #737373;
    }
    @media screen and (max-width: 767px){
        .table-row > span > b {
            font-size: 18px;
        }
    }
    @media screen and (max-width: 991px) {
    padding: 24px 18px;
    }
`;
const StyledDsc = styled.div`
        position: relative;
        z-index: 10;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
        color: #4c4c4c;
        padding: 60px 30px 0;
        :before {
            content: '';
            display: block;
            position: absolute;
            width: 156px;
            height: 92px;
            top: 120px;
            left: -60px;
            background: url(../img/arrow-prolongation.svg) no-repeat 50%;
        }
        @media screen and (max-width: 767px) {
            font-size: 15px;
            line-height: 1.6;
            letter-spacing: -0.2px;
        }
        @media screen and (max-width: 991px) {
            text-align: left;
            padding: 20px 95px 0 0;
            :before {
                width: 99px;
                height: 75px;
                background-image: url(../img/arrow-prolongation-reverse.svg);
                background-size: contain;
                left: inherit;
                right: 0;
                top: -33px;
            }
        }
`;
const StyledSelect= styled.div`
    position: relative;
    margin: 0 10px;
    display: inline-block;
    select {
        display: inline-block;
        width: 131px;
        cursor: pointer;
        height: 50px;
        padding: 0 15px;
        font-size: 24px;
        font-weight: 600;
        color: #97d313;
        border-radius: 4px;
        box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.25);
        background-color: #ffffff;
        border: solid 1px rgba(211, 210, 210, 0.9);
        -moz-appearance: none;
        appearance: none;
        position: relative;
    }
    :after {
        content: '';
        display: block;
        top: 17px;
        position: absolute;
        width: 10px;
        height: 16px;
        pointer-events: none;
        background-image: url(../img/ico-dropdown.svg);
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        right: 12px;
    }
    @media (max-width: 767px) {
        margin: 5px;
    }
`;
const StyledBtn = styled(Link)`
    margin: 40px 0;
    font-size: 17px;
    padding: 20px;
    text-transform: uppercase;
    background-color: #ff9d00;
    width: 100%;
    .ico-clock {
        display: inline-block;
        width: 22px;
        height: 24px;
        background: url(../img/ico-clock-mini.svg) no-repeat 50% 0;
        vertical-align: top;
        margin-right: 10px;
    }
`;

