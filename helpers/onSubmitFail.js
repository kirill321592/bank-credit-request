import { trackSubmitErrors } from 'core-front/helpers/trackers';

import ERRORS from 'errors';

const ADDITIONAL_INDENT = 60;

export const onFormSubmitFail = (errors, dispatch, submitError, props) => {
    let indent = 0;

    if (window.matchMedia('(max-width: 991px)').matches && props.header) {
        indent = props.header.height + ADDITIONAL_INDENT;
    }

    trackSubmitErrors(ERRORS, errors, indent);
};

export default (errors, dispatch, submitError, props) => {
    onFormSubmitFail(errors, dispatch, submitError, props);

    dispatch({ type: 'STEP_FORM_INVALID', errors });
};
