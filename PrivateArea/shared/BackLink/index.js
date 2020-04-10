import { React, styled } from 'core-front/libs';

import { Link } from 'react-router-dom';

const BackLink = ({ url, name }) => (
    <StyledBackLink>
        <Link to={url}>
            {name}
        </Link>
    </StyledBackLink>
);

export default BackLink;

const StyledBackLink = styled.h2`
    margin-bottom: 30px;
    
    @media (min-width: 576px) and (max-width: 767px) {
        font-size: 22px;
    }

    @media (max-width: 575px){
        font-size: 20px;
    }

    a {
        position: relative;
        padding-left: 30px;
        text-decoration: none;
        color: #333;
        font-weight: 700;
        
        &:hover {
            color: #ff9d00;
            
            &::before,
            &::after {
                background: #ff9d00;
            }
        }
        
        &::before,
        &::after {
            content: '';
            position: absolute;
            background: #9edc15;
            transform: rotate(-45deg);
        }
        
        &::before {
            width: 10px;
            top: 14px;
            left: 0;
            height: 3px;
        }
        
        &::after {
            width: 3px;
            height: 10px;
            top: 17px;
            left: 4px;
        }
    }
`;
