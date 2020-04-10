import { loadScript } from 'core-front/helpers/scriptsLoader';
import { React } from 'core-front/libs';

const JUICY_URL = 'https://score.juicyscore.com/static/js.js';

export default class extends React.Component {
    componentDidMount() {
        loadScript(JUICY_URL);
    }

    render() {
        return '';
    }
}