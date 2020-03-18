import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import * as auth from '../lib/auth';

console.log('auth.validateCurrentToken', auth.validateCurrentToken());
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.validateCurrentToken() ? (
				<Component {...props} />
			) : (
				<Redirect to="/admin/login" />
			)
		}
	/>
);

export default PrivateRoute;
