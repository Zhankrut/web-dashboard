import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside
      className="flex flex-col justify-between w-80 min-h-screen border border-gray-200 z-10 shadow-lg"
      style={{
        background:
          "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
        color: "#3e67c8",
      }}
    >
      <div className="py-3 text-center border-b-2 border-gray-200">
        <NavLink to="/">
          <img
            src="src/assets/images/logo.png"
            alt="Logo"
            className="mx-auto h-auto w-20"
          />
        </NavLink>
      </div>

      <nav className="text-sm h-full text-[#3e67c8]">
        <ul className="flex flex-col">
<<<<<<< HEAD
          <li className="px-4 cursor-pointer hover:bg-gray-700  hover:text-white">
            <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to="/">
              <scan className="py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" className="w-4 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
=======
          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/"
            >
              <span className="py-3 flex items-center">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
                </svg>
                Dashboard
              </span>
            </NavLink>
          </li>
<<<<<<< HEAD
          <li className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">USER MANAGEMENT</li>
          <li className="px-4 cursor-pointer hover:bg-gray-700">
            <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to="/vulnerability-scan">
              <scan className='py-3 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" className="w-4 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
=======

          <li className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#3e67c8]">
            User Management
          </li>

          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/vulnerability-scan"
            >
              <span className="py-3 flex items-center">
                {/* Icon */}
                {/* ... keep SVG unchanged */}
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
                Vulnerability Scan
              </span>
            </NavLink>
          </li>
<<<<<<< HEAD
          <li className="cursor-pointer hover:bg-gray-700">
            <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to='/honeypot-monitor'>
              <scan className='px-4 py-3 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" className="w-4 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Monitor honeypot
              </scan>
            </NavLink>
          </li>
          <li className="px-4 cursor-pointer hover:bg-gray-700">
            <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to="/password-manager">
              <scan className="py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" className="w-4 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
=======

          <li className="cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/honeypot-monitor"
            >
              <span className="px-4 py-3 flex items-center">
                {/* Icon */}
                {/* ... keep SVG unchanged */}
                Monitor Honeypot
              </span>
            </NavLink>
          </li>

          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/password-manager"
            >
              <span className="py-3 flex items-center">
                {/* Icon */}
                {/* ... keep SVG unchanged */}
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
                Password Manager
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

<<<<<<< HEAD
      <div className='mt-auto'>
        <div className='px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold'>Profile & Settings</div>
        <div className=" py-3 text-sm text-center bg-gray-800 border-b-2 border-gray-800 text-gray-300">
          <ul className='flex flex-col'>
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to="/profile">
                <scan className="py-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="w-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
=======
      <div className="mt-auto">
        <div className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#3e67c8]">
          Profile & Settings
        </div>
        <div className="py-3 text-sm text-center text-[#3e67c8] border-t border-gray-200">
          <ul className="flex flex-col">
            <li className="px-4 cursor-pointer hover:bg-gray-100">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
                }
                to="/profile"
              >
                <span className="py-3 flex items-center">
                  {/* Icon */}
                  {/* ... keep SVG unchanged */}
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
                  Profile
                </span>
              </NavLink>
            </li>
<<<<<<< HEAD
            <li className="px-4 cursor-pointer hover:bg-gray-700">
              <NavLink className={({ isActive }) => (isActive ? "text-white font-bold" : "")} to="/settings">
                <scan className="py-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="w-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
=======
            <li className="px-4 cursor-pointer hover:bg-gray-100">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
                }
                to="/settings"
              >
                <span className="py-3 flex items-center">
                  {/* Icon */}
                  {/* ... keep SVG unchanged */}
>>>>>>> dd7f776a1725058d6e4c658b943d7543a5af8a3f
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
