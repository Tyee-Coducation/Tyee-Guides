"use client";
import React, { useState } from 'react';
import classesData from './classes.json';
import { FaTimes } from 'react-icons/fa'; // Importing close icon from react-icons
import Image from 'next/image';

const ClassList: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleClick = (classData: any) => {
    setSelectedClass(classData);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Classes Information</h1>
      <div className="flex flex-wrap justify-start">
        {classesData.map((classData: any, index: number) => (
          <div
            key={index}
            className={`group rounded-lg p-4 m-4 bg-white shadow-md flex items-center transition-transform transform-gpu hover:scale-105 ${
              classData.recommended ? 'border border-green-500' : 'border border-red-500'
            }`}
            style={{ width: '300px' }} // To maintain fixed width for each box
            onClick={() => handleClick(classData)}
          >
            <Image
              src={classData.imageURL}
              alt={classData.className}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">{classData.className}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              {selectedClass.className} Details
              <button className="absolute top-2 right-2" onClick={closeModal}>
                <FaTimes />
              </button>
            </h2>
            <div>
              <h4 className="text-lg font-semibold mb-2">Pros:</h4>
              <ul>
                {selectedClass.pros.map((pro: string, index: number) => (
                  <li key={index}>- {pro}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">Cons:</h4>
              <ul>
                {selectedClass.cons.map((con: string, index: number) => (
                  <li key={index}>- {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
