import { React, styled } from 'core-front/libs';
import { setGaPage } from 'core-front/actions/ga';

import { change, Form, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { compose } from 'redux';

import { nextStep } from '../../actions/step';

import Cancelled from './Reasons/Cancelled';
import Pending from './Reasons/Pending';
import Processing from './Reasons/Processing';
import Draft from './Reasons/Draft';

const FORM_NAME = 'decisionForm';

class Decision extends React.Component {
    componentDidMount() {
        const { status } = this.props;

        switch (status) {
        case 'CANCELLED':
            setGaPage('/secure/registration/decision/decline');
            break;
        case 'PENDING':
            setGaPage('/secure/registration/decision/verification');
            break;
        case 'PROCESSING':
        case 'ACTIVE':
            setGaPage('/secure/registration/decision/approval');
            break;
        case 'DRAFT':
            setGaPage('/secure/registration/decision/counteroffer');
            break;
        default:
            break;
        }
    }

    submitDecision = reason => {
        const { dispatch, form } = this.props;

        dispatch(change(form, 'decisionReason.reason', reason));
        dispatch(submit(form));
    };

    render() {
        const { status, userInfo, handleSubmit, submitting } = this.props;

        return (
            <StyledDecision>
                <Form onSubmit={handleSubmit(nextStep)} noValidate>
                    {{
                        CANCELLED: (
                            <Cancelled
                                submitting={submitting}
                                userInfo={userInfo}
                                submitDecision={this.submitDecision}
                            />
                        ),
                        PENDING: (
                            <Pending
                                submitting={submitting}
                                userInfo={userInfo}
                                submitDecision={this.submitDecision}
                            />
                        ),
                        PROCESSING: (
                            <Processing
                                submitting={submitting}
                                userInfo={userInfo}
                                submitDecision={this.submitDecision}
                            />
                        ),
                        DRAFT: (
                            <Draft
                                submitting={submitting}
                                userInfo={userInfo}
                                submitDecision={this.submitDecision}
                            />
                        ),
                    }[status]}
                </Form>
            </StyledDecision>
        );
    }
}

export default compose(
    connect(({ step: { data: { status, name, sex }}, header }) => ({
        status,
        userInfo: { name: sex === 'MAN' ? `Sr. ${name}` : `Sra. ${name}` },
        header
    })),
    reduxForm({
        form: FORM_NAME
    })
)(Decision);

const StyledDecision = styled(Row)`
    h1 {
        position: relative;
        font-weight: 700;
        margin: 0 0 30px;
        line-height: 1.2;
        font-size: 26px;
        overflow: hidden;

        @media (max-width: 575px) {
            font-size: 18px;
            letter-spacing: -0.4px;
        }

        img {
            display: block;
            float: left;
            margin-right: 20px;
            height: 68px;
        }
    }
    p {
        margin: 0 0 23px;
        line-height: 1.6;
        font-weight: normal;
        span {
            font-size: 24px;
        }
    }
    ul {
        padding-left: 15px;
        font-size: 1.2em;
        line-height: 1.6;
        font-weight: normal;
    }
    .draft-btn {
        margin-bottom: 0;
    }
`;
