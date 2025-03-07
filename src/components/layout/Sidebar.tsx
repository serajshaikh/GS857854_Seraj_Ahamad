import { NavLink } from "react-router-dom";
import { FiDatabase, FiBox, FiGrid, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-40 pt-16 bg-white text-gray-700 h-screen border-gray-300">
      <nav>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/stores"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-gray-200 text-gray-700 shadow-none" : "hover:bg-gray-100"
                }`
              }
            >
              <FiDatabase className="mr-2" />
              Stores
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/skus"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-gray-200 text-gray-700 shadow-none" : "hover:bg-gray-100"
                }`
              }
            >
              <FiBox className="mr-2" />
              SKU
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/planning"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-gray-200 text-gray-700 shadow-none" : "hover:bg-gray-100"
                }`
              }
            >
              <FiGrid className="mr-2" />
              Planning
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/charts"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-gray-200 text-gray-700 shadow-none" : "hover:bg-gray-100"
                }`
              }
            >
              <FiBarChart2 className="mr-2" />
              Charts
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
