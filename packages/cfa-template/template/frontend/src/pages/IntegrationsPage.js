import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import { List } from '../components/Integration';
import { Filter } from '../components/Integration';
import { CategoryContext } from '../contexts/CategoryContext';
import config from '../frigg.config';

function IntegrationsPage() {
  const authToken = useSelector(({ auth }) => auth.token);
  const [selectedCategory, setCategory] = useState('Recently added');

  useEffect(() => {
    const jwt = authToken || sessionStorage.getItem('jwt');
    if (!jwt) {
      redirect('/logout');
    }
  }, []);

  const listContainerStyle = {
    'default-horizontal': 'xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-6',
    'default-vertical': 'xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-6',
    'default-row': 'auto-rows-max xl:grid-cols-1 2xl:grid-cols-1',
  };

  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700">Integrations</h2>
        <CategoryContext.Provider value={{ selectedCategory, setCategory }}>
          <div className="grid mb-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <Filter />
            <div className={`grid gap-6 lg:col-span-1 lg:grid-cols-1 xl:col-span-2 2xl:col-span-3 ${listContainerStyle[config.componentLayout]}`}>
              <List />
            </div>
          </div>
        </CategoryContext.Provider>
      </div>
    </main>
  );
}

export default IntegrationsPage;
