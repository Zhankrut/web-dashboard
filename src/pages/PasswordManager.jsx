import React from 'react';

function PasswordManager() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Password Manager</h1>
      
      <nav className='bg-purple-200 p-2 rounded'>
        <ul className="space-x-4 flex">
          <li><a href="#" className="text-blue-700 hover:underline">Home</a></li>
          <li><a href="#" className="text-blue-700 hover:underline">About</a></li>
          <li><a href="#Contact" className="text-blue-700 hover:underline">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default PasswordManager;
