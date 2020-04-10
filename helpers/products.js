import { PRODUCTS_KEYS, PRODUCTS_INFO } from 'constants/products';

export const formatProductInfo = product => {
    if (!product.name) {
        return {};
    }

    const item = {
        ...product,
        ...PRODUCTS_INFO[product.name],
    };

    switch (product.name) {
    case [PRODUCTS_KEYS.inicio]:
        item.description = `¿Estás preparado? Acabas de empezar, el tipo de interés (medio) 
                    diario es del ${product.percentPerDay}% sobre el importe total de un préstamo a devolver en un 
                    plazo de ${product.maxDays} días.`;
        break;

    case [PRODUCTS_KEYS.despegue]:
        item.description = `¿El primer préstamo fue bien? En el nivel despegue puedes solicitar 
                    hasta ${product.maxAmount}€. Si solicitas un préstamo a ${product.maxDays} dias se aplicará un 
                    tipo de interés (medio) diario del ${product.percentPerDay}%`;
        break;

    case [PRODUCTS_KEYS.asccenso]:
        item.description = `Solicita hasta ${product.maxAmount} euros a devolver en ${product.maxDays} 
                    dias con un tipo de interés (medio) diario del ${product.percentPerDay}%`;
        break;

    case [PRODUCTS_KEYS.turbo]:
        item.description = `Atención, estamos acelerando! Más dinero, menos intereses y pagos 
                    mensuales a una tasa única de ${product.percentPerDay}%.`;
        break;

    case [PRODUCTS_KEYS.superTurbo]:
    default:
        item.description = `¿Quieres llegar a esta velocidad? Con la tarifa "SuperTurbo" puedes 
                    pedir hasta ${product.maxAmount} euros y devolver el préstamo cada mes. Hasta ${product.maxAmount}€ 
                    al ${product.percentPerDay}% diario.`;
        break;
    }
    item.prestamo = (product.name === 'Inicio' ? `${product.minAmount} a ` : 'hasta ') + product.maxAmount;
    item.plazo = product.period === 'DAYS' ? `${product.minDays} a ${product.maxDays} días` : `${product.minDays / 30} a ${product.maxDays / 30} meses`;

    return item;
};

export const formatProductsInfo = products => products.map(product => formatProductInfo(product));
