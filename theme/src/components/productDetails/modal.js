import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: ''
		};

		this.onEmail = this.onEmail.bind(this);
		this.onName = this.onName.bind(this);
		this.hadleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = () => {
		const { product, productEnquiry } = this.props;

		const data = {
			form: this.state,
			name: product.name,
			url: product.url
		};

		productEnquiry(data);
	};

	onEmail = e => {
		this.setState({
			email: e.target.value
		});
	};

	onName = e => {
		this.setState({
			name: e.target.value
		});
	};

	render() {
		const { closeModal, product, modalState, title, quantity } = this.props;
		if (!modalState) {
			return null;
		}
		var thumbnailImage;
		if (product.images[0]) {
			const image = product.images[0];
			thumbnailImage = helper.getThumbnailUrl(
				image.url,
				themeSettings.bigThumbnailWidth
			);
		} else {
			thumbnailImage = '/assets/images/camera-solid.svg';
		}

		return (
			<div className="modal is-active">
				<div className="modal-background" onClick={closeModal} />
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title enquire-title">
							Enquire regarding this product.
						</p>
						<button className="delete" onClick={closeModal} />
					</header>
					<section className="modal-card-body">
						<div className="card">
							<div className="card-content">
								<div className="media">
									<div className="media-left">
										<figure className="image is-48x48">
											<img src={thumbnailImage} alt="image" />
										</figure>
									</div>
									<div className="media-content">
										<p className="title is-spaced is-4">{product.name}</p>
										<p className="subtitle is-6">
											<strong>Quantity: </strong>
											{quantity}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="field">
							<label className="label"> Name </label>
							<div className="control">
								<input
									className="input"
									type="text"
									placeholder="Text input"
									onChange={this.onName}
								/>
							</div>
						</div>
						<div className="field">
							<label className="label"> Email </label>
							<div className="control has-icons-left">
								<input
									className="input"
									type="email"
									placeholder="Email input"
									onChange={this.onEmail}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-envelope" />
								</span>
							</div>
						</div>
					</section>
					<footer className="modal-card-foot">
						<a className="button" onClick={this.handleSubmit}>
							submit
						</a>
					</footer>
				</div>
			</div>
		);
	}
}
export default Modal;
