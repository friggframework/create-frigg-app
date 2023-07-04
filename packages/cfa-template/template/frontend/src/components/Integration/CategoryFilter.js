import { React, useState } from 'react';

function CategoryFilter() {
    const [integrationType, setIntegrationType] = useState('Recently added');

    const categories = [
        { _id: 1, slug: 'recently-added', name: 'Recently added' },
        { _id: 2, slug: 'marketing', name: 'Marketing' },
        { _id: 3, slug: 'sales-and-crm', name: 'Sales & CRM' },
        { _id: 4, slug: 'commerce', name: 'Commerce' },
        { _id: 5, slug: 'social', name: 'Social' },
        { _id: 6, slug: 'productivity', name: 'Productivity' },
        { _id: 7, slug: 'finance', name: 'Finance' },
        { _id: 8, slug: 'installed', name: 'Installed' },
    ];
    const filterIntegration = (type) => {
        setIntegrationType(type);
    };

    return (
        <ul className="col-span-1 pl-10 xs:inline-flex">
            {categories.map((category) => (
                <li
                    key={category._id}
                    className="mb-4 text-lg font-semibold text-gray-600 cursor-pointer mr-2 sm:inline md:block"
                    onClick={() => {
                        filterIntegration(category.name);
                    }}
                >
                    <span className={integrationType == category.name ? 'border-b-4 border-purple-600' : ''}>
                        {category.name}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default CategoryFilter;
