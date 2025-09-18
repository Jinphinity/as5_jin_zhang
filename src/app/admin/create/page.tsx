// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { createDrug } from '../actions';

export default function CreateDrugPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Drug</h1>
      
      <p className="text-gray-600 mb-6">
        Add a new drug to the database by filling out all the required fields below.
      </p>

      <form action={createDrug} className="space-y-6">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
            ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter unique drug ID"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Drug Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter pharmaceutical company name"
          />
        </div>

        <div>
          <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-2">
            Drug Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="drugName"
            name="drugName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter drug name"
          />
        </div>

        <div>
          <label htmlFor="fdaNdcCode" className="block text-sm font-medium text-gray-700 mb-2">
            FDA NDC Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fdaNdcCode"
            name="fdaNdcCode"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter FDA NDC code (e.g., 0071-0155)"
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Create Drug
          </button>
          
          <a
            href="/admin"
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium inline-block text-center"
          >
            Cancel
          </a>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> All fields are required. Make sure to use a unique ID that doesn&apos;t already exist in the database.
        </p>
      </div>
    </div>
  );
}