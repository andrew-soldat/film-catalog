import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { routes } from '../router/router';


function AppRouter() {
	return (
		<>
			<Switch>
				{routes.map(route =>
					<Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
				)}
			</Switch>
		</>
	)
}

export default AppRouter
