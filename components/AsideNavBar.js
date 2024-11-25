import React from "react";
import Link from "next/link"; // Importing Link from Next.js

const AsideNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="flex justify-center items-center h-16 bg-gray-900">
        <h1 className="text-2xl font-bold">Hive Club</h1>
      </div>

      <div className="flex-grow mt-6 px-4">
        <ul>
          {/* Home Link */}
          <li>
            <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
              Home
            </Link>
          </li>

          {/* Dashboard Link */}
          <li>
            <Link href="/admin-dashboard" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
              Dashboard
            </Link>
          </li>

          {/* Events Link */}
          <li>
            <Link href="/admin-events" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
              Events
            </Link>
          </li>

          {/* Members Link */}
          <li>
            <Link href="/admin-members" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
              Members
            </Link>
          </li>

          {/* Settings Link */}
          <li>
            <Link href="/admin-settings" className="block py-2 px-4 rounded hover:bg-gray-700 transition">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center items-center bg-gray-900 py-4 mt-auto">
        <p className="text-sm text-gray-400">© 2024 Hive Club</p>
      </div>
    </div>
  );
};

export default AsideNavbar;
