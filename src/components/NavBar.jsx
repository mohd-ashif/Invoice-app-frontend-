import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceForm from './InvoiceForm.jsx';
import axios from 'axios';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/invoice/create-invoice`, formData, { withCredentials: true }); 
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCreateInvoice = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-white">
              Invoice App
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative mr-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-2 mr-3 text-white"
              >
                Search
              </button>
            </div>
            <button
              onClick={handleCreateInvoice}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md" 
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
      <div className="form">
        {showCreateForm && (
          <InvoiceForm
            onCreate={handleFormSubmit}
            handleCloseCreateForm={handleCloseCreateForm}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
