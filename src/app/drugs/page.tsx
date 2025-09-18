// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import Link from 'next/link';

interface Drug {
  id: string;
  companyName: string;
  drugName: string;
  fdaNdcCode: string;
}

async function getDrugs(): Promise<Drug[]> {
  try {
    const response = await fetch('http://localhost:4000/drugs', {
      next: { revalidate: 60 } // Time-based revalidation every 60 seconds
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

export default async function DrugsPage() {
  const drugs = await getDrugs();

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Drug Directory</h1>
      
      <p className="text-gray-600 mb-6">
        Browse our comprehensive database of pharmaceutical drugs. Click &quot;more&quot; for detailed information about each drug.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Drug Company</th>
              <th className="px-6 py-4 text-left font-semibold">Drug Name</th>
              <th className="px-6 py-4 text-left font-semibold">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drugs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
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
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {drug.companyName}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {drug.drugName}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/drugs/${drug.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 inline-block text-sm font-medium"
                    >
                      more
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> This page automatically refreshes every 60 seconds to show the latest data.
        </p>
      </div>
    </div>
  );
}