import { React, styled } from 'core-front/libs';

import { Row, Col } from 'react-bootstrap';

const AuthorizationPageLayout = ({ title, children, isLogotypeVisible = true }) => (
    <StyledLoginWrapper>
        <section>
            <Row>
                <Col xs={12}>
                    {isLogotypeVisible && (
                        <StyledLogo href="/">
                            <img src="./img/logo.svg" alt="moneyman logo" />
                        </StyledLogo>
                    )}

                    {title && (
                        <h2>{title}</h2>
                    )}
                </Col>

                <StyledForm>
                    {children}
                </StyledForm>
            </Row>
        </section>
    </StyledLoginWrapper>
);

export default AuthorizationPageLayout;

const StyledLoginWrapper = styled.div`
    text-align: center;
    padding: 0;
    position: relative;
    z-index: 10;

    section {
        display: block;
        border-radius: 3.6px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
        margin: 0 auto;
        max-width: 560px;
        padding: 60px 60px 35px;
        text-align: left;

        @media (max-width: 767px) {
            padding: 30px 18px 35px;
        }
    }
    
    h2 {
        @media (max-width: 767px) {
            font-size: 22px;
        }
        
        @media (max-width: 575px) {
            font-size: 20px;
        }
    }
`;

const StyledForm = styled.div`
    .btn-submit {
        margin: 40px 0 25px;
        
        @media (max-width: 767px) {
            margin-top: 26px;
            padding: 16px;
        }
    }
`;

const StyledLogo = styled.a`
    display: inline-block;
    margin: 0 0 30px;
    
    @media (max-width: 767px) {
        margin-bottom: 15px;
    }

    img {
        width: 185px;
    }
`;
