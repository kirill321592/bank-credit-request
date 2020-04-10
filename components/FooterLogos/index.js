import { React, styled } from 'core-front/libs';

import visa from './assets/visa.png';
import confianza from './assets/confianza-logo-bw.png';
import ekomi from './assets/ekomi-logo-bw.png';
import mastercard from './assets/mastercard.png';
import instantor from './assets/instantor-logo.png';

export default () => (
    <StyledFooterLogosList>
        <li>
            <img
                src={instantor}
                alt="Instantor"
            />
        </li>
        <li>
            <img
                src={ekomi}
                alt="Ekomi"
            />
        </li>        <li>
            <img
                src={confianza}
                alt="Confianza online"
            />
        </li>        <li>
            <img
                src={mastercard}
                alt="Master Card"
            />
        </li>        <li>
            <img
                src={visa}
                alt="Visa"
            />
        </li>
    </StyledFooterLogosList>
);

const StyledFooterLogosList = styled.ul`
    margin: 0;
    padding: 0;
    display: table;
    list-style: none;
    width: 100%;
    
    @media screen and (max-width: 768px) {
        display: block;
        overflow: hidden;
    }
    
    li {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        
                
        @media screen and (max-width: 768px) {
          display: block;
          width: 33.333333%;
          float: left;
          vertical-align: middle;
          margin-bottom: 15px;
          height: 48px;
          position: relative;
        }
        
        img {
              display: inline-block;
              max-width: 90%;

              @media screen and (max-width: 768px) {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                max-height: 90%;
            }
        }
            
            
    }
`;
