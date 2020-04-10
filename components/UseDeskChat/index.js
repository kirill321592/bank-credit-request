import { loadScript } from 'core-front/helpers/scriptsLoader';
import { React } from 'core-front/libs';

const CHAT_URL = 'https://mmlib.usedesk.ru/mm.usedesk.ru/widget_154532_3040.js';

export default class extends React.Component {
    componentDidMount() {
        if (process.env.REACT_APP_ENV !== 'dev') {
            loadScript(CHAT_URL);
        }
    }

    render() {
        return '';
    }
}