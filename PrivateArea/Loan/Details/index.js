import { React, styled } from 'core-front/libs';

import { Table } from 'reactstrap';

import PaymentHistoryModal from 'PrivateArea/shared/PaymentHistoryModal';

const { useState } = React;

const LoanDetails = ({
    creditNumber, creditDeliveryDate, creditInitialAmount, creditRepaidAmount, creditAmountToPay, creditInitialCurrency,
    creditUsagePeriod, creditLocalizedStatus, creditTotalAmount, creditTotalDebt, paymentsSchedule,
}) => {
    const [arePaymentDetailsVisible, setArePaymentDetailsVisible] = useState(false);
    const [arePaymentScheduleVisible, setArePaymentScheduleVisible] = useState(false);

    const togglePaymentDetailsVisibility = () => {
        setArePaymentDetailsVisible(prevState => !prevState);
    };

    const togglePaymentScheduleVisibility = () => {
        setArePaymentScheduleVisible(prevState => !prevState);
    };

    const renderPaymentDetails = () => (
        <li>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total a devolver al final del préstamo</td>
                        <td>{creditTotalAmount} {creditInitialCurrency}</td>
                    </tr>

                    <tr>
                        <td>A devolver a día de hoy (pago anticipado)</td>
                        <td>{creditTotalDebt} {creditInitialCurrency}</td>
                    </tr>
                </tbody>
            </StyledTable>
        </li>
    );

    const renderPaymentSchedule = () => (
        <li>
            <StyledTable className="table-payments">
                <thead>
                    <tr>
                        <th>Fecha del pago</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentsSchedule && paymentsSchedule.map((item, index) => (
                        <tr key={`${item.paymentDate}-${index}`}>
                            <td>{item.paymentDate}</td>
                            <td>{item.paymentAmount} {creditInitialCurrency}</td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </li>
    );

    return (
        <StyledWrapper>
            <li>
                <strong>Número de contrato</strong>
                <span>{creditNumber}</span>
            </li>

            <li>
                <strong>Fecha de aceptación</strong>
                <span>{creditDeliveryDate}</span>
            </li>

            <li>
                <strong>Importe del préstamo</strong>
                <span>{creditInitialAmount} {creditInitialCurrency}</span>
            </li>

            <li>
                <strong>Cantidad devuelta</strong>
                <span>
                    {creditRepaidAmount} {creditInitialCurrency}

                    <span className="link">
                        <PaymentHistoryModal loanNumber={creditNumber} />
                    </span>
                </span>
            </li>

            <li>
                <strong>Total a devolver</strong>
                <span>
                    {creditAmountToPay} {creditInitialCurrency}
                    <span className="link" onClick={togglePaymentDetailsVisibility}>Ver detalle</span>
                </span>
            </li>

            {arePaymentDetailsVisible && renderPaymentDetails()}

            {!!paymentsSchedule.length && (
                <li>
                    <strong>Calendario de pagos</strong>
                    <span className="link" onClick={togglePaymentScheduleVisibility}>Mostrar</span>
                </li>
            )}

            {arePaymentScheduleVisible && renderPaymentSchedule()}

            <li>
                <strong>Duración total</strong>
                <span>{creditUsagePeriod}</span>
            </li>

            <li>
                <strong>Estado del préstamo</strong>
                <span>{creditLocalizedStatus}</span>
            </li>
        </StyledWrapper>
    );
};

export default LoanDetails;

const StyledWrapper = styled.ul`
    background: #9edc15;
    padding: 10px 30px;
    overflow: auto;
    list-style: none;
    margin: 0;
    
    @media (max-width: 767px) {
        padding: 10px 20px;
    }
    
    .btn {
        margin: 20px 0 0;
    }
    
    li {
        margin: 20px 0;
        color: #fff;
        font-size: 1.1em;
        
        @media (max-width: 767px) {
            font-size: 1em;
            margin: 15px 0;
        }

        strong {
            display: inline-block;
            width: 51%;
            
            @media (max-width: 575px) {
                width: 48%;
            }
        }
        
        > span {
            @media (max-width: 575px) {
                width: 52%;
                padding-left: 10px;
                vertical-align: top;
            }
        }

        a {
            color: #fff;
        }
    }
    
    .link {
        line-height: 1.7;
        
        &:hover {
            text-decoration: none;
        }

        .btn.btn-default {
            color: #fff;
            line-height: 1.7;
        }
    }
    
    span {
        > .link {
            margin-left: 6px;
        }
    }
`;

const StyledTable = styled(Table)`
    border-bottom: 1px solid #fff;
    width: 100%;
    
    &.table-payments {
        font-size: 13px;
    }

    th {
        font-weight: 700;
    }

    th, td {
        border-color: #fff !important;
        padding: 10px 0 !important;

        &:first-child {
            width: 80%;
        }
        
        &:last-child {
            text-align: right;
        }
    }
`;
