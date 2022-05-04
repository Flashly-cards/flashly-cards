export default function Card() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          FLIP
        </button>
        {/* We use less vertical padding on card headers on desktop than on body sections */}
      </div>
      <div className="px-4 py-5 sm:p-6">CARD CONTENT</div>
      <div className="px-4 py-4 sm:px-6">
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
        1/20
        FRONT / BACK
      </div>
    </div>
  );
}
