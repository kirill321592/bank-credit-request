import { React } from 'core-front/libs';
import { validate } from 'core-front/helpers/schemeValidator';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { load, init } from '../../actions/instantor';

const FORM_NAME = 'instantorForm';

class InstantorForm extends React.Component {
    componentDidMount() {
        const { load, init, data } = this.props;

        load(() => init(data));
    }

    render() {
        return (
            <>
                <h2>Valida tu crédito con banca online</h2>

                <div id="itor" />
            </>
        );
    }
}

export default compose(
    connect(state => ({
        jsonSchema: state.step.jsonSchema,
        data: state.step.data,
        header: state.header
    }), { load, init }),
    reduxForm({
        form: FORM_NAME,
        validate,
    }),
)(InstantorForm);