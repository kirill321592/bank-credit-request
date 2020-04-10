import { React, styled } from 'core-front/libs';

import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { USER_CREDIT_STATUSES } from 'constants/users';
import { LOAN_RESTRUCTURING_STATUSES } from 'constants/loans';

const { useState } = React;

const shouldShowNextPaymentDate = status => {
    const statuses = [
        LOAN_RESTRUCTURING_STATUSES.active,
        LOAN_RESTRUCTURING_STATUSES.expired,
    ];

    return statuses.includes(status);
};

const LoanRestructuring = ({ creditStatus, creditInitialCurrency, restructuring, expiredDebt }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState);
    };

    const renderRestructuringSchedule = () => {
        const {
            status, schedule, restructingRequestDate, restructingStartDate, restructingNextPaymentDate,
        } = restructuring;

        return (
            <Collapse in={isVisible}>
                <StyledRestructuringWrapper>
                    <StyledRestructuringItem>
                        <div className="value">
                            {restructingRequestDate}
                        </div>
                        <div className="title">Inicio de la reestructuración:</div>
                    </StyledRestructuringItem>

                    <StyledRestructuringItem>
                        <div className="value">
                            {shouldShowNextPaymentDate(status) ? restructingNextPaymentDate : restructingStartDate}
                        </div>
                        <div className="title">Próxima fecha de pago:</div>
                    </StyledRestructuringItem>

                    <StyledRestructuringItem>
                        <div className="title">Calendario de pagos</div>
                    </StyledRestructuringItem>

                    <StyledRestructuringSchedule>
                        <div className="schedule-row header">
                            <div className="value">Cantidad</div>
                            <div className="title">Fecha del pago</div>
                        </div>

                        {schedule && schedule.map(item => (
                            <div className="schedule-row" key={item.paymentDate}>
                                <div className="value">{item.paymentAmount} €</div>
                                <div className="title">{item.paymentDate}</div>
                            </div>
                        ))}
                    </StyledRestructuringSchedule>
                </StyledRestructuringWrapper>
            </Collapse>
        );
    };

    const renderRestructuringActions = () => {
        const { status, daysBeforeActivationText } = restructuring;

        if (status === LOAN_RESTRUCTURING_STATUSES.new) {
            return (
                <>
                    <Link to="/secure/restructing" className="btn btn-block btn-lg btn-alert">
                        PAGAR DEUDA A PLAZOS
                    </Link>

                    <Link to="/secure/loan/pay?payment=NEXT_PAYMENT" className="btn btn-block btn-lg btn-primary">
                        REALIZAR PAGO
                    </Link>
                </>
            );
        }

        return (
            <>
                <Link to="/secure/loan/pay?payment=NEXT_PAYMENT" className="btn btn-block btn-lg btn-alert">
                    PAGAR CUOTA
                </Link>

                {(status === LOAN_RESTRUCTURING_STATUSES.waitPayment) && (
                    <div className="hint">
                        Debes pagar la 1a cuota en los <b>próximos {daysBeforeActivationText}</b>
                    </div>
                )}

                <Link to="/secure/loan/pay?payment=TOTAL" className="btn btn-block btn-lg btn-primary">
                    PAGAR TOTALIDAD
                </Link>
            </>
        );
    };

    const { status } = restructuring;

    const isNewRestructuring = (status === LOAN_RESTRUCTURING_STATUSES.new);
    const shouldShowAmount = (isNewRestructuring || (status === LOAN_RESTRUCTURING_STATUSES.waitForPayment));

    let title = 'Restructuración:';

    if (shouldShowAmount) {
        title = (
            <>
                Importe pendiente: <b>{expiredDebt} {creditInitialCurrency}</b>
            </>
        );
    }

    return (
        <>
            <StyledRestructuringHeader>
                {(!isNewRestructuring) && (
                    <div className="toggle-link" onClick={toggleVisibility}>
                        Ver detalles
                    </div>
                )}

                <div className="contribution-info">
                    <span className={(creditStatus !== USER_CREDIT_STATUSES.active) ? 'has-error' : ''} />
                    {title}
                </div>
            </StyledRestructuringHeader>

            {!isNewRestructuring && renderRestructuringSchedule()}

            {renderRestructuringActions()}
        </>
    );
};

export default LoanRestructuring;

const StyledRestructuringHeader =styled.div`
    line-height: 1.3;
    letter-spacing: -.3px;
    color: #737373;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    margin-bottom: 17px;
    
    @media (max-width: 575px) {
        font-size: 15px;
        line-height: 1.63;
    }

    .toggle-link {
        cursor: pointer;
        float: right;
        font-size: 18px;
        line-height: 34px;
        text-decoration: underline;
        
        @media screen and (max-width: 991px) {
            font-size: 14px;
            line-height: 24px;
        }
        
        &:hover {
            text-decoration: none;
        }
    }

    span {
        display: inline-block;
        margin-right: 14px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        vertical-align: middle;
        background-color: #9edc15;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(../img/check.svg);
        
        @media (max-width: 575px) {
            width: 25px;
            height: 25px;
            margin-right: 7px;
            margin-bottom: 3px;
            background-size: 13px 9px;
        }
        
        &.has-error {
            background-color: #ff4b4b;
            background-image: url(../img/icon-close.svg);
        }
    }
`;

const StyledRestructuringWrapper = styled.div`
    line-height: 1.4;
    letter-spacing: -.3px;
    color: #737373;
    font-size: 18px;

    .title {
        overflow: hidden;
    }

    .value {
        float: right;
        text-align: right;
    }
`;

const StyledRestructuringItem = styled.div`
    overflow: hidden;
    padding-bottom: 10px;
    
    @media screen and (max-width: 991px) {
        font-size: 14px;
    }

    .title {
        font-weight: 700;
    }
`;

const StyledRestructuringSchedule = styled.div`
    .schedule-row {
        border-bottom: 1px solid hsla(0, 1%, 83%, .9);
        font-size: 13px;
        margin: 0 0 15px;
        padding-bottom: 8px;
    }

    .header {
        font-size: 14px;
        font-weight: 700;
    }
`;
