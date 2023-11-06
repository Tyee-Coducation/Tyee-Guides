"use client"
import React, { useState } from 'react';
import guidesData from './guides.json';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [randomGuide, setRandomGuide] = useState(null);

  const filteredGuides = guidesData.filter((guide) =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomGuide = () => {
    const randomIndex = Math.floor(Math.random() * filteredGuides.length);
    setRandomGuide(filteredGuides[randomIndex]);
  };

  const navigateToGuide = (guideId) => {
    window.location.href = `/guides/${guideId}`;
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search guides"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="border p-4 cursor-pointer" onClick={() => navigateToGuide(guide.id)}>
            <div className="bg-gray-100 p-3 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
              <p>{guide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={getRandomGuide}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Random Guide
        </button>
        {randomGuide && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Random Guide:</h3>
            <div className="bg-gray-100 p-3 rounded-lg cursor-pointer" onClick={() => navigateToGuide(randomGuide.id)}>
              <p>{randomGuide.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;
