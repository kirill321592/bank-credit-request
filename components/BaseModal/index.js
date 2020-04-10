import { React } from 'core-front/libs';
import { Button, Modal } from 'react-bootstrap';

// BASE modal only for modals without custom close actions
export default class extends React.Component {
    state = {
        show: this.props.showed || false
    };

    handleShow = () => {
        this.props.actionModal && this.props.actionModal();
        this.setState({ show: true });
    };

    handleHide = () => {
        this.setState({ show: false });
    };

    render() {
        const { show } = this.state;
        const {
            children,
            disabled,
            styleBtn,
            footer,
            noLink,
            styles,
            title,
            width,
            link,
            size,
            className,
        } = this.props;

        return (
            <>
                {link
                    ? (
                        <Button
                            onClick={this.handleShow}
                            disabled={disabled}
                            style={styleBtn}
                            variant="link"
                        >
                            {link}
                        </Button>
                    )
                    : <span>{noLink}</span>
                }
                <Modal
                    className={className || ''}
                    style={{ maxWidth: width, ...styles }}
                    aria-labelledby="baseModal"
                    onHide={this.handleHide}
                    size={size || 'lg'}
                    show={show}
                >
                    <Modal.Header
                        toggle={this.toggle}
                        closeButton
                    >
                        <Modal.Title id="baseModal">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{children}</Modal.Body>
                    {footer && <Modal.Footer>{footer}</Modal.Footer>}
                </Modal>
            </>
        );
    }
}
