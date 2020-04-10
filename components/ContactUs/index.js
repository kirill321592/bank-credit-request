import { React, styled } from 'core-front/libs';

export default () => (
    <ContactUsWrap>
        <Title>¿Necesitas ayuda?</Title>
        <p>Puedes contactar con nosotros de Lunes a Domingo de 9:00 a 00:00 horas</p>
        <ContactList>
            <li>
                <span className="mail">
                    <a href="mailto:clientes@moneyman.es">clientes@moneyman.es</a>
                </span>
            </li>
            <li>
                <span className="phone">
                    <a href="tel:937227354">93 722 73 54</a>
                </span>
            </li>
        </ContactList>
    </ContactUsWrap>
);

const ContactUsWrap = styled.div`
    padding: 30px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-radius: 4px;
    
    p {
        font-size: 17px;
        font-weight: 500;
    }
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
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