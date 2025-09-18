// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { updateDrug } from '../../actions';
import { notFound } from 'next/navigation';

interface Drug {
  id: string;
  companyName: string;
  drugName: string;
  fdaNdcCode: string;
}

async function getDrug(drugid: string): Promise<Drug | null> {
  try {
    const response = await fetch(`http://localhost:4000/drugs/${drugid}`, {
      cache: 'no-store' // No cache for edit page to always show fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching drug:', error);
    return null;
  }
}

interface Props {
  params: Promise<{
    drugid: string;
  }>;
}

export default async function EditDrugPage({ params }: Props) {
  const { drugid } = await params;
  const drug = await getDrug(drugid);

  if (!drug) {
    return notFound();
  }

  const updateDrugWithId = updateDrug.bind(null, drugid);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Drug</h1>
      
      <p className="text-gray-600 mb-6">
        Update the information for <strong>{drug.drugName}</strong> (ID: {drug.id}).
      </p>

      <form action={updateDrugWithId} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID
          </label>
          <input
            type="text"
            value={drug.id}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <p className="text-sm text-gray-500 mt-1">ID cannot be edited</p>
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Drug Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            defaultValue={drug.companyName}
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
            defaultValue={drug.drugName}
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
            defaultValue={drug.fdaNdcCode}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter FDA NDC code (e.g., 0071-0155)"
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Update Drug
          </button>
          
          <a
            href="/admin"
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium inline-block text-center"
          >
            Cancel
          </a>
        </div>
      </form>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          <strong>Note:</strong> All fields except ID can be edited. Changes will be saved to the database immediately upon submission.
        </p>
      </div>
    </div>
  );
}