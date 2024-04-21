import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Navbar toggle button */}
      <button
        className="block lg:hidden px-2 py-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
        onClick={toggleNavbar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12"></path>
          ) : (
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          )}
        </svg>
      </button>

      {/* Navbar content */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div ref={ref} className="lg:flex lg:items-center lg:w-auto">
            {/* Navbar links */}
            <nav>
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Header;
