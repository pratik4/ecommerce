import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import Item from './item';
import LoadMore from './loadMore';
import Pagination from './pagination';

const ProductList = ({
	products,
	addCartItem,
	settings,
	loadMoreProducts,
	hasMore,
	loadingProducts,
	loadingMoreProducts,

	productsTotalPage,
	productsCurrentPage,
	loadProductsPage,

	isCentered,
	className = 'columns is-multiline is-mobile products',
	columnCountOnMobile,
	columnCountOnTablet,
	columnCountOnDesktop,
	columnCountOnWidescreen,
	columnCountOnFullhd
}) => {
	const items = products
		? products.map(product => (
				<Item
					key={product.id}
					product={product}
					addCartItem={addCartItem}
					settings={settings}
					columnCountOnMobile={columnCountOnMobile}
					columnCountOnTablet={columnCountOnTablet}
					columnCountOnDesktop={columnCountOnDesktop}
					columnCountOnWidescreen={columnCountOnWidescreen}
					columnCountOnFullhd={columnCountOnFullhd}
				/>
		  ))
		: null;

	return (
		<Fragment>
			<div
				className={
					className +
					(loadingProducts ? ' loading' : '') +
					(isCentered ? ' is-centered' : '')
				}
			>
				{items}
			</div>
			<Pagination
				totalPages={productsTotalPage}
				currentPage={productsCurrentPage}
				loadProductsPage={loadProductsPage}
			/>
		</Fragment>
	);
};

export default ProductList;
