import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dictionary from './dictionary';
import decision from './decision';
import signUp from './signUp';
import flow from './flow';
import step from './step';
import calc from './calc';
import user from './user';
import header from './header';
import debitCard from './debitCard';
import privateAreaPages from 'reducers/privateArea/pages';
import privateAreaUser from 'reducers/privateArea/user';
import privateAreaAuthorization from 'reducers/privateArea/authorization';
import privateAreaHistory from 'reducers/privateArea/history';
import privateAreaProducts from 'reducers/privateArea/products';
import privateAreaBonus from 'reducers/privateArea/bonus';
import privateAreaProlongation from 'reducers/privateArea/prolongation';
import privateAreaFAQ from 'reducers/privateArea/faq';
import privateAreaLoan from 'reducers/privateArea/loan';
const reducers = {
    form: formReducer,
    dictionary,
    decision,
    signUp,
    flow,
    step,
    calc,
    user,
    header,
    debitCard,
    privateAreaPages,
    privateAreaUser,
    privateAreaAuthorization,
    privateAreaHistory,
    privateAreaProducts,
    privateAreaBonus,
    privateAreaProlongation,
    privateAreaFAQ,
    privateAreaLoan
};

export default combineReducers(reducers);
