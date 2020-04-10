const DAYS_IN_MONTH = 30;

export const prepareDate = data => {
    data.periodText = 'dias';

    if (data.productPeriod === 'MONTH') {
        data.days = Math.round(data.days / DAYS_IN_MONTH);
        data.periodText = data.days > 1 ? 'meses' : 'mes';
    }
    return data;
};