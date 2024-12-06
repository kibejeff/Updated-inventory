import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, LayoutDashboard, Users, LogOut, Settings, History, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/inventory" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
              <Package size={20} />
              <span>Inventory</span>
            </Link>
            {user?.role === 'admin' && (
              <>
                <Link to="/workers" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                  <Users size={20} />
                  <span>Workers</span>
                </Link>
                <Link to="/categories" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                  <Settings size={20} />
                  <span>Categories</span>
                </Link>
              </>
            )}
            <Link to="/checkout-history" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
              <History size={20} />
              <span>Checkout History</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
              <User size={20} />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}