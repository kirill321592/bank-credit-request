import { React, styled } from 'core-front/libs';
import { Form, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Loader, PersonalInfo } from '../../components';
import { nextStep } from '../../actions/step';
import { sendIovation } from '../../actions/scoring';
import { initIovation } from 'core-front/actions/iovation';

const FORM_NAME = 'scoringForm';

class Scoring extends React.Component {
    componentDidMount() {
        const { initIovation, sendIovation, flow } = this.props;

        { flow === 'LOAN_PARTNER_FULL_API_SCORING' &&
            initIovation(blackBoxes => {
                sendIovation(blackBoxes);
            });
        }

        this.waitForScoring();
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    waitForScoring = () => {
        const { dispatch, form } = this.props;

        this.intervalID = window.setInterval(() => {
            dispatch(submit(form));
        }, 5000);
    }

    render() {
        const { handleSubmit, initialValues, flow } = this.props;
        const { partnerName } = initialValues;

        return (
            <ScoringWrap>
                <h2>Comprobando tu información</h2>
                <p>
                    Por favor, no cierres esta página, estamos valorando tu solicitud.
                    El proceso puede tardar hasta 2-3 minutos.
                </p>

                <Form onSubmit={handleSubmit(nextStep)} />

                <Loader />

                {flow === 'LOAN_PARTNER_FULL_API_SCORING' && (
                    <PersonalInfo partnerName={partnerName} />
                )}
            </ScoringWrap>
        );
    }
}

export default compose(
    connect(({ step, flow }) => ({
        initialValues: step.data,
        flow: flow.flow
    }), {
        initIovation,
        sendIovation
    }),
    reduxForm({
        form: FORM_NAME
    }),
)(Scoring);

const ScoringWrap = styled.div`
    padding: 70px 0 20px;
    @media (max-width: 767px) {
        padding: 10px 0 20px;
    }

    h2 {
        text-align: center;
        @media (max-width: 767px) {
            font-size: 1.5em;
        }
    }

    p, .personal-info {
        text-align: center;
        font-weight: 500;
        line-height: 1.7;
        max-width: 450px;
        margin: 0 auto 10px auto;
    }
    .personal-info,
    .personal-info p {
        max-width: 650px;
        text-align: left;
    }
    .personal-info .personal-info__title {
        text-align: center;
    }
`;
