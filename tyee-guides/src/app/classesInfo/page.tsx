"use client";
import React, { useState } from 'react';
import classesData from './classes.json';
import { FaTimes } from 'react-icons/fa'; // Importing close icon from react-icons

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
      <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
      <p>This course list only contains elective classes, not including non-selectable classes</p>
      </div>
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
