import { React, styled } from 'core-front/libs';
import { notify } from 'core-front/api';

import { NavLink } from 'react-router-dom';

import { PRIVATE_AREA_API } from 'api';

import { sendGetRequest } from 'helpers/request';

import PersonalInfoChangesNote from 'PrivateArea/shared/PersonalInfoChangesNote';

import SETTINGS_LIST_CONFIG, { PORTABILITY_CONFIG } from 'PrivateArea/Settings/config';

const { useState, useEffect } = React;

const Settings = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        sendGetRequest(PRIVATE_AREA_API.CURRENT_USER)
            .then(({ data }) => {
                setUser(data);
            })
            .catch(notify);
    }, []);

    const renderItem = item => (
        <li key={item.id}>
            <NavLink exact to={item.url || '/'}>
                {item.name}
            </NavLink>
        </li>
    );

    return (
        <StyledWrapper>
            <StyledSettings>
                {SETTINGS_LIST_CONFIG.map(item => renderItem(item))}

                {user.portabilityData && renderItem(PORTABILITY_CONFIG)}
            </StyledSettings>

            <PersonalInfoChangesNote />
        </StyledWrapper>
    );
};

export default Settings;

const StyledWrapper = styled.div`
    p {
        @media (max-width: 767px) {
            font-size: 16px;
        }
    }
`;

const StyledSettings = styled.ul`
    list-style: none;
    padding: 0;

    a {
        line-height: 1.7;
        border-radius: 4px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
        display: block;
        width: 100%;
        margin: 0 0 30px;
        text-decoration: none;
        color: rgba(76, 76, 76, .9);
        font-size: 24px;
        padding: 22px 55px 23px 20px;
        font-weight: 600;
        background: #fff url(../img/ico-edit-green.svg) no-repeat calc(100% - 29px) 50%;
        
        @media (max-width: 767px) {
            margin: 20px 0;
            font-size: 18px;
            background-position: calc(100% - 19px) 50%;
            padding: 17px 50px 17px 20px;
        }

        &.active,
        &.active:hover {
            color: #9edc15;
        }
    }
`;
