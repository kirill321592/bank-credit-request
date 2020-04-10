import 'core-front/helpers/polyfills';
import { getErrorBoundary } from 'core-front/helpers/bugsnag';
import getReduxStore from 'core-front/helpers/getReduxStore';
import { React, ReactDOM } from 'core-front/libs';

import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

// set global moment locale
import 'moment/locale/es';

import Registration from 'Registration';
import PrivateAreaRoutes from 'PrivateArea/Routes';

import { LOGIN_PAGE } from 'PrivateArea/config';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const bsKey = 'eaf65fd6eba56f7c0dfcdd3ea4fb8fec';
const ErrorBoundary = getErrorBoundary(bsKey);
const store = getReduxStore(reducers);

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path="/registration" component={Registration} />

                    <Route path="/" component={PrivateAreaRoutes} />

                    <Redirect to={LOGIN_PAGE.url} />
                </Switch>
            </HashRouter>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);
