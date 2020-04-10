import { React, styled } from 'core-front/libs';
import FooterLogos from '../FooterLogos';

import google from './assets/google.svg';
import facebook from './assets/facebook.svg';
import twitter from './assets/twitter.svg';
import arrowUp from './assets/arrow-up.svg';

const ScrollTop = e => {
    e.preventDefault();
    document.querySelector('#root').scrollIntoView({ behavior: 'smooth' });
};

const renderSocialNetworks = () => (
    <StyledSocialNetworks>
        <ul>
            <li>
                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://plus.google.com/+MoneymanEs-prestamos-rapidos"
                >
                    <img src={google} alt="google" />
                </a>
            </li>
            <li>
                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.facebook.com/pages/MoneyMan-Espa%C3%B1a/1672789422955524"
                >
                    <img src={facebook} alt="facebook" />
                </a>
            </li>
            <li>
                <a
                    target="_blank" href="https://twitter.com/MoneyMan_Espana"
                    rel="noopener noreferrer"
                >
                    <img src={twitter} alt="twitter" />
                </a>
            </li>
        </ul>
    </StyledSocialNetworks>
);

export default ({ withWave, showLogos }) => (
    <footer>
        {(showLogos || withWave) && (
            <StyledFooterLogos withWave={withWave}>
                <div className="container">
                    <FooterLogos />
                </div>
            </StyledFooterLogos>
        )}

        <StyledContactsBlock>
            <div className="container">
                <div className="row">

                    <div className="col-sm-6 col-md-4">
                        <h4>¿Necesitas ayuda?</h4>
                        <p>
                            Llámanos o escríbenos para que podamos resolver tus dudas.
                        </p>
                        <p>Nuestro horario de atención al cliente es:<br />
                            <strong>Lunes a Domingo de 9:00 a 00:00 horas</strong>
                        </p>
                    </div>

                    <div className="col-md-3">
                        <StyledContactList>
                            <li><span className="ico-phone"><a href="tel:937227354">93 722 73 54</a></span></li>
                            <li>
                                <span className="ico-mail">
                                    <a href="mailto:clientes@moneyman.es">clientes@moneyman.es</a>
                                </span>
                            </li>
                        </StyledContactList>
                    </div>

                    <StyledWrapper className="col-xs-12 col-md-4">
                        <p>
                            Nuestras oficinas se encuentran en: <br />
                            08006 Barcelona
                        </p>
                        <div className="hidden-xs">
                            {renderSocialNetworks()}
                        </div>
                    </StyledWrapper>
                </div>
            </div>
        </StyledContactsBlock>

        <Copyright>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-xs-6">
                        © {(new Date()).getFullYear()} Moneyman España
                    </div>
                    <div className="col-md-5 col-xs-6 text-right">
                        <span className="scroll-to-top scroll-up" onClick={ScrollTop}>
                            Volver arriba <img className="ico" src={arrowUp} alt="" />
                        </span>
                    </div>
                </div>

                <div className="visible-xs">
                    {renderSocialNetworks()}
                </div>
            </div>
        </Copyright>
    </footer>
);

const StyledFooterLogos = styled.div`
    background-color: ${props => props.withWave ? '#9edc15' : 'transparent'};
    padding: 50px 0;
`;

const StyledWrapper = styled.div`
    padding: 0;
    margin: 45px 0 0;
`;

const StyledSocialNetworks = styled.div` 
    ul {
      display: block;
      margin: 30px 0 0;
      padding: 0;
      list-style: none;

      @media screen and (max-width: 768px) {
          margin: 25px 0 0;
          text-align: center;
      }

      li {
        display: inline-block;
        margin-right: 20px;
        
        @media screen and (max-width: 768px) {
          margin: 0 12px;
        }
      }
    }
`;

const StyledContactsBlock = styled.div`
    padding: 60px 0 55px;
    background-color: #9edc15;
    color: #fff;
    
    @media (max-width: 767px) {
        padding: 25px 0 25px;
    }
    
    h4 {
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 25px;
        line-height: 0.86;
    }
    
    a {
        font-size: 15px;       
        color: #fff;
    }
`;

const StyledContactList = styled.ul`
    padding: 0;
    margin: 45px 0 10px;
    li {
        list-style-type: none;
        margin: 15px 0;
        
        span {
            padding-left: 35px;
            display: block;
            background-repeat: no-repeat;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.65;
            
            a {
                color: #fff;
                text-decoration: none;
            }
            
            &.ico-mail {
                background-image: url(./img/ico-mail-white.svg);
                background-position: 0 50%;
                background-size: auto 75%;
                display: inline-block;
            }
            
            &.ico-phone {
                display: inline-block;
                background: url(./img/ico-phone-white.svg) no-repeat 5px 50%;
                background-size: auto 100%;
                margin-right: 25px;
            }            
            &.ico-whatsapp {
                background: url(./img/ico-whatsapp-white.svg) no-repeat 5px 50%;
                background-size: auto 100%;
            }
        }
    }
`;

const Copyright = styled.div`
    border-top: 1px solid #fff;
    background-color: #9edc15;
    padding: 30px 0 25px;
    font-size: 16px;
    font-weight: 500;
    line-height: 25px;
    color: #fff;
    
    .scroll-to-top {
      cursor: pointer;
    }

    a {
        color: #fff;
        text-decoration: none;
        &:hover, &:focus {
          color: #fff;
        }
    }

    .ico {
        display: inline-block;
        transform: rotate(-90deg);
        margin: 0 0 0 10px;
    }
`;
