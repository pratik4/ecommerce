import { connect } from 'react-redux';
import {
	fetchToken,
	updateToken,
	createToken,
	receiveToken,
	deleteToken
} from '../../actions';
import Form from './components/form';

const mapStateToProps = (state, ownProps) => {
	const { tokenId } = ownProps.match.params;
	return {
		tokenId: tokenId,
		initialValues: state.settings.tokenEdit,
		newToken: state.settings.newToken
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onLoad: () => {
			const { tokenId } = ownProps.match.params;
			if (tokenId) {
				dispatch(fetchToken(tokenId));
			} else {
				dispatch(receiveToken({ expiration: 24 }));
			}
		},
		onSubmit: token => {
			token.scopes = ['admin'];
			token.expiration = 24;
			console.log('token', token);

			if (token.id) {
				dispatch(updateToken(token));
				ownProps.history.push('/admin/users');
			} else {
				dispatch(createToken(token));
				ownProps.history.push('/admin/users');
			}
		},
		onDelete: () => {
			const { tokenId } = ownProps.match.params;
			dispatch(deleteToken(tokenId));
			ownProps.history.push('/admin/users');
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);