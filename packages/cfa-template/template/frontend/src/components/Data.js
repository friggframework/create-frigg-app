import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import API from '../api/api';
import { setAuthToken } from '../actions/auth';
import { logoutUser } from '../actions/logout';
import {useNavigate, useParams} from "react-router-dom";

// Render sample data (objects of any type) into a data table.
// Use first row's object keys as headers.
function withParams(Component) {
	return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}
class Data extends Component {
	constructor(props) {
		super(props);
		this.state = { headers: [], rows: [] };
	}

	async componentDidMount() {
		const jwt = sessionStorage.getItem('jwt');
		if (jwt !== this.props.authToken) {
			await this.props.dispatch(setAuthToken(jwt));
		}

		if (this.props.authToken) {
			const api = new API();
			api.setJwt(this.props.authToken);

			const { integrationId } = this.props.params;
			let sampleData = await api.getSampleData(integrationId);

			if (sampleData.constructor !== Array) {
				sampleData = sampleData.data;
			}
			if (sampleData.error) this.props.dispatch(logoutUser());

			const headers = sampleData && sampleData.length ? Object.keys(sampleData[0]) : [];
			const rows = headers && headers.length ? sampleData : [];
			this.setState({ headers, rows });
		}
	}

	render() {
		return (
			<div>
				<Table striped bordered hover>
					<thead>
					<tr>
						{this.state.headers.map((h, idx) => (
							<th key={idx}>{h}</th>
						))}
					</tr>
					</thead>
					<tbody>
					{this.state.rows.map((item, idx) => (
						<tr key={idx}>
							{Object.values(item).map((val, idxVal) => (
								<td key={idxVal}>{`${val}`}</td>
							))}
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		);
	}
}

// this function defines which of the redux store items we want,
// and the return value returns them as props to our component
function mapStateToProps({ auth }) {
	return {
		authToken: auth.token,
	};
}

// connects this component to the redux store.
export default connect(mapStateToProps)(withParams(Data));
