import React from 'react';

const GuidePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4 p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Outside Learning</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">What is it</h2>
          <p className="text-lg text-gray-700">
            Outside Learning is when you learn
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Section 2</h2>
          <p className="text-lg text-gray-700">
            Text describing the content of Section 2 goes here. 
            You can include paragraphs, information, and details about this section.
          </p>
        </div>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default GuidePage;
