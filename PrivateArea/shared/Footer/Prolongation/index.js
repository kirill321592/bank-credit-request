import { React, styled } from 'core-front/libs';

import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { PROLONGATION_PAGE } from 'PrivateArea/config';

import { ReactComponent as IconClock } from 'PrivateArea/shared/Footer/Prolongation/assets/icon-clock.svg';

const Prolongation = () => (
    <StyledWrapper>
        <Grid>
            <Row>
                <Col xs={3} sm={2}>
                    <IconClock />
                </Col>

                <Col xs={9}>
                    <div className="title">
                        ¿Necesitas más tiempo para pagar tu préstamo?
                    </div>
                </Col>

                <Col xs={12} sm={9} smOffset={2}>
                    <div className="subtitle">
                        Puedes prorrogar la fecha vencimiento
                    </div>

                    <p>
                        Si tienes algún imprevisto y no puedes pagar tu préstamo en el día fijado, puedes pedir una
                        prórroga de hasta 30 días. La prórroga debe solicitarse siempre antes de la fecha del
                        vencimiento de tu préstamo.
                    </p>

                    <StyledLinkWrapper>
                        <Link to={PROLONGATION_PAGE.url}>
                            Quiero una prórroga
                        </Link>
                    </StyledLinkWrapper>
                </Col>
            </Row>
        </Grid>
    </StyledWrapper>
);

export default Prolongation;

const StyledWrapper = styled.div`
    background-image: url('./img/subfooter-bg.svg');
    background-size: cover;
    padding: 195px 0 105px;
    
    @media (max-width: 767px) {
        padding: 75px 0 60px;
        background-image: inherit;
        background-color: #fff;
    }

    svg {
        display: block;
        margin: 15px auto 0;
        max-width: 100%;
        
        @media (max-width: 767px) {
            margin: 0 auto;
        }
    }
    
    .title {
        color: #9edc15;
        line-height: 1.81;
        font-weight: 600;
        font-size: 32px;
        margin: 0 0 10px;
        
        @media (max-width: 767px) {
            font-size: 22px;
            line-height: 1.36;
        }
    }
    
    .subtitle {
        font-size: 20px;
        font-weight: 600;
        line-height: 1.5;
        color: #737373;
        margin: -55px 0 12px;
        
        @media (max-width: 1200px) {
            margin: -5px 0 12px;
        }
        
        @media (max-width: 767px) {
            display: none;
        }
    }
    
    p {
        font-size: 18px;
        font-weight: 500;
        color: #4c4c4c;
        line-height: 1.67;
        opacity: .8;
        margin-bottom: 30px;
        
        @media (max-width: 767px) {
            line-height: 1.5;
            font-size: 16px;
            margin: 20px 0;
        }
    }
`;

const StyledLinkWrapper = styled.div`
    @media (max-width: 767px) {
        text-align: center;
    }
    
    a {
        display: inline-block;
        font-size: 18px;
        color: #9edc15;
        text-decoration: none;
        line-height: 1.56;
        font-weight: 600;
        border-bottom: 1.5px solid #9edc15;
        
        &:hover {
            color: #9edc15;
        }
        
        @media (max-width: 767px) {
            font-size: 16px;
            line-height: 1.75;
        }
    }
`;
