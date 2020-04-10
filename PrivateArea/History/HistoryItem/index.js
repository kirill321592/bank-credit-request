import { React, styled } from 'core-front/libs';

import PaymentHistoryModal from 'PrivateArea/shared/PaymentHistoryModal';

const { useState, useEffect } = React;

const DAYS_IN_MONTH = 30;

export default ({ item, downLoadFile, index }) => {
    const { loanNumber, amount, dateReceived, status, paymentsScheduleCount, dateRepaid, duration } = item;
    const [toggled, toggle] = useState(true);
    const [dateFormat, prepareDateFormat] = useState('');

    const prepareData =() => {
        let days;

        switch (duration.periodType) {
        case ('MONTH'):
            days = Math.round(duration.daysCount / DAYS_IN_MONTH);
            if (days > DAYS_IN_MONTH) {
                prepareDateFormat('meses');
            } else {
                prepareDateFormat('mes');
            }
            break;
        case ('DAYS'):
        default:
            prepareDateFormat('días');
            break;
        }
    };

    useEffect(() => {
        prepareData();
        if (index === 0) {
            toggle(false);
        }
    }, []);


    return (
        <StyledLoanItem>
            <StyledLoanTitle
                onClick={() => toggle(!toggled)}
            >
                <StyledArrow
                    toggled={toggled}
                />
                    Solicitud de <strong>{amount}€</strong> a
                <strong> {duration.daysCount} {dateFormat}</strong>
            </StyledLoanTitle>
            <StyledLoanBody className={toggled ? 'modal__body entered': 'modal__body'} >
                <StyledList>
                    <li><strong>Número de contrato</strong><span>{loanNumber}</span></li>
                    <li><strong>Fecha de aceptación</strong><span>{dateReceived}</span></li>
                    <li><strong>Fecha de devolución</strong><span>{dateRepaid ? dateRepaid : '-'}</span></li>
                    <li><strong>Número de pagos</strong><span>{paymentsScheduleCount}</span></li>
                    <li><strong>Historial de pagos</strong>
                        <span>
                            <PaymentHistoryModal loanNumber={loanNumber} />
                        </span>
                    </li>
                    <li><strong>Estado del préstamo</strong><span>{status}</span></li>

                    <li>
                        <button
                            className="btn btn-default"
                            style={{ marginTop: '10px' }}
                            type="button"
                            onClick={() => downLoadFile(loanNumber)}
                        >
                                 Descargar contrato
                        </button>
                    </li>
                </StyledList>
            </StyledLoanBody>
        </StyledLoanItem>
    );
};

const StyledLoanItem = styled.div`
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    padding: 30px 30px 0px;
    border-radius: 5px;
    margin-bottom: 30px;
    .modal__body{
        padding-bottom: 20px;
        max-height: 290px;
        opacity: 1;
        transition: opacity 1.75s, max-height 0.25s ease-out;
    }
      .entered {
        max-height: 0;
        opacity: 0;
        padding-bottom: 0px;
        transition: opacity 0.20s, max-height 0.25s ease-in;
      }
      .btn.btn-default{
        background-color: transparent;
        letter-spacing: 0;
        margin-bottom: 0;
        font-weight: 400;
        outline-width: 0;
        color: rgba(115, 115, 115, 0.9);
        text-decoration: underline;
        font-size: 1em;
        padding: 0;
        border: none;
      }
      .btn.btn-default:hover{
        text-decoration: none;
      }
`;
const StyledLoanBody = styled.div`
    font-size: 1.1em;
    font-weight: 500;
    line-height: 1.7;
`;
const StyledLoanTitle = styled.div`
    cursor: pointer;
    position: relative;
    font-size: 1.4em;
    font-weight: 500;
    color: #9edc15;
    padding-bottom:20px;
`;
const StyledList = styled.ul`
    padding: 0;
    list-style: none;
    color: #777;
    font-size: .9em;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    li {
        margin: 10px 0;
    }
    li strong {
        display: inline-block;
        width: 50%;
    }
`;
const StyledArrow = styled.i`
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0;
    top: 17%;
    transition: transform ease .3s;
    transform: rotate(225deg);
    ${({ toggled }) => toggled && `
    transform: rotate(135deg);
  `}
    :before, :after {
        content: '';
        position: absolute;
        background: #9edc15;
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
