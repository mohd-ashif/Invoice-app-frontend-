import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import axios from 'axios';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoice/get-invoice`, { withCredentials: true });
      
      setInvoices(response.data); 
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredInvoices = searchQuery 
    ? invoices.filter(invoice =>  invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    : invoices;
  
  return (
    <> 
      <Navbar onSearch={handleSearch} /> 
      <div className='list-form'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4">Invoice List</h2>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-left bg-gray-200">
                  <th className="px-4 py-3">Invoice No.</th>
                    <th className="px-4 py-3">Customer Name</th>
                    <th className="px-4 py-3">Item </th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Tax</th>
                    <th className="px-4 py-3">Grand Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-100">
                       <td className="px-4 py-3">{invoice.itemId}</td>
                       <td className="px-4 py-3">{invoice.customerName}</td>
                      <td className="px-4 py-3">{invoice.itemName}</td>
                      <td className="px-4 py-3">{invoice.date?.slice(0, 10)}</td>

                      <td className="px-4 py-3">{invoice.price}</td>
                      <td className="px-4 py-3">{invoice.tax}</td>
                      <td className="px-4 py-3">{invoice.subTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceList;
