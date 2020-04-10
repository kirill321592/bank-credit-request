export const onChangeRange = (state, { value }) => {
    const bonusInfo = { ...state.bonusInfo };

    bonusInfo.payBonusDebtVal = value;
    return {
        ...state,
        bonusInfo,
        payBonusSliderDept: value / bonusInfo.payBonusSlideStep
    };
};

export const onBlurInput = (state, { value }) => {
    const bonusInfo = { ...state.bonusInfo };
    const { payBonusSlideMax, payBonusSlideMin, payBonusSlideStep } = bonusInfo;
    let payBonusSliderDept;
    const max = payBonusSlideMax / payBonusSlideStep;
    const min = payBonusSlideMin / payBonusSlideStep;

    switch (true) {
    case !value || value < min:
        payBonusSliderDept = min;
        bonusInfo.payBonusDebtVal = payBonusSlideMin;
        break;
    case value > max:
        payBonusSliderDept = max;
        bonusInfo.payBonusDebtVal = payBonusSlideMax;
        break;
    default:
        payBonusSliderDept = value;
        bonusInfo.payBonusDebtVal = value * payBonusSlideStep;
        break;
    }

    return {
        ...state,
        bonusInfo,
        payBonusSliderDept
    };
};