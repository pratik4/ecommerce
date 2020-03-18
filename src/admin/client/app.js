import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from 'modules/head';
import Login from 'routes/login';
import Logout from 'routes/logout';
import Home from 'routes/home';
import NotFound from 'routes/notFound';
import Products from 'routes/products';
import ProductDetails from 'routes/products/edit';
import ProductCategories from 'routes/products/categories';
import Brands from 'routes/brands';
import Banners from 'routes/banners';
import Pages from 'routes/pages';
import PagesDetails from 'routes/pages/edit';
import Settings from 'routes/settings';
import Apps from 'routes/apps';
import Enquiry from 'routes/enquiry';
import Contactus from 'routes/contactus';
import ContactDetils from 'routes/contactview';
import Users from 'routes/users';
import Tokens from 'modules/settings/tokens/list';
import TokensEdit from 'modules/settings/tokens/edit';

import PrivateRoute from 'routes/private';

import {
	blue700,
	cyan700,
	pinkA200,
	grey100,
	grey300,
	grey400,
	white,
	darkBlack,
	fullBlack
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: blue700,
		primary2Color: cyan700,
		primary3Color: grey400,
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: blue700,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		pickerHeaderColor: blue700,
		shadowColor: fullBlack,
		disabledColor: darkBlack
	},
	appBar: {}
});

export default () => (
	<Router>
		<MuiThemeProvider muiTheme={muiTheme}>
			<div id="container">
				<div id="headContainer">
					<Head />
				</div>
				<div id="bodyContainer">
					<Switch>
						<Route path="/admin/login" component={Login} />
						<Route path="/admin/logout" component={Logout} />

						<PrivateRoute path="/admin/" exact component={Home} />
						<PrivateRoute path="/admin/products" exact component={Products} />
						<PrivateRoute
							path="/admin/products/categories"
							exact
							component={ProductCategories}
						/>
						<PrivateRoute
							path="/admin/product/:productId"
							component={ProductDetails}
						/>
						<PrivateRoute path="/admin/brands" exact component={Brands} />
						<PrivateRoute path="/admin/banners" exact component={Banners} />
						<PrivateRoute path="/admin/enquiries" exact component={Enquiry} />
						<PrivateRoute path="/admin/contactus" exact component={Contactus} />
						<PrivateRoute
							path="/admin/contactus/:contactId"
							component={ContactDetils}
						/>
						<PrivateRoute path="/admin/users" exact component={Tokens} />
						<PrivateRoute
							path="/admin/users/add"
							exact
							component={TokensEdit}
						/>
						<PrivateRoute path="/admin/users/:tokenId" component={TokensEdit} />
						<PrivateRoute component={NotFound} />
					</Switch>
				</div>
			</div>
		</MuiThemeProvider>
	</Router>
);
