import { formatProductInfo, formatProductsInfo } from 'helpers/products';
import { onChangeRange, onBlurInput } from 'helpers/paySlider';
const initialState = {
    products: [],
    current: {},
    bonusInfo: {},
    payBonusSliderDept: 0,
    levelup: {},
    bonusInfoLoaded: false
};


export default (state = initialState, action) => {
    switch (action.type) {
    case 'PA_SET_PRODUCTS':
        return {
            ...state,
            products: formatProductsInfo(action.products),
            current: formatProductInfo(action.products.find(product => product.current)),
        };

    case 'PA_SET_BONUS_INFO':
        return {
            ...state,
            bonusInfo: action.bonusInfo,
            payBonusSliderDept: action.bonusInfo.payBonusDebtVal / action.bonusInfo.payBonusSlideStep,
            levelup: action.bonusInfo.newProducts[0] ? formatProductsInfo(action.bonusInfo.newProducts)[0] : null,
            bonusInfoLoaded: true
        };
    case 'ONCHANGE_RANGE':
        return onChangeRange(state,action);

    case 'ONCHANGE_INPUT':
        return {
            ...state,
            payBonusSliderDept: action.value
        };
    case 'ONBLUR_INPUT':
        return  onBlurInput(state,action);
    default:
        return state;
    }
};
