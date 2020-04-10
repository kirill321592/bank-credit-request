import { React, styled } from 'core-front/libs';

import { Grid } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PRIVATE_AREA_API } from 'api';

import { setUserUnauthorized } from 'actions/privateArea/user';

import { sendGetRequest } from 'helpers/request';

import { LOAN_DETAILS_PAGE } from 'PrivateArea/config';

import Menu from 'PrivateArea/shared/Menu';

import { ReactComponent as IconClose } from 'PrivateArea/shared/Header/assets/icon-close.svg';
import { ReactComponent as IconLogout } from 'PrivateArea/shared/Header/assets/icon-logout.svg';

const { useState } = React;

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState);
    };

    const handleLogOut = () => {
        sendGetRequest(PRIVATE_AREA_API.LOGOUT)
            .then(() => {
                dispatch(setUserUnauthorized());
                history.push('/');
            })
            .catch(() => {});
    };

    const renderMobileNavigation = () => (
        <>
            <StyledMobileMenu isOpened={isMobileMenuOpen}>
                <div className="icon-close">
                    <IconClose onClick={toggleMobileMenu} />
                </div>

                <Menu />

                <div className="logout" onClick={handleLogOut}>
                    <IconLogout />
                    Salir
                </div>
            </StyledMobileMenu>

            <StyledMobileMenuOverlay
                isOpened={isMobileMenuOpen}
                onClick={toggleMobileMenu}
            />
        </>
    );

    return (
        <StyledWrapper>
            <StyledHeader>
                <Grid>
                    <div className="navbar">
                        <Link className="navbar-header" to={LOAN_DETAILS_PAGE.url}>
                            <img src="./img/logo.svg" alt="moneyman logo" />
                        </Link>

                        <StyledMenu>
                            <Menu />
                        </StyledMenu>

                        <div className="button-logout" onClick={handleLogOut}>
                            Cerrar sesión
                        </div>

                        <StyledMobileMenuToggle onClick={toggleMobileMenu}>
                            <span />
                            <span />
                            <span />
                        </StyledMobileMenuToggle>
                    </div>
                </Grid>
            </StyledHeader>

            {renderMobileNavigation()}
        </StyledWrapper>
    );
};

export default Header;

const StyledWrapper = styled.div`
    @media (max-width: 991px) {
        min-height: 70px;
    }
`;

const StyledHeader = styled.div`
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .15);
    
    @media (max-width: 991px) {
        position: fixed;
        width: 100%;
        z-index: 1070;
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .1);
    }

    .navbar {
        margin: 22px 0 21px;
        text-align: center;
        
        @media (max-width: 991px) {
            margin-top: 7px;
            margin-bottom: 6px;
        }
    }
    
    .navbar-header {
        padding: 15px;
        line-height: 20px;
        height: 50px;
        
        @media (max-width: 991px) {
            float: left;
            padding-left: 0;
            padding-right: 0;
        }
    }
    
    .button-logout {
        border: 2px solid #aaa;
        border-radius: 4px;
        text-decoration: none;
        font-size: 14px;
        color: #5f5f5f;
        cursor: pointer;
        padding: 10px 12px 11px;
    
        @media (min-width: 992px) {
            float: right;
            margin-right: -15px;
        }
        
        @media (max-width: 991px) {
            display: none;
        }
    }
`;

const StyledMenu = styled.div`
    display: inline-block;

    @media (max-width: 991px) {
        display: none;
    }

    ul {
        display: flex;
        justify-content: center;
        margin: 0 0 5px;
    }

    li {
        margin: 0;
        padding: 0;
    }

    a {
        display: block;
        text-decoration: none;
        font-size: 1.2em;
        color: #737373;
        margin: 15px;
        line-height: 20px;

        &:hover {
            color: #737373;
        }
    }
`;

const StyledMobileMenuToggle = styled.div`
    position: relative;
    float: right;
    margin-right: 15px;
    padding: 9px 10px;
    margin-top: 8px;
    margin-bottom: 8px;
    
    @media (min-width: 992px) {
        display: none;
    }
    
    span {
        background: #9edc15;
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 1px;
        
        + span {
            margin-top: 4px;
        }
    }
`;

const StyledMobileMenu = styled.div`
    visibility: ${props => (props.isOpened ? 'visible' : 'hidden')};
    pointer-events: ${props => (props.isOpened ? 'all' : 'none')};
    background: #fff;
    width: 90%;
    padding: 30px;
    margin-top: 80px;
    z-index: 1050;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: ${props => (props.isOpened ? '1' : '0')};
    transition: visibility .15s, opacity .15s linear, transform .3s ease;
    transform: translateX(${props => (props.isOpened ? '0' : '100px')});

    ul {
        border-bottom: 1px solid #ddd;
    }

    li {
        padding: 20px;
        border-top: 1px solid #ddd;
        font-size: 1.2em;
    }
    
    a {
        text-decoration: none;
        color: #666;
        font-weight: 600;
    }
    
    .icon-close {
        padding-bottom: 40px;
        padding-right: 6px;
        text-align: right;
    }
    
    .logout {
        color: #c4c4c4;
        display: inline-block;
        font-size: 1.3em;
        font-weight: 600;
        padding: 50px 20px 20px 0;
        
        svg {
            margin-right: 5px;
        }
    }
`;

const StyledMobileMenuOverlay = styled.div`
    visibility: ${props => (props.isOpened ? 'visible' : 'hidden')};
    pointer-events: ${props => (props.isOpened ? 'all' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
    opacity: ${props => (props.isOpened ? '.5' : '0')};
    transition: visibility .15s, opacity .15s linear;
`;
