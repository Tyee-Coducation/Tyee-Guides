// TOSPage.js

import React from 'react';

const TOSPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          Welcome to Tyee Guides website. Please read these terms carefully before using our services.
        </p>
        <div className="text-left text-gray-800">
          <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By using this website, you agree to abide by these terms and conditions and all applicable laws and regulations.
          </p>
          <h2 className="text-2xl font-bold mb-2">2. Abuse</h2>
          <p className="mb-4">
            Any sort of insults both you mean it or didn't will count as abuse,spreading false informationm, spamming and NSFW content also counts as abuse any violate of abuse would result in a ban.
          </p>
          <h2 className="text-2xl font-bold mb-2">3. Exploiting</h2>
          <p className="mb-4">
            Any action of expoliting the website for any kind of purpose will violate our TOS and will result in a ban. Including (but not limiting to) using scripts to transfer this website into a proxy site/game site, DDOSing the site
          </p>
          <h2 className="text-2xl font-bold mb-2">4. Escaping Loopholes</h2>
          <p className="mb-4">
            Any attempt of escaping the loopholes will also result in a ban. 
          </p>
          <h2 className="text-2xl font-bold mb-2">5. Copyright</h2>
          <p className="mb-4">
            Everything provided on the website we provide could be used with no citing required, however commerical sites need to credit us.
          </p>
          <h2 className="text-2xl font-bold mb-2">6. Bans</h2>
          <p className="mb-4">
            Bans can happen anytime without further notice, you will only be banned when we are 100% sure that you violated our TOS with evidence.
          </p>
          <h2 className="text-2xl font-bold mb-2">7. Logging</h2>
          <p className="mb-4">
            We log everything you say on this website this log would be used to determind the banned account however if requested we will share the data to officials such as the Police Department, or Bellevue School Distrit without further notice. But we will never share your data to a third party.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default TOSPage;
