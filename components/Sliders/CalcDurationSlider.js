import { React } from 'core-front/libs';
import { MMSlider } from '..';

export default class extends React.Component {
    constructor(props) {
        super(props);

        const { editable: { duration, durationIndex }} = this.props;

        this.state = {
            inputValue: duration,
            sliderValue: durationIndex,
            needToUpdateInputValue: false // use this state for update inputValue when user enters more or less vales.
        };
    }

    handleChange = (type, value) => {
        const {
            input: { name },
            getDurationByIndex,
            durationChange,
            editable: { duration }
        } = this.props;
        let newVal = value;

        if (type === 'SLIDER') {
            newVal = Number(getDurationByIndex(value));
            this.setState({ inputValue: newVal });
        }

        durationChange(duration, newVal);

        const event = new CustomEvent('sendUserBehavior', {
            detail: {
                event: 'change',
                target: name,
                value: newVal
            }
        });

        document.dispatchEvent(event);
    };

    handleManualChange = e => {
        const { config: { min, max }, editable: { duration }} = this.props;
        let value = +e.target.value;

        if (value === duration) {
            return;
        }

        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }

        this.setState({ needToUpdateInputValue: true });

        this.handleChange('INPUT', value);
    };

    componentDidUpdate(prevProps) {
        const { editable: { duration, durationIndex }} = this.props;
        const { inputValue, needToUpdateInputValue } = this.state;

        if (prevProps.editable.duration !== duration) {
            this.setState({ inputValue: duration, needToUpdateInputValue: false });
        } else if (needToUpdateInputValue && inputValue !== duration) {
            this.setState({ inputValue: duration, needToUpdateInputValue: false });
        }

        if (prevProps.editable.durationIndex !== durationIndex) {
            this.setState({ sliderValue: durationIndex });
        }
    }

    render() {
        const {
            config: {
                minIndex,
                maxIndex,
                step,
                max,
                min
            },
            label,
            editable: {
                stepType
            },
            infoTooltip,
            closed
        } = this.props;
        const { inputValue, sliderValue } = this.state;

        return (
            <>
                <div className="calc-section-header">
                    <div className="calc-section-header-title">{label}</div>
                    <div className="calc-section-header-input">
                        <input
                            onBlur={this.handleManualChange}
                            value={inputValue}
                            type="tel"
                            onChange={e => { this.setState({ inputValue: +e.target.value }); }}
                            name="durationOfCalc"
                        />
                        <span>{stepType !== 'MONTH' ? 'd': 'm'}</span>
                    </div>
                </div>

                <MMSlider
                    infoTooltip={infoTooltip}
                    handleChange={this.handleChange.bind(this, 'SLIDER')}
                    value={sliderValue}
                    step={step}
                    min={minIndex}
                    max={maxIndex}
                    closed={closed}
                />

                <div className="calc-legend">
                    <span className="calc-label">
                        <span>{min}</span>
                    </span>
                    <span className="calc-label">
                        <span>{max}</span>
                    </span>
                </div>
            </>
        );
    }
}
