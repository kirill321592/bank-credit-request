import { React, styled } from 'core-front/libs';
import { notify } from 'core-front/api';

import { useSelector } from 'react-redux';

import { PRIVATE_AREA_API } from 'api';

import { LOAN_PAYMENT_STATUSES } from 'constants/loans';

import { sendGetRequest } from 'helpers/request';

import LoanMainInfo from 'PrivateArea/Loan/MainInfo';
import LoanDetails from 'PrivateArea/Loan/Details';

const { useState, useEffect, useCallback } = React;

const Loan = () => {
    const { loanDetails } = useSelector(state => state.privateAreaUser);

    const [payments, setPayments] = useState({});
    const [paymentsSchedule, setPaymentsSchedule] = useState([]);
    const [restructuring, setRestructuring] = useState({});

    const loadPaymentSchedule = useCallback(() => {
        sendGetRequest(PRIVATE_AREA_API.PAYMENT_SCHEDULE)
            .then(({ data }) => {
                const { paymentSchedule } = data;
                const groupedPayments = {};

                Object.keys(LOAN_PAYMENT_STATUSES).forEach(key => {
                    const status = LOAN_PAYMENT_STATUSES[key];
                    const payments = paymentSchedule.filter(payment => (payment.paymentStatus === status));

                    groupedPayments[status] = payments.length;
                });

                setPaymentsSchedule(paymentSchedule);
                setPayments(groupedPayments);
            })
            .catch(notify);
    }, []);

    const loadRestructuringSchedule = () => {
        sendGetRequest(PRIVATE_AREA_API.RESTRUCTURING_SCHEDULE)
            .then(({ data }) => {
                setRestructuring(prevState => ({
                    ...prevState,
                    schedule: data.schedule,
                }));
            })
            .catch(notify);
    };

    const loadRestructuring = useCallback(() => {
        sendGetRequest(PRIVATE_AREA_API.RESTRUCTURING)
            .then(({ data }) => {
                setRestructuring(data.schedule);
                loadRestructuringSchedule();
            })
            .catch(notify);
    }, []);

    useEffect(() => {
        loadPaymentSchedule();
        loadRestructuring();
    }, [loadPaymentSchedule, loadRestructuring]);

    if (!loanDetails.creditNumber) {
        return null;
    }

    return (
        <StyledWrapper>
            <LoanMainInfo
                {...loanDetails}
                totalPayments={paymentsSchedule.length}
                payments={payments}
                restructuring={restructuring}
            />

            <LoanDetails
                {...loanDetails}
                paymentsSchedule={paymentsSchedule}
            />
        </StyledWrapper>
    );
};

export default Loan;

const StyledWrapper = styled.div`
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
    border-radius: 4px;
`;
