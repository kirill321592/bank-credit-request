import { React } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';

import { USER_CREDIT_STATUSES } from 'constants/users';

import { setLoanDetails } from 'actions/privateArea/user';

import TwoColumnLayout from 'PrivateArea/layout/TwoColumn';
import LoanProductsList from 'PrivateArea/Products/Loan/List';
import LoanCurrentProduct from 'PrivateArea/Products/Loan/Current';

const { useEffect } = React;

const defaultPageTitle = 'Préstamo en curso';

const pageTitles = {
    [USER_CREDIT_STATUSES.processing]: 'Tu dinero está en camino',
    [USER_CREDIT_STATUSES.pending]: 'Estamos revisando tu solicitud',
    [USER_CREDIT_STATUSES.noActive]: '¡Solicita un préstamo!',
};

const canProlongationAreaBeVisible = status => {
    const statuses = [
        USER_CREDIT_STATUSES.blocked,
        USER_CREDIT_STATUSES.noActive,
    ];

    return !statuses.includes(status);
};

const LoanDetailLayout = ({ children, options = {}}) => {
    const dispatch = useDispatch();

    const { loanDetails: { creditStatus, сounteroffer, showRollover }} = useSelector(state => state.privateAreaUser);

    useEffect(() => {
        dispatch(setLoanDetails());
    }, [dispatch]);

    const commonProps = {
        aside: <LoanProductsList />,
        beforeContent: <LoanCurrentProduct />,
        title: (pageTitles[creditStatus] || defaultPageTitle),
    };

    if (сounteroffer) {
        return (
            <TwoColumnLayout options={options} {...commonProps}>
                {children}
            </TwoColumnLayout>
        );
    }

    const layoutOptions = {
        ...options,
        showLogos: (creditStatus === USER_CREDIT_STATUSES.noActive),
        withProlongation: (showRollover && canProlongationAreaBeVisible(creditStatus)),
    };

    return (
        <TwoColumnLayout options={layoutOptions} {...commonProps}>
            {children}
        </TwoColumnLayout>
    );
};

export default LoanDetailLayout;
