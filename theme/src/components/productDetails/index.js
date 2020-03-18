import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import ViewedProducts from '../products/viewed';
import Breadcrumbs from './breadcrumbs';
import DiscountCountdown from './discountCountdown';
import AddToCartButton from './addToCartButton';
import Attributes from './attributes';
import Gallery from './gallery';
import Options from './options';
import Price from './price';
import Quantity from './quantity';
import RelatedProducts from './relatedProducts';
import Tags from './tags';
import api from '../../lib/api';
import EnquireModal from './modal';

import CustomProducts from '../products/custom';
import BrandsProduct from '../brandsProduct';

const Description = ({ description }) => (
	<div
		className="product-overview-content"
		dangerouslySetInnerHTML={{ __html: description }}
	/>
);

export default class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1,
			modalState: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
			this
		);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	toggleModal() {
		this.setState((prev, props) => {
			const newState = !prev.modalState;

			return {
				modalState: newState
			};
		});
	}

	onOptionChange(optionId, valueId) {
		let { selectedOptions } = this.state;

		if (valueId === '') {
			delete selectedOptions[optionId];
		} else {
			selectedOptions[optionId] = valueId;
		}

		this.setState({ selectedOptions: selectedOptions });
		this.findVariantBySelectedOptions();
		this.checkSelectedOptions();
	}

	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(
				variantOption =>
					selectedOptions[variantOption.option_id] === variantOption.value_id
			);
			if (variantMutchSelectedOptions) {
				this.setState({ selectedVariant: variant });
				return;
			}
		}

		this.setState({ selectedVariant: null });
	}

	setQuantity = quantity => {
		this.setState({ quantity: quantity });
	};

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		let item = {
			product_id: product.id,
			quantity: quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}

		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;

		const allOptionsSelected =
			Object.keys(selectedOptions).length === product.options.length;
		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	render() {
		const {
			product,
			settings,
			categories,
			productEnquiry,
			downloadBrochure
		} = this.props;

		console.log('product', product);
		var STOCK_STATUS = '';
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity =
			product.stock_status === 'discontinued'
				? 0
				: product.stock_backorder
					? themeSettings.maxCartItemQty
					: selectedVariant
						? selectedVariant.stock_quantity
						: product.stock_quantity;

		if (product.stock_status === 'available') {
			STOCK_STATUS = 'IN STOCK';
		} else if (product.stock_status === 'out_of_stock') {
			STOCK_STATUS = 'OUT OF STOCK';
		} else if (product.stock_status === 'discontinued') {
			STOCK_STATUS = 'DISCONTINUED';
		} else {
			STOCK_STATUS = '';
		}

		if (product) {
			return (
				<Fragment>
					<section className="section section-product">
						<div className="container">
							<div className="columns">
								<div className="column is-7">
									{themeSettings.show_product_breadcrumbs && (
										<Breadcrumbs product={product} categories={categories} />
									)}
									<Gallery images={product.images} />
								</div>
								<div className="column is-5">
									<div className="content">
										<div className="product-name">{product.name}</div>
										<div style={{ marginTop: `6.44%` }}>
											<span className=" product-tag">{STOCK_STATUS}</span>
										</div>
										<hr />
										<div className="product-overview-title">
											<strong>OVERVIEW</strong>
										</div>
										<Description description={product.description} />

										<Options
											options={product.options}
											onChange={this.onOptionChange}
										/>
										<div className="level brochure-qunatity is-mobile">
											<div className="level-item">
												<Quantity
													maxQuantity={maxQuantity}
													onChange={this.setQuantity}
												/>
											</div>
											<div className="level-item ">
												{product.brochure ? (
													<a
														className="button product-download-button"
														href={product.brochure.url}
														download
													>
														DOWNLOAD BROCHURE
													</a>
												) : (
													<a
														className="button product-download-button"
														href=""
														disabled
													>
														DOWNLOAD BROCHURE
													</a>
												)}
											</div>
										</div>

										<div className="columns">
											<div className="column">
												<div>
													<a
														className="button is-fullwidth enquiry-button"
														onClick={this.toggleModal}
													>
														ENQUIRE NOW
													</a>
												</div>
												<EnquireModal
													closeModal={this.toggleModal}
													modalState={this.state.modalState}
													title="Example Modal title"
													quantity={this.state.quantity}
													productEnquiry={productEnquiry}
													product={product}
												/>
											</div>
										</div>
										{/* <div className="button-addtocart">
											<AddToCartButton
												product={product}
												variant={selectedVariant}
												addCartItem={this.addToCart}
												isAllOptionsSelected={isAllOptionsSelected}
											/>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</section>

					<RelatedProducts
						settings={settings}
						addCartItem={this.addToCart}
						ids={product.related_product_ids}
						limit={10}
					/>

					<section className="section section-product-related">
						<div className="container">
							<div className="related_products_title">POPULAR ACROSS SITE</div>
							<CustomProducts
								sku={themeSettings.home_products_sku}
								sort={themeSettings.home_products_sort}
								limit={themeSettings.home_products_limit}
								settings={settings}
							/>
						</div>
						<section className="section section-product-brands">
							<div className="container">
								<div className="related_products_title">
									YOUR OTHER FAVOURITE BRANDS
								</div>
								<BrandsProduct />
							</div>
						</section>
					</section>

					{/*themeSettings.show_viewed_products && (
						<ViewedProducts
							settings={settings}
							addCartItem={this.addToCart}
							product={product}
							limit={themeSettings.limit_viewed_products || 4}
						/>
					)*/}
				</Fragment>
			);
		} else {
			return null;
		}
	}
}
