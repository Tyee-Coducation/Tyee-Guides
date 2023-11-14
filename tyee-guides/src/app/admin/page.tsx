"use client";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type User = {
  username: string;
};

export default function About() {
  "use client";
  const className = useRef(null);
  const classInfo = useRef(null);
  const classTeacher = useRef(null);
  const classRoom = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: session } = useSession();
  if (
    session?.user?.email !== "lockemaximus@yahoo.com" &&
    session?.user?.email !== "pineappletwo1@gmail.com"
  ) {
    return <h1>No Access</h1>;
  }

  async function submit() {
    const res = await fetch("/api/newClass", {
      method: "POST",
      body: JSON.stringify({
        name: className?.current?.value,
        teacher: classTeacher?.current?.value,
        classInfo: classInfo?.current?.value,
        classRoom: classRoom?.current?.value,
      }),
    });
    const json = await res.json();
    alert(json.message);
  }

  const handleBanClick = (username: string) => {
    setSelectedUser(username);
    Swal.fire({
      title: `Ban ${username}`,
      input: "text",
      inputPlaceholder: `Enter reason for banning ${username}...`,
      showCancelButton: true,
      confirmButtonText: "Ban",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        // Perform ban action using the selected user (username) and the reason
        return new Promise<void>((resolve) => {
          // Simulate API call or perform actions here
          setTimeout(() => {
            // Perform ban action here with the 'username' and 'reason'
            Swal.fire(`Banned ${username} for reason: ${reason}`);
            resolve();
          }, 1500);
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
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Award",
      preConfirm: () => {
        const selectElement = document.getElementById(
          "awardSelect"
        ) as HTMLSelectElement;
        const selectedAward = selectElement.value;
        Swal.fire(`Awarded ${username} with: ${selectedAward}`);
      },
    });
  };

  const users: User[] = [
    // import from database
  ];

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-gray-800 text-gray-100 w-64 flex-shrink-0 p-4">
          <h1 className="text-2xl font-bold mb-6">Navigation</h1>
          <ul>
            <li className="mb-3">Dashboard</li>
            <li className="mb-3">Users</li>
            <li className="mb-3">Settings</li>
          </ul>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md px-2 py-1 mb-4"
          />

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
          <h1 className="text-4xl">Add Class</h1>
          <form onSubmit={submit}>
            <div className="flex flex-col space-y-4">
              <label className="font-bold text-lg">Class Name</label>
              <input
                type="text"
                ref={className}
                className="border-2 border-gray-300 p-2 rounded-md"
                required={true}
              />

              <label className="font-bold text-lg">Class Teacher</label>
              <input
                type="text"
                ref={classTeacher}
                className="border-2 border-gray-300 p-2 rounded-md"
                required={true}
              />

              <label className="font-bold text-lg">Class Info</label>
              <input
                type="text"
                ref={classInfo}
                className="border-2 border-gray-300 p-2 rounded-md"
                required={true}
              />

              <label className="font-bold text-lg">Class Room</label>
              <input
                type="text"
                ref={classRoom}
                className="border-2 border-gray-300 p-2 rounded-md"
                required={true}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
