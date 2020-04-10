import { React } from 'core-front/libs';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as PA_PAGES from 'PrivateArea/config';
import PrivateArea from 'PrivateArea';
import Registration from 'Registration';

const PrivateAreaRoutes = () => (
    <Switch>
        {Object.keys(PA_PAGES).map(key => {
            const page = PA_PAGES[key];

            if (!page.component) {
                return null;
            }

            return (
                <Route
                    exact
                    key={key}
                    path={page.url}
                    render={routeProps => (
                        <PrivateArea
                            {...routeProps}
                            {...page}
                        />
                    )}
                />
            );
        })}

        <Route path="/registration" component={Registration} />

        <Redirect to={PA_PAGES.LOGIN_PAGE.url} />
    </Switch>
);

export default PrivateAreaRoutes;
