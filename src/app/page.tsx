// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

export default function Home() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Drug Management System
        </h1>

        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
          <p>
            This application allows you to browse and manage pharmaceutical drug information
            using a modern Next.js application built entirely with Server Components and Server Actions.
          </p>

          <p>Use the navigation above to:</p>

          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <ul className="space-y-3 text-left list-disc list-inside text-gray-700">
              <li>
                <strong>Drugs:</strong> View all available drugs in a detailed table format.
              </li>
              <li>
                <strong>Admin:</strong> Add, edit, and delete drug information.
              </li>
            </ul>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Built with Next.js 15, TypeScript, and Server Components
          </p>
        </div>
      </div>
    </div>
  );
}
