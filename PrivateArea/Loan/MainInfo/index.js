import { React, styled } from 'core-front/libs';

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { USER_CREDIT_STATUSES } from 'constants/users';
import { LOAN_PAYMENT_STATUSES, LOAN_TYPES } from 'constants/loans';

import { PROLONGATION_PAGE } from 'PrivateArea/config';

import LoanRestructuring from 'PrivateArea/Loan/Restructuring';

const defaultPassedPayments = 0;

const shouldBeHidden = status => {
    const statuses = [
        USER_CREDIT_STATUSES.pending,
        USER_CREDIT_STATUSES.processing,
    ];

    return statuses.includes(status);
};

const LoanMainInfo = ({
    creditStatus, financeType, nextPaymentAmount, creditInitialCurrency, nextPaymentDate, showRestructing,
    payments, totalPayments, showRollover, restructuring, expiredDebt,
}) => {
    if (!creditStatus || shouldBeHidden(creditStatus)) {
        return null;
    }

    const renderPayments = () => {
        const isExpired = ((creditStatus === USER_CREDIT_STATUSES.expired) && expiredDebt);
        const hasPaymentSchedule = (!isExpired && totalPayments);
        const passedPayments = (payments[LOAN_PAYMENT_STATUSES.done] || defaultPassedPayments);

        return (
            <>
                {!!isExpired && (
                    <StyledExpiredHeader>
                        <span /> Importe pendiente: <b>{expiredDebt} {creditInitialCurrency}</b>
                    </StyledExpiredHeader>
                )}

                {!!hasPaymentSchedule && (
                    <StyledPaymentSchedule>
                        <span className="icon" />
                        <b>{passedPayments} / {totalPayments} cuotas</b>
                        pagadas correctamente
                    </StyledPaymentSchedule>
                )}

                <Link className="btn btn-block btn-lg btn-primary" to="/secure/loan/pay?payment=NEXT_PAYMENT">
                    REALIZAR PAGO
                </Link>
            </>
        );
    };

    const renderTitle = () => {
        if (financeType === LOAN_TYPES.payday) {
            return 'A devolver';
        }

        if (creditStatus === USER_CREDIT_STATUSES.expired) {
            return 'Cuota vencida';
        }

        return 'Próxima cuota';
    };

    return (
        <StyledWrapper>
            <StyledHeader>
                <Col xs={6}>
                    <StyledTitle>
                        {renderTitle()}
                    </StyledTitle>
                    <StyledValue>{nextPaymentAmount} {creditInitialCurrency}</StyledValue>
                </Col>

                <Col xs={6}>
                    <StyledTitle>Pague antes de:</StyledTitle>
                    <StyledValue>{nextPaymentDate}</StyledValue>
                </Col>
            </StyledHeader>

            {showRestructing ? (
                <LoanRestructuring
                    creditStatus={creditStatus}
                    creditInitialCurrency={creditInitialCurrency}
                    restructuring={restructuring}
                    expiredDebt={expiredDebt}
                />
            ) : renderPayments()}

            {showRollover && (
                <Link className="btn btn-block btn-lg btn-primary" to={PROLONGATION_PAGE.url}>
                    <span className="icon-clock" />
                    PEDIR UNA PRÓRROGA
                </Link>
            )}
        </StyledWrapper>
    );
};

export default LoanMainInfo;

const StyledWrapper = styled.div`
    background: #fff;
    padding: 30px 30px 9px;
    color: rgba(76, 76, 76, .9);
    font-weight: 500;
    
    .btn {
        margin-bottom: 19px;
        margin-top: 19px;
    }
    
    .icon-clock {
        display: inline-block;
        width: 22px;
        height: 24px;
        background: url(../img/ico-clock-mini.svg) no-repeat 50% 0;
        vertical-align: top;
        margin-right: 10px;
    }
    
    .btn-alert {
        background-color: transparent;
        border: 2px solid #ff4b4b;
        color: #ff4b4b;
        padding-bottom: 20px;
        padding-top: 20px;
        
        &:hover,
        &:focus {
            background-color: #ff4b4b;
            color: #fff;
        }

        + .hint {
            color: #ff4b4b;
            margin-top: -10px;
        }
    }
`;

const StyledHeader = styled(Row)`
    border-bottom: 1px solid hsla(0, 1%, 83%, .9);
    margin-bottom: 20px;
    padding-bottom: 30px;
`;

const StyledTitle = styled.div`
    font-size: 23px;
    font-weight: 600;
    line-height: 1.23;
    color: rgba(76, 76, 76, .9);
    
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;

const StyledValue = styled.div`
    font-size: 32px;
    font-weight: 500;
    line-height: .67;
    letter-spacing: -.4px;
    color: #9edc15;
    margin: 15px 0 0;
    
    @media (max-width: 575px) {
        font-size: 27px;
        line-height: .47;
    }
`;

const StyledPaymentSchedule = styled.div`
    line-height: 1.3;
    letter-spacing: -.3px;
    color: #737373;
    font-size: 18px;
    
    span {
        display: inline-block;
        margin-right: 18px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        vertical-align: middle;
        background: url(../img/check.svg) no-repeat 50% #9edc15;
        background-size: 55%;
    }
    
    b {
        font-weight: 700;
        margin-right: 4px;
    }
`;

const StyledExpiredHeader = styled.div`
    line-height: 1.3;
    letter-spacing: -.3px;
    color: #737373;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    margin-bottom: 17px;

    span {
        display: inline-block;
        margin-right: 14px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #ff4b4b;
        background-image: url(../img/icon-close.svg);
    }
`;
