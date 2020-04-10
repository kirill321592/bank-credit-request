import { React, styled } from 'core-front/libs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';

import { initDictionary } from '../../actions/privateArea/dictionary';
import { sendMessage } from '../../actions/privateArea/contactUs';
import { validate } from '../../helpers/schemeValidator';
import { renderField } from '../../helpers/render';

const FORM_NAME = 'contactUsForm';
const selector = formValueSelector(FORM_NAME);

class ContactUs extends React.Component {
    state = { open: false };

    toggle() {
        this.setState({ open: !this.state.open });
    }

    componentDidMount() {
        if (!this.props.registration) this.props.initDictionary();
    }

    onFileSelect(data, info) {
        const { dispatch, form } = this.props;

        dispatch(change(form, 'attachedFile', data));
        dispatch(change(form, 'fileName', info.name));
    }

    render() {
        const {
            dictionary,
            handleSubmit,
            submitting,
            fileName,
            widget,
        } = this.props;

        const {
            open,
        } = this.state;

        return (
            <ContactUsWrap>
                <Title>¿Necesitas ayuda?</Title>
                <p>Puedes contactar con nosotros de Lunes a Viernes de 9:00 a 20:00</p>
                <ContactList>
                    <li>
                        <span className="mail">
                            {widget
                                ? <a href onClick={this.toggle.bind(this)}>Envie-nos uma mensagem</a>
                                : <a href="mailto:clientes@moneyman.es">clientes@moneyman.es</a>
                            }
                        </span>
                    </li>
                    <li>
                        <span className="phone">
                            <a href="tel:937227354">93 722 73 54</a>
                        </span>
                    </li>
                </ContactList>

                {
                    open &&
                    (<StyledSendMessageBlock>
                        <p>
                            Envie-nos uma mensagem para que possamos resolver todas as suas dúvidas
                        </p>

                        <Row>
                            <form
                                onSubmit={handleSubmit(values => {
                                    delete values.fake;

                                    return sendMessage(values);
                                })} noValidate
                            >
                                <Field
                                    fieldType="select"
                                    name="typeMessage"
                                    placeholder="Seleccionar..."
                                    component={renderField}
                                    options={dictionary && dictionary.list.CONTACT_WITH_US}
                                />

                                <Field
                                    fieldType="textarea"
                                    name="textMessage"
                                    component={renderField}
                                />

                                <StyledUploadBlock className="col-xs-12">
                                    <Field
                                        fieldType="file"
                                        label="Anexar documentos"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        name="fake"
                                        component={renderField}
                                        onFileSelect={this.onFileSelect.bind(this)}
                                    />

                                    {fileName}
                                </StyledUploadBlock>

                                <Col xs={12}>
                                    <Button
                                        type="submit"
                                        bsStyle="info"
                                        block
                                        disabled={submitting}
                                    >
                                        ENVIAR
                                    </Button>
                                </Col>
                            </form>
                        </Row>
                     </StyledSendMessageBlock>)
                }

            </ContactUsWrap>
        );
    }
}

export default compose(
    connect(state => {
        const { user: { widgets: { CONTACT_WITH_US_WIDGET }}, dictionary } = state;

        return CONTACT_WITH_US_WIDGET ? {
            fileName: selector(state, 'fileName'),
            jsonSchema: CONTACT_WITH_US_WIDGET.response.jsonSchema,
            initialValues: CONTACT_WITH_US_WIDGET.response.fields,
            widget: CONTACT_WITH_US_WIDGET,
            dictionary,
        } : {
            dictionary
        };
    }, { initDictionary }),
    reduxForm({
        form: FORM_NAME,
        validate,
    }),
)(ContactUs);

const ContactUsWrap = styled.div`
    padding: 30px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-radius: 4px;
    color: #737373;

    p {
        font-size: 14px;
        line-height: 1.6;
        font-weight: normal;
    }
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
`;

const ContactList = styled.ul`
    padding: 0;
    margin: 0;
    li {
        list-style-type: none;
        font-weight: 700;
        font-size: 1.15em;
        margin: 15px 0;

        a {
            font-weight: 500;
            color: #4c4c4c;
            text-decoration: none;
            transition: color .3s ease;

            &:hover {
              color: #9edc15;
            }
        }

        span {
            padding-left: 35px;
            background-repeat: no-repeat;

            &.mail {
                background-image: url(./img/ico-mail.svg);
                background-position: 0 50%;
                background-size: auto 75%;
            }
            &.phone {
                background-image: url(./img/ico-phone.svg);
                background-position: 5px 50%;
                background-size: auto 100%;
            }
             &.mobile {
                background-image: url(./img/ico-mobile.svg);
                background-position: 5px 50%;
                background-size: auto 100%;
            }
        }
    }
`;

const StyledSendMessageBlock = styled.div`

    label {
        margin: 0;
    }

    select {
        padding: 14px;
    }

    button {
        margin-top: 20px;
    }
`;

const StyledUploadBlock = styled.div`
    label {
        margin-top: 20px;
        color: #9edc15;
        text-decoration: underline;
        font-size: 14px;
        &:hover {
            color: #ff9d00;
        }
    }
`;
