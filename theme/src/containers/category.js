import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from '../components/sort';
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs';
import * as helper from '../lib/helper';
import CustomProducts from '../components/products/custom';
import Brands from '../components/brandsProduct';
import HeaderFilters from '../components/productFilter/headerFilter';

const getFilterAttributesSummary = productFilter => {
	let attributesSummary = '';
	if (productFilter.attributes) {
		Object.keys(productFilter.attributes).forEach(attributeKey => {
			const attributeName = attributeKey.replace('attributes.', '');
			const attributeValue = productFilter.attributes[attributeKey];
			const attributeValueFormatted = Array.isArray(attributeValue)
				? attributeValue.join(', ')
				: attributeValue;
			attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`;
		});
	}
	return attributesSummary;
};

const getFilterPriceSummary = (productFilter, settings) => {
	let priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		const priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`;
	}
	return priceSummary;
};

const CategoryHero = ({ categoryDetails, categories }) => (
	<section className="hero is-light">
		<div className="hero-body">
			<div className="container">
				{themeSettings.show_category_breadcrumbs && (
					<CategoryBreadcrumbs
						currentCategory={categoryDetails}
						categories={categories}
					/>
				)}
				<h1 className="category-title">{categoryDetails.name}</h1>
				<div
					className="category-description is-hidden-mobile content"
					dangerouslySetInnerHTML={{ __html: categoryDetails.description }}
				/>
			</div>
		</div>
	</section>
);

CategoryHero.propTypes = {
	categoryDetails: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const CategoryContainer = props => {
	const {
		setSort,
		addCartItem,
		productEnquiry,
		loadMoreProducts,
		loadProductsPage,
		getJSONLD,
		state,
		state: {
			products,
			categoryDetails,
			settings,
			productFilter,
			productsHasMore,

			productsCurrentPage,
			productsTotalPage,

			categories,
			loadingProducts,
			loadingMoreProducts
		}
	} = props;

	const filterAttributesSummary = getFilterAttributesSummary(productFilter);
	const filterPriceSummary = getFilterPriceSummary(productFilter, settings);
	const pageTitle =
		categoryDetails.meta_title && categoryDetails.meta_title.length > 0
			? categoryDetails.meta_title
			: categoryDetails.name;
	const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`;

	const jsonld = getJSONLD(state);

	const showFilter = themeSettings.show_product_filter;

	return (
		<Fragment>
			<MetaTags
				title={title}
				description={categoryDetails.meta_description}
				canonicalUrl={categoryDetails.url}
				imageUrl={categoryDetails.image}
				ogType="product.group"
				ogTitle={categoryDetails.name}
				ogDescription={categoryDetails.meta_description}
				jsonld={jsonld}
			/>

			<CategoryHero categoryDetails={categoryDetails} categories={categories} />

			<section
				style={{ backgroundColor: `#F0F8FF` }}
				className="section section-category"
			>
				<div className="container">
					<div className="columns">
						{showFilter === true && (
							<div className="column is-one-quarter left-sidebar">
								<div className="productpage-filter-products-title">
									Filter Products
								</div>
								<hr className="productpage-top-line" />
								<ProductFilter {...props} />
							</div>
						)}

						<div className="column">
							<div className="columns">
								<div className="column">
									<div>
										<HeaderFilters {...props} />
									</div>
								</div>
								<div className="column is-5">
									<Sort
										defaultSort={settings.default_product_sorting}
										currentSort={productFilter.sort}
										setSort={setSort}
									/>
								</div>
							</div>
							<hr className="productpage-top-line" />
							<ProductList
								products={products}
								addCartItem={addCartItem}
								settings={settings}
								loadMoreProducts={loadMoreProducts}
								loadProductsPage={loadProductsPage}
								hasMore={productsHasMore}
								loadingProducts={loadingProducts}
								loadingMoreProducts={loadingMoreProducts}
								productEnquiry={productEnquiry}
								productsCurrentPage={productsCurrentPage}
								productsTotalPage={productsTotalPage}
							/>

							<div>
								<div className="productpage-banner">
									<figure className="image">
										<img src="/assets/images/productPage/OfferProduct.jpg" />
										<div className="productpage-banner-text">
											<div className="subtitle">OFFER OF THE MONTH</div>
											<div className="title">GLORY GFB-800</div>
											<div className="button">ENQUIRE NOW</div>
										</div>
									</figure>
								</div>

								<div style={{ margin: `10% 0px` }}>
									<div className="productpage-featured">
										FEATURED COLLECTIONS
									</div>
									<CustomProducts
										sku={themeSettings.home_products_sku}
										sort={themeSettings.home_products_sort}
										limit={themeSettings.home_products_limit}
										settings={settings}
									/>
								</div>

								<div>
									<div className="productpage-featured">
										MOST POPULAR BRANDS
									</div>
									<div style={{ marginTop: `10px` }}>
										<Brands />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

CategoryContainer.propTypes = {
	setSort: PropTypes.func.isRequired,
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	getJSONLD: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool,
		productsTotalPage: PropTypes.number,
		productsCurrentPage: PropTypes.number,
		categoryDetails: PropTypes.shape({}),
		categories: PropTypes.arrayOf(PropTypes.shape({})),
		loadingProducts: PropTypes.bool,
		loadingMoreProducts: PropTypes.bool
	}).isRequired
};

export default CategoryContainer;
