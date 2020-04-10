import { React, styled } from 'core-front/libs';
import { loaderMove } from 'core-front/helpers/animations';

export default () => (
    <StyledLoader>
        <span />
        <span />
        <span />
        <span />
    </StyledLoader>
);

const StyledLoader = styled.div`
    margin: 0 auto;
    display: table;
    padding: 80px 0;

    span {
        display: block;
        width: 70px;
        height: 10px;
        border-radius: 5px;
        background: #9edc15;
        margin: 13px auto;
        animation: ${loaderMove(30).odd} 1s infinite ease;
        &:nth-child(even) {
            background: #707070;
            width: 80px;
            animation: ${loaderMove(30).even} 1s infinite ease;
        }
    }
`;
