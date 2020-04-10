import { React } from 'core-front/libs';

import { MMSlider } from '..';

const nearest = (value, min, max, steps) => {
    const multiplier = Math.round((value - min) * steps / (max - min)) / steps; // bring to 0-1 range

    return multiplier * (max - min) + min;
};

export default class extends React.Component {
    constructor(props) {
        super(props);

        const { input: { value }} = this.props;

        this.state = { calcValue: value };
    }

    handleChange = value => {
        const { config: { max }, input: { onChange, name }} = this.props;

        this.setState({ calcValue: value });
        onChange(value ? value : max);

        const event = new CustomEvent('sendUserBehavior', {
            detail: {
                event: 'change',
                target: name,
                value
            }
        });

        document.dispatchEvent(event);
    };

    componentDidUpdate(prevProps) {
        const { editable: { amount }} = this.props;

        if (prevProps.editable.amount !== amount) {
            this.setState({ calcValue: amount });
        }
    }

    handleManualChange = e => {
        const { config: { min, max, step }} = this.props;
        const steps = (max - min) / step;

        let value = +e.target.value;

        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }  else {
            value = nearest(value, min, max, steps);
        }

        this.handleChange(value);
    };

    render() {
        const { label, input: { value }, config: { min, max, step }, closed } = this.props;
        const { calcValue } = this.state;

        return (
            <>
                <div className="calc-section-header">
                    <div className="calc-section-header-title">{label}</div>
                    <div className="calc-section-header-input">
                        <input
                            onBlur={this.handleManualChange}
                            value={calcValue}
                            type="tel"
                            onChange={e => { this.setState({ calcValue: e.target.value }); }}
                            name="amountOfCalc"
                        />
                        <span>€</span>
                    </div>
                </div>

                <MMSlider
                    closed={closed}
                    handleChange={this.handleChange}
                    value={value}
                    step={step}
                    min={min}
                    max={max}
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
