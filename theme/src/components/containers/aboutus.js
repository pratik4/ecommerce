import React from 'react';
import { themeSettings } from '../lib/settings';
import Hover from '../components/aboutushover';

class AboutUsContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<section style={{ position: `relative` }} className="page-contact-us">
					<figure className="image">
						<img src="/assets/images/contact-banner.jpg" />
					</figure>
					<div className="aboutus-banner-text">
						<div className="aboutus-banner-text-1">ABOUT US</div>
						<div className="aboutus-banner-text-2">
							The biggest Office Supplies store headquartered in Abuja, Nigeria.
						</div>
					</div>
				</section>

				<section>
					<div className="hero is-medium">
						<div className="hero-body">
							<div className="container">
								<div className="aboutus-content">
									Office & More is the biggest Office Supplies store
									headquartered in Abuja, Nigeria. An independently owned amd
									managed business entity, Office & More has earned a reputation
									in being a service provider of choice to Corporates and cater
									to individual requirements that are looking to build and
									efficient Office Infrastructure across IT Products, Stationery
									Products, Furniture Products and Other Products.
								</div>
								<div className="aboutus-content">
									The mainstay of Office; More is the wide range of products
									that are genuine, collection of premium worldwide brands and
									100% Quality Assurance.
								</div>
								<div className="aboutus-content">
									As a reliable and an effective Solution provider of an
									efficient Office Infrastructure, we counsel and advice to pick
									the optimum product for your exact needs. At Office & More, we
									have proven references of happy clients that have recognized
									our ability to provide exceptional from the very first contact
									right up to the delivery of the product solution.
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="choose-us-for">
					<div className="hero">
						<div className="hero-body">
							<div className="container">
								<div className="aboutus-section-3-title">CHOOSE US FOR</div>

								<div className="about-us-cards-1 is-hidden-touch">
									<div className="level">
										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/GenuineProducts.png" />
													</figure>
												</div>
												<div className="content">Genuine Products</div>
											</div>
										</div>
										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/PremiumBrands.png" />
													</figure>
												</div>
												<div className="content">Premium Brands</div>
											</div>
										</div>
										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/100quality.png" />
													</figure>
												</div>
												<div className="content">100% Quality Assurance</div>
											</div>
										</div>

										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/GoodValueformoney.png" />
													</figure>
												</div>
												<div className="">Good Value for Money</div>
											</div>
										</div>
									</div>
								</div>
								<div className="about-us-cards-2 is-hidden-touch">
									<div className="level">
										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/Logisticsstrength.png" />
													</figure>
												</div>
												<div className="content">
													A stop that has the largest inventory of everything to
													meet your exact Office needs.
												</div>
											</div>
										</div>
										<div className="level-item has-text-centered">
											<div className="card">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/Astopthathas.png" />
													</figure>
												</div>
												<div className="content">
													Logistics strength that allows on-time deliveries,
													helping you reduce your inventory costs and improve
													your business's bottom-line.
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="is-hidden-desktop">
									<div className="about-us-cards columns is-mobile">
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/GenuineProducts.png" />
													</figure>
												</div>
												<div className="content">Genuine Products</div>
											</div>
										</div>
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/PremiumBrands.png" />
													</figure>
												</div>
												<div className="content">Premium Brands</div>
											</div>
										</div>
									</div>
									<div className="about-us-cards columns is-mobile">
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/100quality.png" />
													</figure>
												</div>
												<div className="content">100% Quality Assurance</div>
											</div>
										</div>
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/GoodValueformoney.png" />
													</figure>
												</div>
												<div className="">Good Value for Money</div>
											</div>
										</div>
									</div>
									<div className="about-us-cards columns">
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/Logisticsstrength.png" />
													</figure>
												</div>
												<div className="content">
													A stop that has the largest inventory of everything to
													meet your exact Office needs.
												</div>
											</div>
										</div>
										<div className="column">
											<div className="card is-shadowless has-text-centered">
												<div className="card-image">
													<figure className="">
														<img src="/assets/images/about/Astopthathas.png" />
													</figure>
												</div>
												<div className="content">
													Logistics strength that allows on-time deliveries,
													helping you reduce your inventory costs and improve
													your business's bottom-line.
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<Hover />
				</section>
			</React.Fragment>
		);
	}
}

export default AboutUsContainer;
