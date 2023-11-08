"use client";
import { FaEnvelope, FaCoffee } from 'react-icons/fa';

const Contact = () => {
  const xAccountLink = "https://twitter.com/TyeeGuides"
  const buyMeACoffeeLink = "https://www.buymeacoffee.com/tyeeguides"

  const redirectToXAccount = () => {
    window.location.href = xAccountLink;
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-6 bg-white shadow-md rounded-md">
        <div className="text-2xl font-bold mb-4">Contact Information</div>

        <div className="flex items-center space-x-4 mb-4 cursor-pointer" onClick={redirectToXAccount}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="text-blue-500 cursor-pointer"
          >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </svg>
          <span className="cursor-pointer">X</span>
        </div>

        <a
          href={buyMeACoffeeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 mb-4 text-brown-500 hover:text-brown-700"
        >
          <FaCoffee className="text-brown-500" />
          <span>Buy me a Coffee</span>
        </a>

        <a
          href="mailto:tyeeguides@gmail.com"
          className="flex items-center space-x-4 cursor-pointer"
        >
          <FaEnvelope className="text-red-500" />
          <span className="cursor-pointer">Email: Tyeeguides@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
