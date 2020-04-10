import { React, styled } from 'core-front/libs';
import { Field } from 'redux-form';
import { CalcAmountSlider, CalcDurationSlider } from '../index';
import { SETTINGS } from '../../settings';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            durationTooltip: ''
        };
    }

    componentDidMount() {
        const { editable: { amount, duration }, changeCalculator } = this.props;

        changeCalculator(amount, duration, 'AMOUNT');
    }

    componentWillReceiveProps(nextProps) {
        const { CALCULATOR: { MESSAGE_TYPES, MESSAGE_TEXTS }} = SETTINGS;

        if (!nextProps.closed && nextProps.editable.info.includes(MESSAGE_TYPES.POPOVER_GET_PERIOD_30)) {
            this.setState({ durationTooltip: MESSAGE_TEXTS.POPOVER_GET_PERIOD_30 });
        } else {
            this.setState({ durationTooltip: '' });
        }
    }

    amountChange = (e, newVal, oldVal) => {
        const { editable: { duration }, changeCalculator } = this.props;

        if (newVal !== oldVal) {
            changeCalculator(newVal, duration, 'AMOUNT');
        }
    };

    durationChange = (oldVal, newVal) => {
        const { editable: { amount }, changeCalculator } = this.props;

        if (newVal !== oldVal) {
            changeCalculator(amount, newVal, 'DURATION');
        }
    };

    render() {
        const { config, editable = {}, closed, getDurationByIndex } = this.props;
        const { CALCULATOR: { MESSAGE_TYPES }} = SETTINGS;
        const { durationTooltip } = this.state;

        return (
            <StyledCalc closed={closed}>
                <CalcSliderWrap type="AMOUNT">
                    <Field
                        closed={closed}
                        component={CalcAmountSlider}
                        editable={editable}
                        config={config.amount}
                        type="tel"
                        name="editable.amount"
                        label="¿Cuánto necesitas?"
                        onChange={this.amountChange}
                    />
                </CalcSliderWrap>

                <CalcSliderWrap type="DURATION">
                    <Field
                        closed={closed}
                        infoTooltip={durationTooltip}
                        component={CalcDurationSlider}
                        editable={editable}
                        config={config.duration}
                        type="tel"
                        name="editable.duration"
                        label="¿Cuándo prefieres devolverlo?"
                        durationChange={this.durationChange}
                        getDurationByIndex={getDurationByIndex}
                    />
                </CalcSliderWrap>

                {editable.info.includes(MESSAGE_TYPES.INFO_ZERO_INTEREST) && (
                    <div className="interest-block">
                    Intereses <strong>0 EUR</strong>
                    </div>
                )}

                {editable.info.includes(MESSAGE_TYPES.INFO_PROMO_APPLIED) && (
                    <div className="interest-block">
                        <strong>Descuento de {Math.round(editable.discount)} EUR</strong>
                    </div>
                )}
            </StyledCalc>
        );
    }
}

const StyledCalc = styled.section`
    max-height: ${props => props.closed ? '0' : '600px'};
    overflow: ${props => props.closed ? 'hidden' : 'initial'};;
    transition: all ease .4s;
    background: #fff;
    width: 100%;
    border-radius:  4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    margin-top: ${props => props.closed ? '0' : '20px'};
    padding-bottom: ${props => props.closed ? '0' : '20px'};
    
    .interest-block {
        padding: 10px;
        margin-top: 10px;
        color: #4c4c4c;
        margin-bottom: -20px;
        border-radius: 0 0 4px 4px;
        text-align: center;
        font-size: 16px;
        border-top: 2px solid #9edc16;
    }
`;

const CalcSliderWrap = styled.div`
    padding: 20px 20px 0;
    &:last-child {
        padding: 22px 20px 20px;
    }
    .calc-section-header {
        overflow: hidden;
        margin-bottom: 0;

        &-title {
            font-size: 17px;
            font-weight: 600;
            color: #4c4c4c;
            float: left;
            max-width: ${props => props.type === 'AMOUNT' ? '70%' : '80%'};
            padding-top: 7px;
            @media (max-width: 512px) {
                max-width: ${props => props.type === 'AMOUNT' ? '70%' : '75%'};
            }
        }
        &-input {
            float: right;
            position: relative;
            border-bottom: 1.2px solid #9edc15;
            max-width: ${props => props.type === 'AMOUNT' ? '30%' : '20%'};
            @media (max-width: 512px) {
                max-width: ${props => props.type === 'AMOUNT' ? '30%' : '25%'};
            }
            
            input, span {
                display: block;
                font-size: 26px;
                font-weight: 500;
                color: #94d10c;
            }

            input {
                border: none;
                outline: none;
                height: 37px;
                text-align: right;
                padding-right: 22px;
            }
            
            span {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
          }
        }
    }

    .calc-legend {
        overflow: hidden;
        font-size: 15px;
        font-weight: 500;
        color: #4c4c4c;
        line-height: 1.2;
        & > span {
            margin-top: 7px;
            &:nth-child(1) {
                float: left;
            }
            &:nth-child(2) {
                float: right;
            }
        }
    }
`;