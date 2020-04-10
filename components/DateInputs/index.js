import { React, styled } from 'core-front/libs';

export default class extends React.Component {
    constructor(props) {
        super(props);

        // EXPECTED_DATE_FORMAT = 'DD.MM.YYYY';

        const { value } = props;
        const dateArr = value ? value.split('.') : ['', '', ''];

        this.monthInput = React.createRef();
        this.yearInput = React.createRef();

        this.state = {
            day: dateArr[0],
            month: dateArr[1],
            year: dateArr[2]
        };
    }

    handleChange(type, e) {
        const { normalize } = this.props;
        const { value } = e.target;

        this.setState({
            ...this.state,
            [type]: normalize(value)
        });

        // if full day or month jump to next field
        if (value.length === 2) {
            if (type === 'day') {
                this.monthInput.current.focus();
            } else if (type === 'month') {
                this.yearInput.current.focus();
            }
        }
    }

    handleBlur(type, e) {
        const { value } = e.target;

        if (['day', 'month'].includes(type) && value.length === 1) {
            this.setState({
                ...this.state,
                [type]: `0${value}`
            }, this.triggerFormEvents);
        } else {
            this.triggerFormEvents();
        }
    }

    triggerFormEvents = () => {
        const { day, month, year } = this.state;
        const date = `${day}.${month}.${year}`;

        if (date.length === 10) {
            this.props.onChange(date);
            this.props.onBlur(date);
        }
    };

    render() {
        const { day, month, year } = this.state;
        const { name } = this.props;

        return (
            <StyledDateSelectWrapper
                data-full-value={`${day}.${month}.${year}`}
                id={name}
            >
                <input
                    onChange={this.handleChange.bind(this, 'day')}
                    onBlur={this.handleBlur.bind(this, 'day')}
                    className="form-control"
                    data-part-of={name}
                    name={`${name}Day`}
                    placeholder="DD"
                    maxLength="2"
                    value={day}
                    type="tel"
                />
                <input
                    onChange={this.handleChange.bind(this, 'month')}
                    onBlur={this.handleBlur.bind(this, 'month')}
                    className="form-control"
                    ref={this.monthInput}
                    name={`${name}Month`}
                    data-part-of={name}
                    placeholder="MM"
                    maxLength="2"
                    value={month}
                    type="tel"
                />
                <input
                    onChange={this.handleChange.bind(this, 'year')}
                    onBlur={this.handleBlur.bind(this, 'year')}
                    className="form-control"
                    name={`${name}Year`}
                    ref={this.yearInput}
                    data-part-of={name}
                    placeholder="AAAA"
                    maxLength="4"
                    value={year}
                    type="tel"
                />
            </StyledDateSelectWrapper>
        );
    }
}

const StyledDateSelectWrapper = styled.div`
    input {
        display: inline-block;
        width: 30%;
        height: 50px;
        padding: 12px;
        @media (max-width: 767px) {
            height: 40px;
            padding: 10px;
        }

        &:nth-child(2) {
            margin: 0 5%;
        }
    }
`;
