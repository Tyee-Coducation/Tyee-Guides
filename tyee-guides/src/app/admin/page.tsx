"use client";
import { useState } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Swal from 'sweetalert2';

type User = {
  username: string;
  // Add any other user properties here
};

export default function About() {
  "use client";
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleBanClick = (username: string) => {
    setSelectedUser(username);
    Swal.fire({
      title: `Ban ${username}`,
      input: 'text',
      inputPlaceholder: `Enter reason for banning ${username}...`,
      showCancelButton: true,
      confirmButtonText: 'Ban',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        // Perform ban action using the selected user (username) and the reason
        return new Promise<void>((resolve) => {
          // Simulate API call or perform actions here
          setTimeout(() => {
            // Perform ban action here with the 'username' and 'reason'
            Swal.fire(`Banned ${username} for reason: ${reason}`);
            resolve();
          }, 1500); // Simulating a delay
        });
      },
    });
  };

  const handleAwardClick = (username: string) => {
    setSelectedUser(username);
    Swal.fire({
      title: `Award ${username}`,
      html: `
        <select id="awardSelect" class="swal2-select">
          <option value="award1">Award 1</option>
          <option value="award2">Award 2</option>
          <!-- Add more award options... -->
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Award',
      preConfirm: () => {
        const selectElement = document.getElementById('awardSelect') as HTMLSelectElement;
        const selectedAward = selectElement.value;
        // Perform award action using the selected user (username) and the selected award
        Swal.fire(`Awarded ${username} with: ${selectedAward}`);
      },
    });
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
        <div className="bg-gray-800 text-gray-100 w-64 flex-shrink-0 p-4">
          {/* Navigation items with increased spacing */}
          <h1 className="text-2xl font-bold mb-6">Navigation</h1>
          <ul>
            <li className="mb-3">Dashboard</li>
            <li className="mb-3">Users</li>
            <li className="mb-3">Settings</li>
          </ul>
        </div>

        {/* Dashboard Section */}
        <div className="flex-1 overflow-y-auto p-8">
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

      <Footer />
    </>
  );
}
