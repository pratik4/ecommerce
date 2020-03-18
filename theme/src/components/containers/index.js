import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import CustomProducts from '../components/products/custom';
import Categories from '../components/categories/';
import HomeSlider from '../components/homeSlider';
import Brands from '../components/brands';
import { Player, BigPlayButton } from 'video-react';
import { NavLink } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class IndexContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdown: '',
			catalogueValue: null
		};
		this.ondropdown = this.ondropdown.bind(this);
		this.catalogueDownload = this.catalogueDownload.bind(this);
	}

	catalogueDownload = () => {};
	ondropdown = () => {
		this.setState(prevState => ({
			dropdown: !prevState.dropdown
		}));
	};

	render() {
		const {
			addCartItem,
			productEnquiry,
			state: { brands, banners, categories, pageDetails, settings }
		} = this.props;

		const { dropdown, catalogueValue } = this.state;

		return (
			<Fragment>
				<MetaTags
					title={pageDetails.meta_title}
					description={pageDetails.meta_description}
					canonicalUrl={pageDetails.url}
					ogTitle={pageDetails.meta_title}
					ogDescription={pageDetails.meta_description}
				/>

				<HomeSlider banners={banners} />

				<section className="section">
					<div className="container">
						<Categories categories={categories} />
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className="hero">
							<div className="hero-body">
								<div className="product-feature has-text-centered">
									<strong>NEW ARRIVALS</strong>
								</div>
								<div className="subtitle has-text-centered">
									FIND PRODUCTS FOR SHOP STORE
								</div>
								<CustomProducts
									sku={themeSettings.home_products_sku}
									sort={themeSettings.home_products_sort}
									limit={themeSettings.home_products_limit}
									settings={settings}
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="hero index-catalogue is-hidden-touch">
					<div className="hero-body">
						<div className="catalogue-title has-text-centered">
							DOWNLOAD CATALOGUE
						</div>
						<div className="catalogue-dropdown select">
							<select
								style={{ width: `36.5%` }}
								onChange={e => {
									this.setState({
										catalogueValue: e.target.value
									});
								}}
								value={this.state.catalogueValue}
							>
								<option value="">
									<span className="download-catalogue-text">
										Choose Product Catalogue
									</span>{' '}
								</option>
								<option value="/assets/images/brochures/2015BusinessMachinesBrochure.pdf">
									<span className="download-catalogue-text">
										Business Machines Brochure
									</span>
								</option>
								<option value="/assets/images/brochures/CBT0756_Nobo_Prestige Brochure_2015_Eng.pdf">
									<span className="download-catalogue-text">Nobo Brochure</span>
								</option>
								<option value="/assets/images/brochures/CBT0757_Rexel_Quartet Brochure_uk.pdf">
									<span className="download-catalogue-text">
										Quartet Brochure
									</span>
								</option>
								<option value="/assets/images/brochures/K14_2243_Winter 2015 B2BCatalog_FINALEULowRez.pdf">
									<span className="download-catalogue-text">
										Kensington Brochure
									</span>
								</option>
							</select>
							<a
								className="button is-black"
								href={this.state.catalogueValue}
								download
							>
								Download Catalogue
							</a>
						</div>
					</div>
				</section>

				<section className="hero is-hidden-desktop">
					<div className="hero-body">
						<div className="catalogue-title has-text-centered">
							DOWNLOAD CATALOGUE
						</div>
						<div style={{ textAlign: `center` }}>
							<span className="catalogue-dropdown select">
								<select
									onChange={e => {
										this.setState({
											catalogueValue: e.target.value
										});
									}}
									value={this.state.catalogueValue}
								>
									<option value="">Choose Product Catalogue</option>
									<option value="/assets/images/brochures/2015BusinessMachinesBrochure.pdf">
										Business Machines Brochure
									</option>
									<option value="/assets/images/brochures/CBT0756_Nobo_Prestige Brochure_2015_Eng.pdf">
										Nobo Brochure
									</option>
									<option value="/assets/images/brochures/CBT0757_Rexel_Quartet Brochure_uk.pdf">
										Quartet Brochure
									</option>
									<option value="/assets/images/brochures/K14_2243_Winter 2015 B2BCatalog_FINALEULowRez.pdf">
										Kensington Brochure
									</option>
								</select>
							</span>
							<span>
								<a className="button" href={this.state.catalogueValue} download>
									<img
										className="icon"
										src="/assets/images/download-solid.svg"
										alt="download"
									/>
								</a>
							</span>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="title is-6 video-title has-text-centered">
						OUR VIDEO
					</div>
					<div className="hero video-hero">
						<div className="hero-body home-video-resize">
							<Player playsInline fluid={true}>
								<source src="/assets/images/Office_&_More_Video_Clip.mp4" />
								<BigPlayButton position="center" />
							</Player>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className="hero">
							<div className="hero-body">
								<div className="home-brands">OUR BRANDS</div>
								<Tabs>
									<TabList className="brands-tablist">
										<Tab>IT PRODUCTS</Tab>
										<Tab>STATIONARY PRODUCTS</Tab>
										<Tab>FURNITURE PRODUCTS</Tab>
										<Tab>OFFICE PRODUCTS</Tab>
									</TabList>

									<TabPanel className="brands-tabpanel">
										<Brands brands={brands} displayNone={false} />
									</TabPanel>
									<TabPanel>
										<h2>Any content 2</h2>
									</TabPanel>
									<TabPanel>
										<h2>Any content 3</h2>
									</TabPanel>
									<TabPanel>
										<h2>Any content 4</h2>
									</TabPanel>
								</Tabs>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="home-blog  is-hidden-touch ">
						<div className="hero is-small">
							<div className="hero-body">
								<div className="home-blogs-title">BLOG</div>
								<div className="home-blogs-subtitle">
									LOREM IPSUM DOLOR SIT AMET
								</div>
								<div className="container">
									<div className="columns">
										<div className="column">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img
															src="/assets/images/BlogImg/OfficeProducts.jpg"
															alt="Placeholder image"
														/>
													</figure>
												</div>
											</div>
											<div className="blog-title">
												<div>Lorem ipsum dolor sit amet, consectetur</div>
											</div>
											<div className="blog-subtitle">
												Post by Admin | 29 June 2019
											</div>
											<div className="blog-content">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Phasellus nec iaculis mauris.
											</div>
											<NavLink className="blog-link" to="/">
												Continue Reading
											</NavLink>
										</div>
										<div className="column">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img
															src="/assets/images/BlogImg/Stationery.jpg"
															alt="Placeholder image"
														/>
													</figure>
												</div>
											</div>
											<div className="blog-title">
												<div>Lorem ipsum dolor sit amet, consectetur</div>
											</div>
											<div className="blog-subtitle">
												Post by Admin | 29 June 2019
											</div>
											<div className="blog-content">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Phasellus nec iaculis mauris.
											</div>
											<NavLink className="blog-link" to="/">
												Continue Reading
											</NavLink>
										</div>
										<div className="column">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img
															src="/assets/images/BlogImg/ITproducts.jpg"
															alt="Placeholder image"
														/>
													</figure>
												</div>
											</div>
											<div className="blog-title">
												<div>Lorem ipsum dolor sit amet, consectetur</div>
											</div>
											<div className="blog-subtitle">
												Post by Admin | 29 June 2019
											</div>
											<div className="blog-content">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Phasellus nec iaculis mauris.
											</div>
											<NavLink className="blog-link" to="/">
												Continue Reading
											</NavLink>
										</div>
										<div className="column">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img
															src="/assets/images/BlogImg/OtherOfficeProducts.jpg"
															alt="Placeholder image"
														/>
													</figure>
												</div>
											</div>
											<div className="blog-title">
												<div>Lorem ipsum dolor sit amet, consectetur</div>
											</div>
											<div className="blog-subtitle">
												Post by Admin | 29 June 2019
											</div>
											<div className="blog-content">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Phasellus nec iaculis mauris.
											</div>
											<NavLink className="blog-link" to="/">
												Continue Reading
											</NavLink>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default IndexContainer;
