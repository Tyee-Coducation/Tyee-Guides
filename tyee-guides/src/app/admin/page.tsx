"use client";
import { useState } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Modal from 'react-modal';

type User = {
  "user client";
  username: string;
  // Add any other user properties here
};

export default function About() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState<boolean>(false);

  const handleBanClick = (username: string) => {
    setSelectedUser(username);
    setIsBanModalOpen(true);
  };

  const handleAwardClick = (username: string) => {
    setSelectedUser(username);
    setIsAwardModalOpen(true);
  };

  const handleBan = () => {
    // Perform ban action using the selected user (selectedUser)
    setIsBanModalOpen(false);
  };

  const handleAward = (selectedAward: string) => {
    // Perform award action using the selected user (selectedUser) and the award (selectedAward)
    setIsAwardModalOpen(false);
  };

  // Sample user data - replace this with your actual user data
  const users: User[] = [
    { username: 'User 1' },
    // Add more users...
  ];

  return (
    <>
      <Navbar />

      <div className="flex h-screen">
        {/* Left Navigation Section */}
        <div className="bg-gray-800 text-gray-100 w-64 flex-shrink-0">
          {/* Navigation items */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Navigation</h1>
            <ul>
              <li>Dashboard</li>
              <li>Users</li>
              <li>Settings</li>
            </ul>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            {/* User Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md px-2 py-1 mb-4"
            />

            {/* User List */}
            <ul>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <li key={user.username} className="py-2">
                    <span>{user.username}</span>
                    <button
                      onClick={() => handleBanClick(user.username)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Ban
                    </button>
                    <button
                      onClick={() => handleAwardClick(user.username)}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Award
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      {/* Ban Modal */}
      <Modal
        isOpen={isBanModalOpen}
        onRequestClose={() => setIsBanModalOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Ban {selectedUser}</h2>
        <button onClick={handleBan} className="bg-red-500 text-white px-4 py-2 rounded">
          Ban {selectedUser}
        </button>
      </Modal>

      {/* Award Modal */}
      <Modal
        isOpen={isAwardModalOpen}
        onRequestClose={() => setIsAwardModalOpen(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Award {selectedUser}</h2>
        <div>
          {/* Award options */}
          <button onClick={() => handleAward('Award 1')} className="bg-blue-500 text-white px-4 py-2 rounded m-2">
            Award 1
          </button>
          <button onClick={() => handleAward('Award 2')} className="bg-green-500 text-white px-4 py-2 rounded m-2">
            Award 2
          </button>
          {/* Add more award options... */}
        </div>
      </Modal>
    </>
  );
}
