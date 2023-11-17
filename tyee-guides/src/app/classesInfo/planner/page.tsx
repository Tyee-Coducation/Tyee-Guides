"use client";
import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

interface CourseSelectionPageProps {

}

const CourseSelectionPage: React.FC<CourseSelectionPageProps> = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showProgrammingAlert, setShowProgrammingAlert] = useState(false);

  const handleCourseSelection = (course: string) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
      if (course === 'Programming') {
        setShowProgrammingAlert(true);
      }
    } else {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
      if (course === 'Programming') {
        setShowProgrammingAlert(false);
      }
    }
  };

  const courses: { name: string, hasAlert: boolean }[] = [
    { name: 'CTE', hasAlert: false },
    { name: 'Music', hasAlert: false },
    { name: 'AVID', hasAlert: false },
    { name: 'Programming', hasAlert: true },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Select Your Preferred Topics</h1>
        <div className="grid grid-cols-2 gap-4">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => handleCourseSelection(course.name)}
              className={`p-4 border rounded-lg cursor-pointer transform transition-all duration-300 ${
                selectedCourses.includes(course.name) ? 'bg-blue-200 shadow-md scale-105' : 'bg-gray-200 shadow-sm'
              }`}
            >
              <p className="text-lg flex items-center">
                {selectedCourses.includes(course.name) && (
                  <FiCheck className="mr-2 text-green-500" />
                )}
                {course.name}
              </p>
              {course.name === 'Programming' && course.hasAlert && selectedCourses.includes('Programming') && (
                <div className="mt-4 overflow-hidden transition-all duration-500">
                  <div className={`bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 ${showProgrammingAlert ? 'max-h-32' : 'max-h-0'} overflow-hidden`} role="alert">
                    <p className="font-bold">Be Warned</p>
                    <p>Programming Classes are not that good at Tyee</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-lg font-bold">Selected Topics:</p>
          {selectedCourses.length === 0 ? (
            <p className="italic">No topics selected</p>
          ) : (
            <ul>
              {selectedCourses.map((course, index) => (
                <li key={index} className="mt-2">{course}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          onClick={() => {
            // Handle 'Next' button functionality
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseSelectionPage;
