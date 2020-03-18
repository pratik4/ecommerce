import React from 'react';
import { Link } from 'react-router-dom';

import messages from 'lib/text';
import ProductCategoryHead from 'modules/productCategories/head/index';
import PageHead from 'modules/pages/edit/head';
import PageListHead from 'modules/pages/list/head';
import ProductsHead from 'modules/products/listHead/index';
import ProductHead from 'modules/products/editHead/index';
import TokenListHead from 'modules/settings/tokens/list/head';
import WebhooksListHead from 'modules/settings/webhooks/list/head';
import WebhooksEditHead from 'modules/settings/webhooks/edit/head';
import AppsHead from 'modules/apps/head';
import DrawerMenu from './drawer';
import BrandsHead from 'modules/brands/head';
import BannersHead from 'modules/banners/head';
import ContactsHead from 'modules/contacts/head/index';
import EnquiriesHead from 'modules/enquiry/head/index';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

export default class AppBarTop extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	handleToggle = () => this.setState({ open: !this.state.open });
	handleClose = () => this.setState({ open: false });

	render() {
		const { location, productCategoryName, productsSelectedCount } = this.props;
		const pathname = location.pathname;

		if (pathname === '/admin/login' || pathname === '/admin/logout') {
			return null;
		}

		let title = messages.dashboard;
		let leftButton = (
			<IconButton onClick={this.handleToggle}>
				<FontIcon className="material-icons">menu</FontIcon>
			</IconButton>
		);
		let rightElements = null;
		{
			/* <IconButton><FontIcon color="#fff" className="material-icons">notifications</FontIcon></IconButton> */
		}

		if (pathname === '/admin/products') {
			title = messages.products_title;

			if (productCategoryName) {
				title = (
					<span>
						{messages.products_title}
						<FontIcon
							style={{ top: 6 }}
							color="#fff"
							className="material-icons"
						>
							chevron_right
						</FontIcon>
						{productCategoryName}
					</span>
				);
			}

			if (productsSelectedCount > 0) {
				title = `${productsSelectedCount} ${messages.selected}`;
			}

			rightElements = <ProductsHead />;
		} else if (
			pathname.startsWith('/admin/product/') &&
			pathname.includes('/option/')
		) {
			const productId = pathname.split('/')[3];
			title = messages.editProductOption;
			leftButton = (
				<Link to={`/admin/product/${productId}`}>
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/admin/product/')) {
			title = messages.products_titleEdit;
			leftButton = (
				<Link to="/admin/products">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <ProductHead />;
		} else if (pathname === '/admin/products/categories') {
			title = productCategoryName
				? messages.productCategories_titleEdit
				: messages.productCategories_title;
			leftButton = (
				<Link to="/admin/products">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <ProductCategoryHead />;
		} else if (pathname === '/admin/brands') {
			title = 'Brands';
			leftButton = (
				<IconButton onClick={this.handleToggle}>
					<FontIcon className="material-icons">menu</FontIcon>
				</IconButton>
			);
			rightElements = <BrandsHead />;
		} else if (pathname === '/admin/banners') {
			title = 'Banners';
			leftButton = (
				<IconButton onClick={this.handleToggle}>
					<FontIcon color="#fff" className="material-icons">
						menu
					</FontIcon>
				</IconButton>
			);
			rightElements = <BannersHead />;
		} else if (
			pathname === '/admin/settings/general' ||
			pathname === '/admin/settings'
		) {
			title = messages.settings_generalSettings;
		} else if (pathname === '/admin/settings/general/logo') {
			title = messages.logo;
			leftButton = (
				<Link to="/admin/settings">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/admin/settings/webhooks') {
			title = messages.webhooks;
			rightElements = <WebhooksListHead />;
		} else if (pathname === '/admin/settings/webhooks/add') {
			title = messages.webhookAdd;
			leftButton = (
				<Link to="/admin/settings/webhooks">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/admin/settings/webhooks/')) {
			title = messages.webhookEdit;
			leftButton = (
				<Link to="/admin/settings/webhooks">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <WebhooksEditHead />;
		} else if (pathname === '/admin/apps') {
			title = messages.apps;
			rightElements = <AppsHead />;
		} else if (pathname === '/admin/apps/login') {
			title = messages.loginTitle;
			rightElements = <AppsHead />;
			leftButton = (
				<Link to="/admin/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/admin/apps/account') {
			title = messages.account;
			leftButton = (
				<Link to="/admin/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (
			pathname.startsWith('/admin/apps/service/') ||
			pathname.startsWith('/admin/apps/app/')
		) {
			title = messages.apps;
			leftButton = (
				<Link to="/admin/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/admin/pages') {
			title = messages.settings_pages;
			rightElements = <PageListHead />;
		} else if (pathname === '/admin/pages/add') {
			title = messages.settings_addPage;
			leftButton = (
				<Link to="/admin/pages">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/admin/pages/')) {
			title = messages.settings_editPage;
			leftButton = (
				<Link to="/admin/pages">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <PageHead />;
		} else if (pathname.startsWith('/admin/enquiries')) {
			title = 'Enquiries';
			rightElements = <EnquiriesHead />;
		} else if (pathname.startsWith('/admin/contactus')) {
			title = 'Contacts';
			rightElements = <ContactsHead />;
		} else if (pathname === '/admin/users') {
			title = 'List Of Admins';
			rightElements = <TokenListHead />;
		} else if (pathname === '/admin/users/add') {
			title = 'Add Admin';
			leftButton = (
				<Link to="/admin/users">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/admin/users/')) {
			title = 'Edit User';
			leftButton = (
				<Link to="/admin/users">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		}
		return (
			<div>
				<AppBar
					className="appBar"
					titleStyle={{ fontSize: 18 }}
					title={title}
					iconElementLeft={leftButton}
					iconElementRight={rightElements}
				/>
				<DrawerMenu
					open={this.state.open}
					onClose={this.handleClose}
					currentUrl={pathname}
				/>
			</div>
		);
	}
}
