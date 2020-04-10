import { React, styled } from 'core-front/libs';

import { Col } from 'react-bootstrap';

import FeedbackForm from 'PrivateArea/shared/FeedbackForm';
import PrivacyPolicy from 'PrivateArea/shared/PrivacyPolicy';

import { ReactComponent as IconPhone } from 'PrivateArea/Contacts/assets/icon-phone.svg';

const Contacts = () => (
    <Col md={6}>
        <StyledWrapper>
            <h3>¿Necesitas ayuda?</h3>

            <FeedbackForm />

            <p>Puedes contactar con nosotros de Lunes a Viernes de 9:00 a 20:00</p>

            <ul>
                <li className="phone">
                    <IconPhone />
                    <a href="tel:937227354">
                        93 722 73 54
                    </a>
                </li>
            </ul>
        </StyledWrapper>

        <PrivacyPolicy />
    </Col>
);

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
`;
