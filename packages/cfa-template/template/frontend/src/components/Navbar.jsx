import React from 'react';
import { SearchIcon, BellIcon } from 'lucide-react';
import { withRouter } from 'react-router-dom';
import { Input } from './ui/input';

function Navbar() {
  return (
    <>
      <header className="z-10 py-4 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-primary">
          <div className="flex justify-center flex-1 lg:mr-32">
            <div className="relative w-full max-w-xl mr-6">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" />
              </div>
              <Input
                className="w-full pl-8 pr-2 text-gray-700"
                type="text"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </div>
          <ul className="flex items-center flex-shrink-0 space-x-6">
            <li className="relative">
              <button
                className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <BellIcon className="w-5 h-5" />
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"
                ></span>
              </button>
            </li>
            <li className="relative">
              <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                aria-label="Account"
                aria-haspopup="true"
              >
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://friggframework.org/assets/img/frigg-favicon.svg"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
export default withRouter(Navbar);
