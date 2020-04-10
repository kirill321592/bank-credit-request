import { React } from 'core-front/libs';
import { ga } from 'core-front';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PRIVATE_AREA_API } from 'api';

import { fetchNextPage } from 'actions/privateArea/pages';
import { setCreditStatus } from 'actions/privateArea/user';

import { PAGE_STATUSES, PAGE_LAYOUT_TYPES } from 'constants/pages';
import { USER_CREDIT_STATUSES, USER_STATUSES } from 'constants/users';

import { sendGetRequest } from 'helpers/request';

import { ServerError, Loader } from 'components';

import BaseLayout from 'PrivateArea/layout/Base';
import TwoColumnLayout from 'PrivateArea/layout/TwoColumn';
import LoanDetailLayout from 'PrivateArea/layout/LoanDetail';

const { useState, useEffect, useCallback, Suspense } = React;

const layoutComponents = {
    [PAGE_LAYOUT_TYPES.base]: BaseLayout,
    [PAGE_LAYOUT_TYPES.twoColumn]: TwoColumnLayout,
    [PAGE_LAYOUT_TYPES.loanDetail]: LoanDetailLayout,
};

const PrivateArea = ({ component, name: pageName, title, options = {}, analytics = {}}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { readyStatus } = useSelector(state => state.privateAreaPages);
    const { status, creditStatus } = useSelector(state => state.privateAreaUser);

    const { layoutType, layoutSettings, isAvailableForUnauthorizedUsers, shouldRequestLoanDetailInfo } = options;

    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

    useEffect(() => {
        if (isInitialDataLoaded) {
            return;
        }

        fetchNextPage(history, isAvailableForUnauthorizedUsers)(dispatch)
            .then(() => {
                setIsInitialDataLoaded(true);
            });
    }, [history, dispatch, isInitialDataLoaded, isAvailableForUnauthorizedUsers]);

    useEffect(() => {
        if (!shouldRequestLoanDetailInfo) {
            return;
        }

        if ((status !== USER_STATUSES.authorized) || (creditStatus !== USER_CREDIT_STATUSES.loading)) {
            return;
        }

        sendGetRequest(PRIVATE_AREA_API.LOAN_DETAIL)
            .then(data => {
                dispatch(setCreditStatus(data));
            })
            .catch(() => {});
    }, [status, dispatch, creditStatus, shouldRequestLoanDetailInfo]);

    const sendDataToGa = useCallback(() => {
        ga.setGaPage(analytics.pageUrl || pageName);

        ga.getGA(PRIVATE_AREA_API.GET_ANALYTICS)()
            .then(({ data }) => {
                dispatch({ type: 'SET_PAGE_ANALYTICS', analyticsData: data });
                ga.setUserDataToDimensions(data);
            })
            .catch(() => {})
            .finally(ga.pageView);
    }, [analytics.pageUrl, pageName, dispatch]);

    useEffect(() => {
        sendDataToGa();
    }, [history.location, sendDataToGa]);

    const renderPageContent = () => {
        if (!readyStatus || (readyStatus === PAGE_STATUSES.invalid) || (readyStatus === PAGE_STATUSES.requesting)) {
            return <Loader />;
        }

        if (readyStatus === PAGE_STATUSES.failed) {
            return <ServerError />;
        }
     
        return (
            <Suspense fallback={<Loader />}>
                {component}
            </Suspense>
        );
    };

    const content = renderPageContent();
    let LayoutComponent = layoutComponents[layoutType];

    if (readyStatus === PAGE_STATUSES.failed) {
        LayoutComponent = layoutComponents.base;
    }

    if (!LayoutComponent) {
        return null;
    }

    return (
        <LayoutComponent options={layoutSettings} title={title}>
            {content}
        </LayoutComponent>
    );
};

export default PrivateArea;
