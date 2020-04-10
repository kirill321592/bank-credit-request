import { api } from 'core-front';
import { API } from '../api';

const calculatorSettings = {
    productsByDuration: {},
    productsByAmount: {},
    initialProduct: {},
    config: {
        amount: {},
        duration: {}
    },
    messages: []
};
const CALC_STORAGE = 'MM_CALCULATOR';

const sortedProducts = plans => {
    return plans.sort((a, b) => {
        if (a.duration > b.duration) {
            return 1;
        }
        if (a.duration < b.duration) {
            return -1;
        }

        return 0;
    });
};

const prepareData = (defaultPlanId, plans, messages, initialValue) => {
    const amountGroup = {};
    const durationGroup = {};
    const products = sortedProducts(plans);

    calculatorSettings.messages = messages.map(({ code }) => {
        return code;
    });

    for (let len = products.length, i = 0; i < len; i++) {
        const item = products[i];
        const productsByAmount = amountGroup[item.amount];
        const productsByDuration = durationGroup[item.duration];

        item.info = [];
        item.messages.forEach(messageIndex => {
            if (messages[messageIndex]) {
                item.info.push(messages[messageIndex].code);
            }
        });

        if (item.id === defaultPlanId) {
            calculatorSettings.initialProduct = item;
        }

        // Fill products by Amount
        if (productsByAmount) {
            productsByAmount.maxDurationIndex++;
            item.durationIndex = productsByAmount.maxDurationIndex;

            productsByAmount.durations = {
                ...productsByAmount.durations,
                [item.duration]: item
            };
        } else {
            item.durationIndex = 0;
            amountGroup[item.amount] = {
                maxDurationIndex: 0,
                durations: {
                    [item.duration]: item
                }
            };
        }

        // Fill products by Duration
        if (productsByDuration) {
            productsByDuration.amounts = {
                ...productsByDuration.amounts,
                [item.amount]: item
            };
        } else {
            durationGroup[item.duration] = {
                amounts: {
                    [item.amount]: item
                }
            };
        }
    }

    if (initialValue && amountGroup[initialValue.amount] &&
        amountGroup[initialValue.amount].durations[initialValue.duration]) {
        calculatorSettings.initialProduct = amountGroup[initialValue.amount].durations[initialValue.duration];

        // Rewrite initial product with new ID
        window.localStorage.setItem(CALC_STORAGE, JSON.stringify(calculatorSettings.initialProduct));
    } else {
        window.localStorage.removeItem(CALC_STORAGE);
    }

    calculatorSettings.productsByAmount = amountGroup;
    calculatorSettings.productsByDuration = durationGroup;
};

const prepareAmountConfig = () => {
    const { productsByAmount, config: { amount }} = calculatorSettings;
    const allAmounts = Object.keys(productsByAmount);

    amount.max = parseInt(allAmounts[allAmounts.length - 1]);
    amount.min = parseInt(allAmounts[0]);
};

const prepareDurationConfig = currentProduct => {
    const { initialProduct, productsByAmount, config: { duration }} = calculatorSettings;
    const product = currentProduct || initialProduct;
    const allDurations = Object.keys(productsByAmount[product.amount].durations);

    duration.minIndex = 0;
    duration.maxIndex = productsByAmount[product.amount].maxDurationIndex;
    duration.max = parseInt(allDurations[allDurations.length - 1]);
    duration.min = parseInt(allDurations[0]);
};

export const getOffer = (dispatch, id) => {
    const productId = id || calculatorSettings.initialProduct.id;

    return fetch(API.OFFER, {
        ...api.headers.post,
        body: JSON.stringify({ product: productId })
    })
        .then(res => res.json())
        .then(response => {
            if (response) {
                dispatch({
                    type: 'CALCULATOR_OFFER_SUCCESS',
                    data: {
                        offer: response.data
                    }
                });
            }
        });
};

export const setSavedValues = (dispatch, newProduct) => {
    window.localStorage.setItem(CALC_STORAGE, JSON.stringify(newProduct));
    calculatorSettings.initialProduct = newProduct;

    dispatch({ type: 'CALCULATOR_SET_SAVED_VALUES', data: newProduct });
};

export const getCalculatorData = ({ dispatch, promoCode, initialValue, callOffer, insurance }) => {
    return fetch(API.FIND_PRODUCTS, {
        ...api.headers.post,
        body: JSON.stringify({ promoCode, insurance })
    })
        .then(res => res.json())
        .then(({ data={}, validation }) => {
            const { defaultPlanId, plans, messages } = data;

            if (plans) {
                prepareData(defaultPlanId, plans, messages, initialValue);
                prepareAmountConfig();
                prepareDurationConfig();

                if (callOffer) {
                    getOffer(dispatch);
                }

                dispatch({
                    type: 'CALCULATOR_FIND_PRODUCTS_SUCCESS',
                    data: calculatorSettings
                });
            } else if (validation) {
                return Promise.reject();
            }
        });
};

export const updateSettings = currentProduct => dispatch => {
    const { productsByAmount, config } = calculatorSettings;

    prepareDurationConfig(currentProduct);

    dispatch({
        type: 'CALCULATED', data: {
            config: {
                amount: config.amount,
                duration: {
                    ...config.duration,
                    maxIndex: productsByAmount[currentProduct.amount].maxDurationIndex
                }
            }
        }
    });
};

export const getProduct = (amount, duration, primaryField = 'AMOUNT') => {
    const { productsByAmount, productsByDuration } = calculatorSettings;
    let allDurations;
    let allAmounts;

    switch (primaryField) {
    case 'AMOUNT':
        if (productsByAmount[amount]) {
            allDurations = productsByAmount[amount].durations;
        } else {
            const amountsArray = Object.keys(productsByAmount);

            allDurations = productsByAmount[amountsArray[amountsArray.length - 1]].durations;
        }

        if (allDurations[duration] && allDurations[duration].hasOwnProperty('id')) {
            return allDurations[duration];
        } else {
            const availableDurations = Object.values(allDurations).filter(item => {
                return item.hasOwnProperty('id');
            });

            return availableDurations[availableDurations.length - 1];
        }
    case 'DURATION':
        if (productsByDuration[duration]) {
            allAmounts = productsByDuration[duration].amounts;
        } else {
            const durationsArray = Object.keys(productsByDuration);

            // Give the last of amount
            allAmounts = productsByDuration[durationsArray[durationsArray.length - 1]].amounts;
        }

        if (allAmounts[amount] && allAmounts[amount].hasOwnProperty('id')) {
            return allAmounts[amount];
        } else {
            const availableAmounts = Object.values(allAmounts).filter(item => {
                return item.hasOwnProperty('id');
            });

            return availableAmounts[availableAmounts.length - 1];
        }
    default:
        return calculatorSettings.initialProduct;
    }
};

export const getDurationByIndex = (currentPeriodIndex, currentAmount) => {
    const { productsByAmount } = calculatorSettings;

    if (productsByAmount && currentAmount) {
        return Object.keys(productsByAmount[currentAmount].durations)[currentPeriodIndex];
    }

    return null;
};

export const resetCalc = dispatch => {
    window.localStorage.removeItem(CALC_STORAGE);
    dispatch({ type: 'RESET_CALCULATOR' });
};

export const toggleCalculatorView = () => dispatch => {
    dispatch({ type: 'SET_CALCULATOR_VIEW_STATUS' });
};

export const getInsuranceByType = (list = [], type = 'BUNDLED') => {
    return list.reduce((base, next) => base && base.type === type ? base : next, {});
};
