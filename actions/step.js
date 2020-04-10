import { trackExperimentWithCustomDimension } from 'core-front/helpers/experiments';
import extractListOptions from 'core-front/helpers/extractListOptions';
import setErrors from '../helpers/setErrors';
import { api } from 'core-front';
import { API } from '../api';

const isStepFailed = (errors, dispatch) => {
    if (errors && errors.length) {
        switch (errors[0].subject) {
        case 'please.redirect.to.old.registration':
            window.location.href = '/secure/registration';
            return false;
        case 'please.redirect.to.registration':
            dispatch(fetchStep());
            return false;
        case 'please.redirect.to.pa':
            window.location.href = '/secure/loan-detail';
            return false;
        case 'please.redirect.to.finpublic':
            if (errors[0].params && errors[0].params[0]) {
                window.location.href = errors[0].params[0];
            }
            return false;
        case 'scoring.status':
            return false;
        default:
            return true;
        }
    }

    return true;
};

const isAutoLogin = flow => {
    return ['FLOW_OLD_USER', 'USER_CONFIRM_FLOW', 'USER_CONFIRM_FLOW_RECURRING'].includes(flow);
};

export const fetchStep = (search = '') => async dispatch => {
    dispatch({ type: 'STEP_REQUESTING' });

    try {
        const res = await fetch(`${API.REG}${search}`, { ...api.headers.get });
        const { data, step, jsonSchema, validation, path, experiments=[]} = await res.json();

        if (data) {
            const dictionary = extractListOptions(jsonSchema || {});
            const experimentDimensions = ['MMES_REG_VERSION_B'];
            const strategies = {};

            if (experiments.length) {
                experiments.forEach(({ experimentType, strategy }) => {
                    experimentDimensions.push(strategy);
                    strategies[experimentType] = strategy;
                });
            }

            dispatch({ type: 'STEP_SUCCESS', data: { data, jsonSchema, step, dictionary, experiments: strategies }});

            path.flow
                ? dispatch({ type: 'FLOW_SUCCESS', data: path })
                : dispatch({ type: 'FLOW_FAILURE' });

            trackExperimentWithCustomDimension(experimentDimensions);
        } else {
            isStepFailed(validation, dispatch);
        }
    } catch (err) {
        dispatch({ type: 'STEP_FAILURE', err: 'request failed' });
        api.notify(err);
    }
};

export const nextStep = (data, dispatch) => {
    dispatch({ type: 'NEXT_STEP_REQUESTING' });

    return fetch(API.REG, {
        ...api.headers.post,
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(({ validation, path }) => {
            if (!validation) {
                if (isAutoLogin(path.flow)) {
                    dispatch({ type: 'RELOAD_CALCULATOR' });
                }
                dispatch(fetchStep());
            } else if (validation) {
                if (isStepFailed(validation, dispatch)) {
                    dispatch({ type: 'NEXT_STEP_FAILURE', validation });
                    setErrors(validation);
                }
            }
        });
};