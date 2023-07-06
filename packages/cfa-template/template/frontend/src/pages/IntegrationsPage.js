import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { List } from '../components/Integration';
import { Filter } from '../components/Integration';
import { CategoryContext } from '../contexts/CategoryContext';

function IntegrationsPage(props) {
  const [selectedCategory, setCategory] = useState('Recently added');

	useEffect(() => {
		const jwt = props.authToken || sessionStorage.getItem('jwt');
		if (!jwt) {
			props.history.push('/logout');
		}
	}, []);

	return (
		<main className="h-full pb-16 overflow-y-auto">
			<div className="container px-6 mx-auto grid">
				<h2 className="my-6 text-2xl font-semibold text-gray-700">Integrations</h2>
        <CategoryContext.Provider value={{ selectedCategory, setCategory }}>
          <div className="grid mb-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <Filter />
            <div className="grid gap-6 lg:col-span-1 lg:grid-cols-1 xl:col-span-2 xl:grid-cols-2 2xl:col-span-3 2xl:grid-cols-3 2xl:grid-rows-6">
              <List />
            </div>
          </div>
        </CategoryContext.Provider>
			</div>
		</main>
	);
}

function mapStateToProps({ auth }) {
	return {
		authToken: auth.token,
	};
}

export default connect(mapStateToProps)(IntegrationsPage);
