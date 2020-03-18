import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import messages from 'lib/text';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import General from 'modules/settings/general';
import GeneralLogo from 'modules/settings/generalLogo';
import GeneralBrands from 'modules/settings/generalBrands';
import Tokens from 'modules/settings/tokens/list';
import TokensEdit from 'modules/settings/tokens/edit';
import Email from 'modules/settings/email';
import Webhooks from 'modules/settings/webhooks/list';
import WebhooksEdit from 'modules/settings/webhooks/edit';

const styles = {
	link: {
		color: 'inherit',
		textDecoration: 'none',
		fontWeight: 'inherit',
		display: 'block'
	},
	linkActive: {
		backgroundColor: 'rgba(0,0,0,0.1)'
	}
};

const SettingsMenu = () => (
	<List>
		<NavLink
			style={styles.link}
			activeStyle={styles.linkActive}
			to="/admin/settings"
			exact={true}
		>
			<ListItem
				primaryText={messages.settings_general}
				leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
			/>
		</NavLink>

		<NavLink
			style={styles.link}
			activeStyle={styles.linkActive}
			to="/admin/settings/webhooks"
		>
			<ListItem
				primaryText={messages.webhooks}
				leftIcon={<FontIcon className="material-icons">http</FontIcon>}
			/>
		</NavLink>
		<NavLink
			style={styles.link}
			activeStyle={styles.linkActive}
			to="/admin/settings/tokens"
		>
			<ListItem
				primaryText={messages.settings_tokens}
				leftIcon={<FontIcon className="material-icons">vpn_key</FontIcon>}
			/>
		</NavLink>
		{/* <NavLink style={styles.link} activeStyle={styles.linkActive} to="/admin/settings/taxes"><ListItem primaryText={messages.settings_taxes} leftIcon={<FontIcon className="material-icons">attach_money</FontIcon>}/></NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/admin/settings/security"><ListItem primaryText={messages.settings_security} leftIcon={<FontIcon className="material-icons">security</FontIcon>}/></NavLink> */}
	</List>
);

const Settings = ({ match }) => {
	return (
		<div className="row row--no-gutter col-full-height">
			<div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
				<SettingsMenu />
			</div>
			<div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
				<Switch>
					<Route path="/admin/settings" exact component={General} />
					<Route path="/admin/settings/general/logo" component={GeneralLogo} />
					<Route
						path="/admin/settings/general/brands"
						component={GeneralBrands}
					/>

					<Route path="/admin/settings/tokens" exact component={Tokens} />
					<Route
						path="/admin/settings/tokens/add"
						exact
						component={TokensEdit}
					/>
					<Route
						path="/admin/settings/tokens/:tokenId"
						component={TokensEdit}
					/>

					<Route path="/admin/settings/webhooks" exact component={Webhooks} />
					<Route
						path="/admin/settings/webhooks/add"
						exact
						component={WebhooksEdit}
					/>
					<Route
						path="/admin/settings/webhooks/:webhookId"
						component={WebhooksEdit}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default Settings;
