import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function InvoiceForm({ handleCloseCreateForm, onCreate }) {
  const [formData, setFormData] = useState({
    itemId: '',
    itemName: '',
    customerName: '', 
    price: '',
    tax: '',
    date: new Date(), 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.itemId || !formData.itemName || !formData.customerName || !formData.price || !formData.tax) {
      alert('Please fill all fields');
      return;
    }

    navigate('/');

    onCreate(formData)
      .then(() => {
        alert('Invoice added successfully!');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating invoice:', error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-slate-200 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemId" className="block font-semibold mb-1">
              Item ID
            </label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemName" className="block font-semibold mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerName" className="block font-semibold mb-1">
              Customer Name 
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-black"
            /> 
          </div>
          <div className="mb-4">
            <label htmlFor="tax" className="block font-semibold mb-1">
              Tax
            </label>
            <input
              type="number"
              id="tax"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold mb-1">
              Date
            </label>
            <DatePicker
              id="date"
              name="date"
              selected={formData.date}
              onChange={handleDateChange}
              className="w-full border-gray-300 border rounded-md px-3 py-2 text-neutral-950"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Create
            </button>
            <button
              type="button"
              onClick={handleCloseCreateForm}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
