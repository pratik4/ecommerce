import React, { Fragment } from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const EXTRA_PAGE = 'EXTRA_PAGE';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
	let i = from;
	const range = [];

	while (i <= to) {
		range.push(i);
		i += step;
	}

	return range;
};

class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}

	gotoPage = page => {
		const { onPageChanged = f => f } = this.props;
		const current_page = Math.max(1, Math.min(page, this.props.totalPages));

		// const paginationData = {
		//   currentPage,
		//   totalPages: this.totalPages,
		// };

		this.props.loadProductsPage(current_page);

		//this.setState({ currentPage }, () => onPageChanged(paginationData));
	};

	handleClick = (page, evt) => {
		evt.preventDefault();
		this.gotoPage(page);
	};

	handleMoveLeft = evt => {
		evt.preventDefault();
		this.gotoPage(this.props.currentPage - 1);
	};

	handleMoveRight = evt => {
		evt.preventDefault();
		this.gotoPage(this.props.currentPage + 1);
	};

	fetchPageNumbers = () => {
		const totalPages = this.props.totalPages;
		const currentPage = this.props.currentPage;

		const totalNumbers = 5;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const leftBound = currentPage + 1;
			const rightBound = totalPages - 1;

			if (currentPage + 3 > rightBound - 1) {
				const pages = range(totalPages - 4, totalPages);
				return [LEFT_PAGE, ...pages, RIGHT_PAGE];
			} else {
				const pages = [
					currentPage,
					leftBound,
					EXTRA_PAGE,
					rightBound,
					totalPages
				];
				return [LEFT_PAGE, ...pages, RIGHT_PAGE];
			}
		}

		const pages = range(1, totalPages);

		return [LEFT_PAGE, ...pages, RIGHT_PAGE];
	};

	render() {
		const { currentPage, totalPages } = this.props;

		if (totalPages === 1) return null;

		const pages = this.fetchPageNumbers();

		return (
			<Fragment>
				<nav
					className="pagination is-centered"
					role="navigation"
					aria-label="pagination"
				>
					<ul className="pagination-list">
						{pages.map((page, index) => {
							if (page === LEFT_PAGE)
								return (
									<li key={index}>
										<a
											className="pagination-link"
											href="#"
											aria-label="Previous"
											onClick={this.handleMoveLeft}
										>
											<span aria-hidden="true">&laquo;</span>
											<span className="sr-only">Previous</span>
										</a>
									</li>
								);

							if (page === RIGHT_PAGE)
								return (
									<li key={index}>
										<a
											className="pagination-link"
											href="#"
											aria-label="Next"
											onClick={this.handleMoveRight}
										>
											<span aria-hidden="true">&raquo;</span>
											<span className="sr-only">Next</span>
										</a>
									</li>
								);

							if (page === EXTRA_PAGE)
								return (
									<li key={index}>
										<a className="pagination-link" href="#" aria-label="...">
											<span aria-hidden="true">...</span>
											<span className="sr-only">...</span>
										</a>
									</li>
								);

							return (
								<li key={index}>
									<a
										className={`pagination-link ${
											currentPage === page ? 'is-current' : ''
										}`}
										href="#"
										onClick={e => this.handleClick(page, e)}
									>
										{page}
									</a>
								</li>
							);
						})}
					</ul>
				</nav>
			</Fragment>
		);
	}
}

export default Pagination;
