import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../router/router';


function AppRouter() {
	return (
		<>
			<Switch>
				{routes.map(route =>
					<Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
				)}
				{/* <Redirect to="/" /> */}

			</Switch>
		</>
	)
}

export default AppRouter
