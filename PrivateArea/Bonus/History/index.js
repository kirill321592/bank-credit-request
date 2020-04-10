import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';

import { setBonusInfo } from 'actions/privateArea/products';
import { setLoanBonusHistory } from 'actions/privateArea/bonus';

import BackLink from 'PrivateArea/shared/BackLink';

import { LOAN_BONUS } from 'PrivateArea/config';

const { useEffect } = React;

export default () => {
    const dispatch = useDispatch();
    const { bonusInfo: { totalBonuses }, bonusInfoLoaded } = useSelector(state => (state.privateAreaProducts));

    useEffect(() => {
        dispatch(setLoanBonusHistory());
        !bonusInfoLoaded && dispatch(setBonusInfo());
    }, [dispatch, bonusInfoLoaded]);

    const { history, bonusError } = useSelector(state => (state.privateAreaBonus));

    return (
        <div className="row">
            <StyledHeader className="col-xs-12">
                {bonusInfoLoaded && (<span> {totalBonuses}p </span>)}
                <BackLink url={LOAN_BONUS.url} name="Historial de puntos" />
            </StyledHeader>

            <div className="col-xs-12">
                <StyledItem>
                    <StyledTableTitle>Puntos conseguidos</StyledTableTitle>
                    {bonusError && <h2>Ups! Un error inesperado ha ocurrido.</h2>}
                    <StyledTable>
                        <tbody>
                            {history && history.map(({ points, kind, date }, index) => (
                                <tr key={index}>
                                    <td>{points} <span>puntos</span></td>
                                    <td>{kind}</td>
                                    <td>{date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </StyledItem>
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
const StyledItem = styled.div`
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    padding: 30px 20px 10px;
    margin: 0 0 30px;
`;
const StyledTableTitle = styled.div`
    color: #9edc15;
    font-weight: 600;
    font-size: 24px;
    line-height: 0.88;
    border-bottom: 1px solid #9edc15;
    padding: 0 0 22px;
    margin: 0 0 20px;
`;

const StyledTable = styled.table`
    width: 100%;
   tr:last-child {
        margin-bottom: 0;
    }
    td {
        vertical-align: middle;
        text-align: center;
        color: rgba(115, 115, 115, 0.9);
        line-height: 1.25;
        font-weight: 500;
        padding: 0 0 20px;
    }
    tr td:first-child {
        text-align: left;
    }
`;
