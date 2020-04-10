import { React } from 'core-front/libs';
import Slider from 'rc-slider/lib/';
import Tooltip from 'rc-tooltip/lib/';
import 'rc-slider/assets/index.css';
import './index.css';

const { Handle } = Slider;

export default class MMSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipShow: false
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { closed, infoTooltip } = this.props;

        if (!closed && infoTooltip && infoTooltip.length) {
            this.setTooltipVisibility();
        }
    }

    componentDidUpdate(prevProps) {
        const { closed, value } = this.props;

        if (prevProps.closed !== closed || value !== prevProps.value) {
            this.setTooltipVisibility();
        }
    }

    setTooltipVisibility() {
        const { infoTooltip } = this.props;

        if (infoTooltip && infoTooltip.length) {
            this.setState({ tooltipShow: true });
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            this.hideTooltip();
        }
    }

    hideTooltip() {
        this.setState({ tooltipShow: false });
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleClick(e) {
        e.preventDefault();
        this.hideTooltip();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    getSliderRef = node => { this.sliderRef = node; };

    handleOutsideClick(event) {
        const { closed } = this.props;
        const { tooltipShow } = this.state;

        if (this.sliderRef && this.sliderRef.contains(event.target)) {
            return;
        }

        if (!closed && tooltipShow) {
            this.hideTooltip();
        }
    }


    handle(sliderProperty) {
        const { value, dragging, index, ...restProps } = sliderProperty;
        const { infoTooltip } = this.props;
        const { tooltipShow } =  this.state;

        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                getTooltipContainer={() => this.sliderRef}
                overlay={<span dangerouslySetInnerHTML={{ __html: infoTooltip }} />}
                visible={tooltipShow}
                placement="top"
                key={index}
                onClick={this.handleClick}
            >
                <Handle
                    value={value} {...restProps}
                />
            </Tooltip>
        );
    }

    render() {
        const { handleChange, ...rest } = this.props;

        return (
            <div className="slider-wrapper" ref={this.getSliderRef}>
                <Slider onChange={handleChange} handle={this.handle.bind(this)} {...rest} />
            </div>
        );
    }
}
