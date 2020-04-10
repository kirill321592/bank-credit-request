import { React } from 'core-front/libs';
import InputMask from 'react-input-mask';

export default class MMMaskedInput extends React.Component {
    static formatValue(val) {
        return val.replace(/[^0-9a-zA-Z.-]/g, '');
    }

    constructor(props) {
        super(props);

        this.state = { value: props.value };
    }

    handleChange = event => {
        const value = MMMaskedInput.formatValue(event.target.value);

        this.setState({ value });

        this.props.onChange(value || null);
    };

    handleBlur = event => {
        this.props.onBlur(MMMaskedInput.formatValue(event.target.value));
    };

    render() {
        return (
            <InputMask
                className="form-control"
                alwaysShowMask={true}
                maskChar={this.props.maskChar || ' '}
                id={this.props.name}
                {...this.props}
            />
        );
    }
}
