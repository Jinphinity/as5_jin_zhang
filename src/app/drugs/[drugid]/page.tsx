// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import Link from 'next/link';

interface Drug {
  id: string;
  companyName: string;
  drugName: string;
  fdaNdcCode: string;
}

// Generate static params for the first 100 drugs
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:4000/drugs');
    if (!response.ok) {
      return [];
    }
    
    const drugs: Drug[] = await response.json();
    
    // Take only the first 100 drugs or less
    const firstHundred = drugs.slice(0, 100);
    
    return firstHundred.map((drug) => ({
      drugid: drug.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getDrug(drugid: string): Promise<Drug | null> {
  try {
    const response = await fetch(`http://localhost:4000/drugs/${drugid}`, {
      next: { revalidate: 60 } // Time-based revalidation every 60 seconds
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

export default async function DrugDetailPage({ params }: Props) {
  const { drugid } = await params;
  const drug = await getDrug(drugid);

  if (!drug) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Drug Not Found</h1>
        <p className="text-gray-600 mb-6">
          No drug with ID &quot;{drugid}&quot; exists in our database.
        </p>
        <Link
          href="/drugs"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 inline-block font-medium"
        >
          back
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/drugs"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 inline-block text-sm font-medium"
        >
          back
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Drug Details</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-700 bg-blue-100">
                ID
              </td>
              <td className="px-6 py-4 text-gray-800">
                {drug.id}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4 font-semibold text-gray-700 bg-blue-100">
                Drug Company Name
              </td>
              <td className="px-6 py-4 text-gray-800">
                {drug.companyName}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-700 bg-blue-100">
                Drug Name
              </td>
              <td className="px-6 py-4 text-gray-800 font-medium">
                {drug.drugName}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4 font-semibold text-gray-700 bg-blue-100">
                FDA NDC Code
              </td>
              <td className="px-6 py-4 text-gray-800 font-mono">
                {drug.fdaNdcCode}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700">
          <strong>Note:</strong> This page was statically generated for improved performance.
        </p>
      </div>
    </div>
  );
}