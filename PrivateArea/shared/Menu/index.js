import { React, styled } from 'core-front/libs';

import { NavLink } from 'react-router-dom';

import MENU_CONFIG from 'PrivateArea/shared/Menu/config';

const Menu = () => (
    <StyledWrapper>
        {MENU_CONFIG.map(item => (
            <li key={item.id} className={item.isHiddenOnDesktop ? 'lg-hidden' : ''}>
                <NavLink exact to={item.url || '/'}>
                    {item.name}
                </NavLink>
            </li>
        ))}
    </StyledWrapper>
);

export default Menu;

const StyledWrapper = styled.ul`
    list-style: none;
    padding: 0;

    .lg-hidden {
        @media (min-width: 992px) {
            display: none;
        }
    }
    
    a {
        line-height: 1.7;

        &.active,
        &.active:hover {
            color: #9edc15;
        }
    }
`;
