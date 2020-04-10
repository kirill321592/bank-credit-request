import { React, styled } from 'core-front/libs';
import { useSelector } from 'react-redux';

import { ReactComponent as IconPhone } from 'PrivateArea/shared/Contacts/assets/icon-phone.svg';
import { ReactComponent as IconMail } from 'PrivateArea/shared/Contacts/assets/icon-mail.svg';

import { USER_CREDIT_STATUSES } from 'constants/users';

import FeedbackForm from 'PrivateArea/shared/FeedbackForm';

const { useState } = React;

const contactsConfig = {
    [USER_CREDIT_STATUSES.loading]: {},
    [USER_CREDIT_STATUSES.expired]: {
        text: 'Puedes contactar con nosotros de Lunes a Viernes de 9:00 a 21:00 horas y Sábados de 10:00 a 18:00 horas',
        phone: '93 548 05 37',
        phoneLink: '935480537',
    },
    default: {
        text: 'Puedes contactar con nosotros de Lunes a Domingo de 9:00 a 00:00 horas',
        phone: '93 722 73 54',
        phoneLink: '937227354',
    },
};

const Contacts = () => {
    const { creditStatus } = useSelector(state => state.privateAreaUser);

    const [isFormHidden, setIsFormHidden] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormHidden(prevState => !prevState);
    };

    const contacts = (contactsConfig[creditStatus] || contactsConfig.default);

    return (
        <StyledWrapper>
            <h3>¿Necesitas ayuda?</h3>

            {contacts.text && (
                <p>{contacts.text}</p>
            )}

            <ul>
                {contacts.phone && (
                    <li className="phone">
                        <IconPhone />
                        <a href={`tel:${contacts.phoneLink}`}>
                            {contacts.phone}
                        </a>
                    </li>
                )}

                <li onClick={toggleFormVisibility} className="mail">
                    <IconMail />
                    <span>Envíanos un mensaje</span>
                </li>
            </ul>

            <FeedbackForm isHidden={isFormHidden} />
        </StyledWrapper>
    );
};

export default Contacts;

const StyledWrapper = styled.div`
    padding: 15px 30px 25px;
    margin-bottom: 40px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
    box-sizing: border-box;
    border-radius: 4px;
    
    h3 {
        margin-bottom: 10px;
        font-size: 1.3em;
        font-weight: 700;
    }

    p {
        font-size: 17px;
        font-weight: 500;
    }

    ul {
        padding: 0;
    }

    li {
        align-items: center;
        display: flex;
        list-style-type: none;
        font-weight: 700;
        font-size: 1.15em;
        margin: 15px 0;
    }
    
    .phone {
        margin-bottom: 21px;
        margin-top: 19px;
        padding-left: 5px;

        svg {
            margin-right: 14px;
        }
        
        a {
            color: #333;
            text-decoration: none;
            font-weight: 700;
        }
    }
    
    .mail {
        &:hover {
            span {
              text-decoration: none;
            }
        }

        svg {
            margin-right: 12px;
        }

        span {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;
