import React from 'react';

const NewspaperPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">The Daily Tyee</h1>
          <p className="text-lg text-gray-600">Your Source for All Things Tyee</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <article className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">Latest News</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in tortor et justo
                laoreet commodo. Sed rhoncus, ante eget tincidunt suscipit.
                {/* Add your article content here */}
              </p>
            </article>
          </div>

          <div className="md:block hidden">
            <aside className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">Trending</h2>
              <ul className="text-gray-700">
                <li>tyee gonna be destroyed?</li>
                <li>crazy</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Display recent articles */}
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">Article Title</h3>
              <p className="text-gray-700">
                Brief summary or excerpt of the article content goes here.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">Another Article Title</h3>
              <p className="text-gray-700">
                Another brief summary or excerpt of the article content.
              </p>
            </div>
            {/* Add more recent articles */}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default NewspaperPage;
