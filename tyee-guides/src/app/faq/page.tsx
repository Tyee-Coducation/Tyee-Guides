"use client";
import { useState } from 'react';

const FaqPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: 'Is Tyee a good School',
      answer: 'Yes'
    },
    {
      id: 2,
      question: 'I dont have a Github Account',
      answer: 'We are currenty working a fix for other types of login, for now you might as well make one.'
    },
    {
      id: 3,
      question: 'I got false banned. What do i do?',
      answer: 'We only ban users when we are 100% sure they violate our TOS. If you think you have been false banned please email us at tyeeguides@gmail.com'
    }
  ];

  const toggleQuestion = (id) => {
    if (openQuestion === id) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(id);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 gap-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-white rounded-lg shadow-md p-4">
            <button
              onClick={() => toggleQuestion(q.id)}
              className="w-full flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-semibold">{q.question}</span>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openQuestion === q.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openQuestion === q.id && (
              <div className="mt-4">
                <p>{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
