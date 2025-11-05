// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import Link from 'next/link';
import { deleteDrug } from './actions';

interface Drug {
  id: string;
  companyName: string;
  drugName: string;
  fdaNdcCode: string;
}

async function getDrugs(): Promise<Drug[]> {
  try {
    const response = await fetch('http://localhost:4000/drugs', {
      cache: 'no-store' // No cache for admin page to always show fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch drugs');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching drugs:', error);
    return [];
  }
}

export default async function AdminPage() {
  const drugs = await getDrugs();

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Drug Administration</h1>
      
      <p className="text-gray-600 mb-6">
        Manage drug information: create new entries, edit existing drugs, or delete outdated records.
      </p>

      <div className="mb-6">
        <Link
          href="/admin/create"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 inline-block font-medium"
        >
          create new
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-4 text-left font-semibold">ID</th>
              <th className="px-4 py-4 text-left font-semibold">Drug Company</th>
              <th className="px-4 py-4 text-left font-semibold">Drug Name</th>
              <th className="px-4 py-4 text-left font-semibold">FDA NDC Code</th>
              <th className="px-4 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drugs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No drugs available. Make sure the JSON server is running on port 4000.
                </td>
              </tr>
            ) : (
              drugs.map((drug, index) => (
                <tr 
                  key={drug.id} 
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  <td className="px-4 py-4 text-gray-800 font-mono text-sm">
                    {drug.id}
                  </td>
                  <td className="px-4 py-4 text-gray-800">
                    {drug.companyName}
                  </td>
                  <td className="px-4 py-4 text-gray-800 font-medium">
                    {drug.drugName}
                  </td>
                  <td className="px-4 py-4 text-gray-800 font-mono text-sm">
                    {drug.fdaNdcCode}
                  </td>
                  <td className="px-4 py-4 space-x-2">
                    <Link
                      href={`/admin/edit/${drug.id}`}
                      className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition-colors duration-200 inline-block text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <form action={deleteDrug} method="post" className="inline">
                      <input type="hidden" name="drugId" value={drug.id} />
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          <strong>Warning:</strong> Changes made here will directly affect the drug database. 
          Use caution when editing or deleting entries.
        </p>
      </div>
    </div>
  );
}
