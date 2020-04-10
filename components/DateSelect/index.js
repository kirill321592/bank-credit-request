import { React, styled, moment } from 'core-front/libs';

const defaultYearsRange = -20;

export default class DateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.INNER_DATE_FORMAT = props.dateFormat || 'YYYY-MM-DD';

        this.state = {
            months: moment.months(),
            years: [],
            days: [],
            current: {},
        };
    }

    componentDidMount() {
        this.setInitialValues();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setInitialValues();
        }
    }

    setInitialValues() {
        const { yearsRange, value } = this.props;

        const date = value ? moment(value, this.INNER_DATE_FORMAT) : moment();

        const fromYear = this.getYearByShift(yearsRange ? yearsRange.from : defaultYearsRange);
        const toYear = this.getYearByShift(yearsRange ? yearsRange.to : 1);
        const daysOfMonth = date.daysInMonth();

        this.setState({
            months: moment.months(),
            years: Array(toYear - fromYear + 1).fill().map((_, i) => fromYear + i),
            days: Array.from({ length: daysOfMonth }, (v, k) => k + 1),
            current: {
                month: Number(date.format('MM')) - 1,
                day: Number(date.format('DD')),
                year: Number(date.format('YYYY'))
            }
        });
    }

    handleChange(type, e) {
        const { onChange, onBlur } = this.props;
        const current = { ...this.state.current };

        current[type] = parseInt(e.target.value);

        const daysOfMonth = moment(`${current.year}-${current.month + 1}`, 'YYYY-MM').daysInMonth();

        current.day = ((current.day > daysOfMonth) ? daysOfMonth : current.day);

        const date = moment([current.year, current.month, current.day]);
        const days = Array.from({ length: daysOfMonth }, (v, k) => k + 1);
        const newVal = `${date.format('YYYY')}-${date.format('MM')}-${date.format('DD')}`;

        this.setState({ current, days, fullValue: newVal });
        onChange(newVal);
        onBlur(newVal);
    }

    getYearByShift = shift => new Date().getFullYear() + shift;

    render() {
        const {
            current,
            months,
            years,
            days,
            fullValue
        } = this.state;

        const { name, disabled } = this.props;

        return (
            <StyledDateSelectWrapper id={name} className="row" data-full-value={fullValue}>
                <div className="col-xs-3 item">
                    <StyledFormSelectLight disabled={disabled}>
                        <select
                            value={current.day}
                            data-part-of={name}
                            name={`${name}Day`}
                            onChange={this.handleChange.bind(this, 'day')}
                        >
                            {days && days.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>
                    </StyledFormSelectLight>
                </div>

                <div className="col-xs-6 item">
                    <StyledFormSelectLight disabled={disabled}>
                        <select
                            value={current.month}
                            data-part-of={name}
                            name={`${name}Month`}
                            onChange={this.handleChange.bind(this, 'month')}
                        >
                            {months && months.map((item, i) => (
                                <option value={i++} key={i}>{item}</option>
                            ))}
                        </select>
                    </StyledFormSelectLight>
                </div>

                <div className="col-xs-3 item">
                    <StyledFormSelectLight disabled={disabled} data-full-value={fullValue}>
                        <select
                            value={current.year}
                            data-part-of={name}
                            name={`${name}Year`}
                            onChange={this.handleChange.bind(this, 'year')}
                        >
                            {years && years.map((item, i) => (
                                <option value={item} key={i}>{item}</option>
                            ))}
                        </select>
                    </StyledFormSelectLight>
                </div>
            </StyledDateSelectWrapper>
        );
    }
}

const StyledDateSelectWrapper = styled.div`
    margin-top: 20px;
    
    .item {
      padding-left: 5px;
      padding-right: 5px;
      &:first-child {
        padding-left: 15px;
      }
      &:last-child {
        padding-right: 15px;
      }
    }
`;

const StyledFormSelectLight = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  position: relative;
  min-height: 50px;
  line-height: 50px;
  @media (max-width: 767px) {
    min-height: 40px;
    line-height: 40px;
  }
  
  ${props => props.disabled && `
    background-color: #eee;
    cursor: not-allowed;
    opacity: 1;
    pointer-events: none;
  `}
  
  &:before {
    content: '';
    display: block;
    top: 18px;
    position: absolute;
    width: 10px;
    height: 16px;
    pointer-events: none;
    background-size: contain;
    background: url(./img/ico-dropdown.svg) no-repeat 50%;
    appearance: none;
    right: 10px;
    @media (max-width: 767px) {
      top: 14px;
    }
  }
  
  select {
    box-shadow: none;
    border-radius: 4px;
    font-size: 14px;
    line-height: 50px;
    height: 50px;
    padding: 0 18px;
    background: transparent;
    border: none;
    appearance: none;
    width: 100%;
    font-weight: 700;
    text-transform: capitalize;
    @media (max-width: 767px) {
      line-height: 40px;
      padding: 0 9px;
    }
  }
`;
