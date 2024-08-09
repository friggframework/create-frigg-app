import React, { Component } from 'react';
import { connect } from 'react-redux';
import qString from 'query-string';
import { setAuthToken } from '../actions/auth';
import API from '../api/api';

// handle the redirect that comes back from authing to Scrive or Hubspot.
class RedirectFromAuth extends Component {
	constructor(props) {
		super(props);

		// example redirect search params parsed with query-string:
		// {"code":"5e0cb3468d0e96d7_13885", "state":"app:hubspot"}

		// check whether the redirect is coming from Stack or Hubspot based on the "state" variable
		this.params = qString.parse(window.location.search);

		this.authToken = sessionStorage.getItem('jwt');
		this.api = new API();
		if (this.authToken) {
			this.props.dispatch(setAuthToken(this.authToken));
			this.api.setJwt(this.authToken);
		}
	}

	async componentDidMount() {
		if (this.params.code) {
			// Authenticate target entity
			const type = this.props.match.params.app;
			const response = await this.api.listIntegrations();
			const targetEntity = await this.api.authorize(type, {
				code: this.params.code,
			});

			if (targetEntity?.error) {
				alert(targetEntity.error);
				this.props.history.push('/integrations');
				return;
			}

			const config = {
				type,
				category: 'CRM',
			};

			let primaryEntityId;
			const foundPrimaryEntity = response.entities.authorized.find(
				(entity) => entity.type === "42matters"
			);
			if (foundPrimaryEntity) {
				primaryEntityId = foundPrimaryEntity.id;
			} else {
				primaryEntityId = targetEntity.entity_id;
			}

			const integration = await this.api.createIntegration(primaryEntityId, targetEntity.entity_id, config);

			if (!integration.error) {
				this.props.history.push('/integrations');
			} else {
				alert(integration.error);
			}
		}
	}

	render() {
		return (
			<div className="container">
				<div id="card-wrap" className="card">
					<div className="card-body">
						<h2>{this.props.match.params.app}</h2>
					</div>
				</div>
			</div>
			// <Redirect to='/manageAuth' />
		);
	}
}

// this function is used by redux connect() and tells the component
// which values we want to map from the store into props
function mapStateToProps({ auth }) {
	return {
		authToken: auth.token,
	};
}

// connects this component to the redux store.
export default connect(mapStateToProps)(RedirectFromAuth);
