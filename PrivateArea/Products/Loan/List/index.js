import { React, styled } from 'core-front/libs';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger } from 'react-bootstrap';

import { setProducts, setBonusInfo } from 'actions/privateArea/products';

import { formatProductsInfo } from 'helpers/products';

import { LOAN_BONUS } from 'PrivateArea/config';

import { StyledProducts, StyledTooltip } from 'PrivateArea/Products/Loan/styles';

const { useState, useEffect } = React;

const daysInMonth = 30;

const LoanProductsList = () => {
    const dispatch = useDispatch();

    const { current, bonusInfo, products, bonusInfoLoaded } = useSelector(state => (state.privateAreaProducts));

    const [productsInfo, setProductsInfo] = useState([]);
    const [isListOpened, setIsListOpened] = useState(false);

    useEffect(() => {
        if (!products.length) {
            dispatch(setProducts());
        }

        dispatch(setBonusInfo());
    }, [dispatch, products.length]);

    useEffect(() => {
        const sortedProducts = formatProductsInfo(products.reverse());

        setProductsInfo(sortedProducts);
    }, [products]);

    const toggleListVisibility = () => {
        setIsListOpened(prevState => !prevState);
    };

    const getDescription = product => {
        if (product.current) {
            return bonusInfoLoaded && `: tienes ${bonusInfo.totalBonuses} puntos`;
        }

        let period = 'meses';
        let periodMin = (product.minDays / daysInMonth);
        let periodMax = (product.maxDays / daysInMonth);

        if (product.periodType === 'DAYS') {
            period = 'días';
            periodMin = product.minDays;
            periodMax = product.maxDays;
        }

        return `(de ${product.minAmount} a ${product.maxAmount}€ en ${periodMin} - ${periodMax} ${period})`;
    };

    const renderTooltip = (id, product) => (
        <StyledTooltip id={id}>
            <div>
                ¡Haz uso de tus puntos para subir de {current.name} a {product.name}!
            </div>

            <div className="link" onClick={() => window.open(`#${LOAN_BONUS.url}`, '_blank')}>
                Usar mis puntos
            </div>
        </StyledTooltip>
    );

    const renderTooltipOverlay = (id, product, content) => (
        <OverlayTrigger
            key={id}
            placement="bottom"
            trigger={['focus', 'click']}
            overlay={renderTooltip(id, product)}
            rootClose
        >
            {content}
        </OverlayTrigger>
    );

    const renderProductContent = (id, product, description) => (
        <li
            key={id}
            className={`${product.current ? 'product-opened' : ''} ${product.available ? '' : 'product-closed'}`}
            onClick={(product.current ? toggleListVisibility : null)}
        >
            <div className="product-img">
                <img src={`./img/${product.imageName}`} width="42px" height="42px" alt="product" />
            </div>

            <div className="product-text">
                {product.name}<span>{description}</span>
            </div>
        </li>
    );

    const renderProduct = product => {
        const description = getDescription(product);
        const id = `${product.name}-product`;

        const content = renderProductContent(id, product, description);

        if (product.available) {
            return content;
        }

        return renderTooltipOverlay(id, product, content);
    };

    return (
        <div className="hidden-sm">
            <StyledDescription className="hidden-xs hidden-sm">
                ¡Consulta el nivel y tus puntos acumulados! Descubre
                sus beneficios y cómo conseguir más puntos en <Link to={LOAN_BONUS.url}>Mis puntos</Link>
            </StyledDescription>

            {!!productsInfo.length && (
                <StyledProducts>
                    <ul className={isListOpened ? 'is-opened' : ''}>
                        {productsInfo.map(product => renderProduct(product))}
                    </ul>
                </StyledProducts>
            )}
        </div>
    );
};

export default LoanProductsList;

const StyledDescription = styled.p`
    line-height: 1.5em;
    color: rgba(76, 76, 76, .9);

    a {
        color: rgba(76, 76, 76, .9);
        border-color: rgba(76, 76, 76, .9);
        font-weight: 700;
        
        &:hover {
            color: rgba(76, 76, 76, .9);
        }
    }
`;
