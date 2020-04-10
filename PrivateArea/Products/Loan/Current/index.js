import { React, styled } from 'core-front/libs';
import { cookies } from 'core-front';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OverlayTrigger } from 'react-bootstrap';

import useEventListener from 'hooks/eventListener';

import { LOAN_BONUS } from 'PrivateArea/config';

import { StyledProducts, StyledTooltip } from 'PrivateArea/Products/Loan/styles';

const { useState } = React;

const tutorialCookie = 'shownTutorialBonus';
const tutorialCookieLifetime = 1000;

const LoanCurrentProduct = () => {
    const history = useHistory();

    const { current, bonusInfo, bonusInfoLoaded } = useSelector(state => (state.privateAreaProducts));

    const [isCurrentProductOpened, setIsCurrentProductOpened] = useState(false);

    const shouldTooltipBeVisible = (window.matchMedia('(max-width: 991px)').matches);

    useEventListener('click', () => {
        if (!current.name || !shouldTooltipBeVisible) {
            return;
        }

        if (!cookies.getCookie(tutorialCookie)) {
            cookies.setCookie(tutorialCookie, true, tutorialCookieLifetime);
        }
    });

    const toggleVisibility = () => {
        setIsCurrentProductOpened(prevState => !prevState);
    };

    const renderTooltip = id => (
        <StyledTooltip id={id} className="current-product-tooltip">
            <div>
                ¡Consulta el nivel y tus puntos acumulados! Descubre sus beneficios y cómo conseguir
                más puntos en Mis puntos
                <span className="link" onClick={() => history.push(LOAN_BONUS.url)}>
                    Usar mis puntos
                </span>
            </div>
        </StyledTooltip>
    );

    const renderTooltipOverlay = (id, content) => (
        <OverlayTrigger
            placement="bottom"
            trigger={['focus']}
            overlay={renderTooltip(id)}
            rootClose
            defaultOverlayShown={shouldTooltipBeVisible}
        >
            {content}
        </OverlayTrigger>
    );

    const renderProductContent = (product, description) => (
        <li
            className={`${product.current ? 'product-opened' : ''} ${product.available ? '' : 'product-closed'}`}
            onClick={(product.current ? toggleVisibility : null)}
        >
            <div className="product-img">
                <img src={`./img/${product.imageName}`} width="42px" height="42px" alt="product" />
            </div>

            <div className="product-text">
                {product.name}<span>{description}</span>
            </div>
        </li>
    );

    const renderCurrentProduct = () => {
        if (!current.name) {
            return;
        }

        const id = `${current.name}-current-product`;

        const description = (
            <>
                : tienes
                <span className="link" onClick={() => history.push(LOAN_BONUS.url)}>
                    {bonusInfoLoaded && (`${bonusInfo.totalBonuses} puntos`)}
                </span>
            </>
        );

        const productContent = renderProductContent(current, description);

        let content = productContent;

        if (!cookies.getCookie(tutorialCookie)) {
            content = renderTooltipOverlay(id, productContent);
        }

        return (
            <StyledProducts>
                <ul className={`current-product ${isCurrentProductOpened ? 'is-opened' : ''}`}>
                    {content}
                </ul>
            </StyledProducts>
        );
    };

    return (
        <StyledWrapper className="hidden-md hidden-lg">
            {renderCurrentProduct()}
        </StyledWrapper>
    );
};

export default LoanCurrentProduct;

const StyledWrapper = styled.div`
    position: relative;
    
    .current-product {
        z-index: 100;
    }
`;
