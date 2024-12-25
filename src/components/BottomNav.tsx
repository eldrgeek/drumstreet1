import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusCircle, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}