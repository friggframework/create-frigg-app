import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PuzzleIcon, AdjustmentsIcon, LogoutIcon } from '@heroicons/react/outline';
import config from '../frigg.config';

const defaultLinkStyle = "px-6 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800";
const activeLinkStyle = "text-gray-800 border-l-8 border-purple-600";

function Sidebar() {
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
      <div className="py-4 text-gray-500">
        <Link className="ml-6 text-2xl font-bold text-purple-600 inline-flex" to="/apps">
          <span className="ml-2">{config.appDisplayName}</span>
        </Link>
        <ul className="mt-6">
          <li className="relative">
            <NavLink
              to="/integrations"
              className={({ isActive }) => isActive ? `${defaultLinkStyle} ${activeLinkStyle}` : defaultLinkStyle}
            >
              <PuzzleIcon className="w-5 h-5" />
              <span className="ml-4">Integrations</span>
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              to="/settings"
              className={({ isActive }) => isActive ? `${defaultLinkStyle} ${activeLinkStyle}` : defaultLinkStyle}
            >
              <AdjustmentsIcon className="w-5 h-5" />
              <span className="ml-4">Settings</span>
            </NavLink>
          </li>
          <li className="relative">
            <NavLink
              to="/logout"
              className="px-6 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
            >
              <LogoutIcon className="w-5 h-5" />
              <span className="ml-4">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
