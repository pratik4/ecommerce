import React from 'react';
import ContactUsForm from './contactform';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
	width: '100%',
	position: 'relative',
	height: '400px'
};

class ContactUsContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { contactUsMain } = this.props;
		return (
			<React.Fragment>
				<div style={{ backgroundColor: `#F0F8FF` }}>
					<section style={{ position: `relative` }} className="page-contact-us">
						<figure className="image">
							<img src="/assets/images/contact-banner.jpg" />
						</figure>
						<div className="contactus-banner-text">
							<div className="contactus-banner-text-1">CONTACT US</div>
							<div className="contactus-banner-text-2">
								Ask us everything and we will guide you to dream.
							</div>
						</div>
					</section>

					<section className="contact-us-section-2">
						<div className="hero ">
							<div className="hero-body">
								<div className="container">
									<div className="columns">
										<div className="column is-5">
											<div className="contact-us-title">SHOWROOM ADDRESS</div>
											<div className="contact-us-subtitle">
												SilverBoard Entertainment Center, Gr. floor, Plot 1161,
												Memorial Drive, Central Business District, Abuja,
												Nigeria
											</div>
											<div className="contact-us-title">SHOWROOM TIMINGS:</div>
											<div className="contact-us-subtitle">
												<ul>
													<li>Monday to Friday: 9 A.M - 7:30 P.M. </li>
													<li> Saturday: 10:00 A.M - 7:00 P.M. </li>
													<li> Sunday: 12:30 P.M. - 7:00 P.M. </li>
												</ul>
											</div>
											<div className="contact-us-title">CONTACT</div>
											<div className="contact-us-subtitle">
												<ul>
													<li>+234 7038167814</li>
													<li>+234 8028807700</li>
													<li>+234 8125000007</li>
												</ul>
											</div>
											<div className="contact-us-title">EMAIL</div>
											<div className="contact-us-subtitle">
												sales@officenmore.net
											</div>
										</div>
										<div className="column">
											<div style={mapStyles}>
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
								</div>
							</div>
						</div>
					</section>
					<ContactUsForm contactUsMain={contactUsMain} />
				</div>
			</React.Fragment>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBV5NTA-uCBRsHrNawVdP4hWFzBuF0L7nA'
})(ContactUsContainer);
