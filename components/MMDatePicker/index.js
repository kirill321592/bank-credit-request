import { React } from 'core-front/libs';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class MMDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.INNER_DATE_FORMAT = props.dateFormat || 'DD.MM.YYYY';
        this.VIEW_DATE_FORMAT = 'DD.MM.YYYY';

        this.state = {
            date: props && props.value ? moment(props.value, this.INNER_DATE_FORMAT) : null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            date
        });

        this.props.onChange(date ? date.format(this.INNER_DATE_FORMAT) : null);
    }

    render() {
        return (
            <DatePicker
                customInput={<InputMask mask="99.99.9999" alwaysShowMask={false} type="tel" />}
                openToDate={ this.state.date || moment('1980-01-01') }
                selected={ this.state.date }
                onChange={ this.handleChange }
                dateFormat={ this.VIEW_DATE_FORMAT }
                placeholderText="dd.mm.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="form-control"
                name={this.props.name}
            />
        );
    }
}
