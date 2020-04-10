import { React, styled } from 'core-front/libs';

import { Table } from 'reactstrap';

import { PRIVATE_AREA_API } from 'api';

import { sendPostRequest } from 'helpers/request';

import BaseModal from 'components/BaseModal';

const { useState } = React;

const PaymentHistoryModal = ({ loanNumber }) => {
    const [history, setHistory] = useState([]);

    const getHistoryDetails = () => {
        sendPostRequest(PRIVATE_AREA_API.LOAN_HISTORY_DETAIL, { loanId: loanNumber })
            .then(({ loanHistoryLoanDetailsObjects }) => {
                setHistory(loanHistoryLoanDetailsObjects || []);
            })
            .catch(() => {});
    };

    return (
        <StyledWrapper>
            <BaseModal
                className="modal-private-area"
                link="Ver detalle"
                title="Historial de pagos"
                actionModal={getHistoryDetails}
            >
                <StyledTable>
                    <Table responsive>
                        <colgroup>
                            <col width="20%" />
                            <col />
                            <col width="15%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Proceso</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!history.length && history.map(({ date, operation, amount }, index) => (
                                <tr key={`${date}-${index}`}>
                                    <td>{date}</td>
                                    <td>{operation}</td>
                                    <td className="amount">{amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </StyledTable>
            </BaseModal>
        </StyledWrapper>
    );
};

export default PaymentHistoryModal;

const StyledWrapper = styled.span`
    .btn {
        &.btn-default {
            background-color: transparent;
            letter-spacing: 0;
            margin-bottom: 0;
            margin-top: 0;
            font-weight: 400;
            outline-width: 0;
            color: rgba(115, 115, 115, .9);
            text-decoration: underline;
            font-size: 1em;
            padding: 0;
            border: none;
            
            &:hover {
                text-decoration: none;
            }
            
            &:focus {
                background-color: transparent;
                border-color: transparent;
                outline: none;
            }
            
            &:active {
                box-shadow: none;
            };
        }
    }
`;

const StyledTable = styled.div`
    .table-responsive {
        @media (max-width: 767px) {
            border: none;
        }
    }

    .amount {
        white-space: nowrap;
    }
`;
