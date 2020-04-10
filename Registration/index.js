import { React, styled } from 'core-front/libs';
import { setGTMHistoryChange, cookies, ga, api } from 'core-front';
import { UserBehavior } from 'core-front/dist/UserBehaviorV2';
import { fetchUserData } from 'core-front/actions/user';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchStep } from '../actions/step';

import {
    EditableCalculator,
    UseDeskChat,
    ServerError,
    ContactUs,
    InfoBlock,
    Header,
    Footer,
    Loader,
} from '../components';

import STEPS from '../steps';
import { API } from '../api';

const { sendSubmitOk, setGaPage, pageView, setUserDataToDimensions } = ga;

class Registration extends React.Component {
    state = { gaId: null };

    componentDidMount() {
        const { fetchStep, location: { search }} = this.props;
        const clientID = cookies.getCookie('_ga');
        const re = /(GA\d+\.\d+\.)(.+)/;

        if (clientID) {
            this.setState({ gaID: clientID.match(re) });
        }

        fetchStep(search);

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }

    checkSession = data => {
        if (!data.ttl) return data;

        if (this.timeoutId) window.clearTimeout(this.timeoutId);

        this.timeoutId = window.setTimeout(() => {
            window.location.reload();
        }, data.ttl);

        return data;
    };

    componentDidUpdate({ name: oldName }) {
        const { name, history, fetchUserData } = this.props;
        const { gaID } = this.state;

        if (oldName !== name) {
            const nextStep = STEPS[name];

            if (oldName) {
                const prevStep = STEPS[oldName];

                window.scrollTo(0, 0);

                setGTMHistoryChange(prevStep.GTM_FRAGMENT, nextStep.GTM_FRAGMENT);
                sendSubmitOk(prevStep.GA.CATEGORY);

                // remove get params on page change
                if (history.location.search) history.push(history.location.pathname);
            }

            if (nextStep) {
                setGaPage(nextStep.GA.STEP);

                fetchUserData(API.CURRENT_USER)
                    .then(this.checkSession)
                    .then(response => setUserDataToDimensions({
                        ...response,
                        clientId: gaID && gaID[2] ? gaID[2] : undefined,
                        userAccountId: response.userId
                    }))
                    .finally(pageView);
            } else {
                api.notify(`Unhandled step - ${name}`);
            }
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) window.clearTimeout(this.timeoutId);

        window.onpopstate = null;
    }

    renderStep = () => {
        const { readyStatus, name } = this.props;

        if (
            !readyStatus ||
            readyStatus === 'STEP_INVALID' ||
            readyStatus === 'STEP_REQUESTING'
        ) {
            return <Loader />;
        } else if (readyStatus === 'STEP_FAILURE') {
            return <ServerError />;
        }

        const { COMPONENT, OPTIONS } = STEPS[name];
        const step = (
            <React.Suspense fallback={<Loader />}>
                {COMPONENT}
            </React.Suspense>
        );

        return (
            <>
                {OPTIONS.FULL_WIDTH ? (
                    <Col xs={12}>{step}</Col>
                ) : (
                    <>
                        <Col md={6}>{step}</Col>
                        <aside className="col-md-5 col-md-offset-1">
                            <React.Suspense fallback="">
                                {OPTIONS.TOP_SIDEBAR_COMPONENT}
                            </React.Suspense>
                            {OPTIONS.SHOW_CALC && <EditableCalculator />}
                            <div className="hidden-xs hidden-sm">
                                {OPTIONS.SHOW_CONTACT && <ContactUs registration={true} />}
                                {OPTIONS.SHOW_INFO && <InfoBlock registration={true} />}
                            </div>
                        </aside>
                    </>
                )}
            </>
        );
    };

    render() {
        const { name, userData, options: { SHOW_CALC }} = this.props;
        const LAYOUT_TYPE = SHOW_CALC ? 'CALCULATOR': 'BASE';

        return (
            <>
                <Header
                    step={name && STEPS[name].CRUMB_STEP}
                    registration={true}
                />

                <Grid style={{ maxWidth: '1010px' }}>
                    <StyledWrapperRow layout={LAYOUT_TYPE}>
                        {this.renderStep()}
                    </StyledWrapperRow>
                </Grid>

                <Footer showLogos={true} />

                <UseDeskChat />

                <UserBehavior
                    ubEndPoint={API.USER_BEHAVIOR}
                    userData={userData}
                    currentStep={name}
                />
            </>
        );
    }
}

export default connect(
    ({ step: { readyStatus, name, errors }, user }) => ({
        userData: user.userData,
        readyStatus,
        errors,
        name,
        options: name ? STEPS[name].OPTIONS : {},
    }),
    { fetchStep, fetchUserData }
)(Registration);

const StyledWrapperRow = styled(Row)`
    padding-top: 80px;
    padding-bottom: 100px;

    @media (max-width: 991px) {
        padding-top: ${props => props.layout === 'BASE' ? '80px' : '137px'};
        padding-bottom: 30px;
    }

    @media (max-width: 767px) {
        padding-bottom: 0;
    }
`;
