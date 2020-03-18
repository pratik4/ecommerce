import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {
	faEnvelope,
	faMobile,
	faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FooterContact from './contactfooter';

class FooterMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	isActiveToggle = () => {
		this.setState({
			isActive: !this.state.isActive
		});
	};

	render() {
		const { title, items } = this.props;
		let ulItems = null;

		if (items && items.length > 0) {
			ulItems = items.map((item, index) => (
				<li key={index}>
					<NavLink to={item.url || ''}>{item.text}</NavLink>
				</li>
			));
		}

		return (
			<div className="column is-3">
				<div
					className={
						'footer-title mobile-padding' +
						(this.state.isActive ? ' footer-menu-open' : '')
					}
					onClick={this.isActiveToggle}
				>
					{title}
					<span />
				</div>
				<ul className="footer-menu">{ulItems}</ul>
			</div>
		);
	}
}

const SocialIcons = ({ icons }) => {
	if (icons && icons.length > 0) {
		const items = icons.map((icon, index) => (
			<a
				key={index}
				href={icon.url || ''}
				target="_blank"
				rel="noopener"
				title={icon.type}
				className={icon.type}
			/>
		));
		return <p className="social-icons">{items}</p>;
	} else {
		return null;
	}
};

const Contacts = ({ contacts }) => {
	if (contacts && contacts.length > 0) {
		const items = contacts.map((item, index) => {
			const contact = item ? item.text : null;
			if (contact && contact.indexOf('@') > 0) {
				return (
					<li key={index}>
						<a href={'mailto:' + contact}>{contact}</a>
					</li>
				);
			} else {
				return <li key={index}>{contact}</li>;
			}
		});
		return <ul className="footer-contacts">{items}</ul>;
	} else {
		return null;
	}
};

class Footer extends React.PureComponent {
	static propTypes = {
		settings: PropTypes.shape({}).isRequired
	};

	render() {
		const { settings, contactUsMain } = this.props;
		const footerLogoUrl =
			themeSettings.footer_logo_url && themeSettings.footer_logo_url.length > 0
				? '/assets/images/' + themeSettings.footer_logo_url
				: settings.logo;

		return (
			<React.Fragment>
				<div className="hero is-small is-hidden-touch ">
					<div className="hero-body" style={{ backgroundColor: `#994B2F` }}>
						<div className="level">
							<div className="level-item">
								<span className="above-footer-icon">
									<img
										className="icon"
										src="/assets/images/100GenuineProducts.png"
									/>
								</span>
								<span className="above-footer">100% Genuine Products</span>
							</div>
							<div className="level-item">
								<span className="above-footer-icon">
									<img
										className="icon"
										src="/assets/images/ExclusiveCorporateDiscounts.png"
									/>
								</span>
								<span className="above-footer">
									Exclusive Corporate Discounts
								</span>
							</div>
							<div className="level-item">
								<span className="above-footer-icon">
									<img
										className="icon"
										src="/assets/images/fastestDelivery.png
									"
									/>
								</span>
								<span className="above-footer">Fastest delivery</span>
							</div>
							<div className="level-item">
								<span className="above-footer-icon">
									<img
										className="icon"
										src="/assets/images/WarrantiesCovered.png"
									/>
								</span>
								<span className="above-footer">Warranties Covered</span>
							</div>
						</div>
					</div>
				</div>

				<section className="section section-footer  is-hidden-touch ">
					<hr />
					<footer>
						<div className="container">
							<div className="columns is-gapless">
								<div className="column is-2	">
									<div className="mobile-padding">
										<div className="footer-logo">
											<img src="/assets/images/Logo.png" />
										</div>
										<div className="footer-authorized-partner">
											<h2>Authorized Partner</h2>
											<img src="/assets/images/HPSilverPartner.png" />
										</div>
									</div>
								</div>
								<div className="column is-5">
									<div className="tile is-vertical">
										<div className="tile is-parent">
											<div className="tile is-child is-1">
												<div className="footer-col-2">
													<span>
														<img
															className="icon"
															src="/assets/images/mapmarkeralt.png"
														/>
													</span>
												</div>
											</div>
											<div className="tile is-child">
												<span className="footer-col-2-text">
													Silverbird Entertainment Center, Gr. floor Plot 1161,
													Memorial Drive, Central Business District, Abuja,
													Nigeria
												</span>
											</div>
										</div>

										<div className="tile is-parent">
											<div className="tile is-child is-1">
												<div className="footer-col-2">
													<span>
														<img
															className="icon"
															src="/assets/images/phone-office.png"
														/>
													</span>
												</div>
											</div>
											<div className="tile is-child">
												<span className="footer-col-2-text">
													Got Question Us? Call us 24/7: (800)8001-8588 |
													080-9113-3225
												</span>
											</div>
										</div>

										<div className="tile is-parent">
											<div className="tile is-child is-1">
												<div className="footer-col-2">
													<span>
														<img
															className="icon"
															src="/assets/images/envelope.png"
														/>
													</span>
												</div>
											</div>
											<div className="tile is-child">
												<span className="footer-col-2-text">
													Email: sales@officenmore.net
												</span>
											</div>
										</div>
										<div
											style={{
												width: `400px`,
												height: `100px`,
												position: `relative`
											}}
										>
											<Map
												google={this.props.google}
												zoom={8}
												initialCenter={{ lat: 47.444, lng: -122.176 }}
											>
												<Marker
													name={'Dolores park'}
													position={{ lat: 37.759703, lng: -122.428093 }}
												/>
												<Marker />
											</Map>
										</div>
									</div>
								</div>
								<div className="column is-2">
									<div className="sitemap">Find It Fast</div>
									<ul className="sitemap-ul">
										<li>
											<NavLink to="/">IT Products</NavLink>
										</li>
										<li>
											<NavLink to="/">Stationary Products</NavLink>
										</li>
										<li>
											<NavLink to="/">Furniture Products</NavLink>
										</li>
										<li>
											<NavLink to="/">Other Office Products </NavLink>
										</li>
										<li>
											<NavLink to="/about-us">About Us</NavLink>
										</li>
										<li>
											<NavLink to="/contact-us">Contact Us</NavLink>
										</li>
									</ul>
									<div>
										<div className="followus">Follow Us On</div>
										<div>
											<span className="followus-icon">
												<a href="">
													<img
														className="icon"
														src="/assets/images/facebook-f.png"
													/>
												</a>
											</span>
											<span className="followus-icon">
												<a href="">
													<img
														className="icon"
														src="/assets/images/instagram.png"
													/>
												</a>
											</span>
										</div>
									</div>
								</div>
								<FooterContact contactUsMain={contactUsMain} />
							</div>
							<hr />
							<div className="level">
								<div className="level-left">
									<div className="level-item">
										<div className="below-footer-1">
											Office & More 2019 All Rights Reserved
										</div>
									</div>
								</div>
								<div className="level-item">
									<div className="below-footer-1">
										Designed and Developed by YPC
									</div>
								</div>
								<div className="level-right">
									<div className="level-item">
										<div className="below-footer-2">
											<span>
												<a> Privacy Policy </a>{' '}
											</span>
											<span> | </span>
											<span>
												<a> Cookies Policy </a>
											</span>
											<span> | </span>
											<span>
												<a> Terms & Conditions </a>
											</span>
											<span> | </span>
											<span>
												<a> Enquiry </a>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</footer>
				</section>

				<section className="section section-footer is-hidden-desktop">
					<hr />
					<footer>
						<div className="hero">
							<div className="hero-body">
								<div className="container">
									<div className="level">
										<div className="level-item">
											<div className="below-footer-1">
												Designed and Developed by YPC
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</footer>
				</section>
			</React.Fragment>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBV5NTA-uCBRsHrNawVdP4hWFzBuF0L7nA'
})(Footer);
