import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { PuzzleIcon, LogOutIcon, SlidersVertical } from 'lucide-react';
import { logoutUser } from '../actions/logout';

function Sidebar({ logoutUser }) {
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
      <div className="py-4 text-gray-500">
        <Link
          className="ml-6 text-2xl font-bold text-primary inline-flex"
          to="/apps"
        >
          <span className="ml-2">
            <img
              src={`https://friggframework.org/assets/img/frigg-favicon.svg`}
              alt="Logo"
              style={{ width: 90 }}
            />
          </span>
        </Link>
        <ul className="mt-6">
          <li className="relative">
            <NavLink
              to="/integrations"
              className="px-6 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
              activeClassName="text-gray-800 border-l-8 border-primary"
            >
              <PuzzleIcon className="w-5 h-5" />
              <span className="ml-4">Integrations</span>
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              to="/settings"
              className="px-6 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
              activeClassName="text-gray-800 border-l-8 border-primary"
            >
              <SlidersVertical className="w-5 h-5" />
              <span className="ml-4">Settings</span>
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              to="/logout"
              className="px-6 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
            >
              <LogOutIcon className="w-5 h-5" />
              <span className="ml-4">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default connect(null, { logoutUser })(Sidebar);
