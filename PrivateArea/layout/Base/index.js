import { React, styled } from 'core-front/libs';
import { Grid, Row } from 'react-bootstrap';

import Header from 'PrivateArea/shared/Header';
import Footer from 'PrivateArea/shared/Footer';
import Modals from 'PrivateArea/shared/Modals';
const contentMaxWidth = '1010px';

const BaseLayout = ({ children, options = {}, beforeContent, title }) => {
    let content;

    const pageContent = (
        <>
            {title && (
                <section className="col-md-12">
                    <h1>{title}</h1>
                </section>
            )}
            {children}
        </>
    );

    if (!options.withWave) {
        content = (
            <Grid style={{ maxWidth: contentMaxWidth }}>
                <StyledWrapperRow>
                    {pageContent}
                </StyledWrapperRow>
            </Grid>
        );
    } else {
        content = (
            <StyledWaveWrapper>
                <Grid style={{ maxWidth: contentMaxWidth }}>
                    {pageContent}
                </Grid>
            </StyledWaveWrapper>
        );
    }

    return (
        <StyledWrapper>
            {options.showHeader && (<Header />)}
            {beforeContent}
            <Modals />
            {content}
            <Footer {...options} />
        </StyledWrapper>
    );
};

export default BaseLayout;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    
    .container {
        @media (max-width: 767px) {
            width: 100%;
        }
    }

    h1 {
        font-family: 'Nunito', sans-serif;
        font-weight: 500;
        font-size: 3.5em;
        
        @media (max-width: 767px) {
            font-size: 32px;
            font-weight: 300;
        }
    }

    button, input, optgroup, select, textarea {
        font-family: inherit;
    }

    footer {
        margin-top: auto;
    }

    .form-control {
        letter-spacing: .7px;
        
        @media (max-width: 767px) {
            padding: 15px 9px;
        }
    }

    .btn-lg {
        padding: 22px;
    }

    form > label:first-child {
        margin-top: 0;
    }
`;

const StyledWrapperRow = styled(Row)`
    padding-top: 32px;
    padding-bottom: 100px;

    @media (max-width: 991px) {
        padding: 30px 0;
    }
`;

const StyledWaveWrapper = styled.div`
    flex-grow: 1;
    position: relative;
    padding-bottom: 80px;
    padding-top: 100px;
    z-index: 10;

    @media (max-width: 767px) {
        padding-top: 80px;
        padding-bottom: 40px;
    }

    &:after {
        content: '';
        background: url(./img/wave-login.svg) no-repeat;
        background-size: cover;
        display: block;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 60%;
        z-index: 2;
    }    
`;
