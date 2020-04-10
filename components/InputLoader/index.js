import { React, styled } from 'core-front/libs';
import { loaderMove } from 'core-front/helpers/animations';

export default () => (
    <StyledInputLoader>
        <span />
        <span />
        <span />
        <span />
    </StyledInputLoader>
);

const StyledInputLoader = styled.div`
    margin: 0 auto;
    position: absolute;
    bottom: 4px;
    right: 35px;

    span {
        display: block;
        width: 15px;
        height: 4px;
        border-radius: 2px;
        background: #9edc15;
        margin: 5px auto;
        animation: ${loaderMove(10).odd} 1s infinite ease;
        &:nth-child(even) {
            background: #707070;
            width: 15px;
            animation: ${loaderMove(10).even} 1s infinite ease;
        }
    }

`;
