import React from 'react';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

const topics = [
  { name: 'Arrays', route: '/accounts/dashboard' },
  { name: 'Dynamic Programming', route: '/problems?topic=dynamic-programming' },
  { name: 'Interview Prep', route: '/problems?topic=interview-prep' },
  { name: 'Trees', route: '/problems?topic=trees' },
  { name: 'Graphs', route: '/problems?topic=graphs' },
  { name: 'Sorting', route: '/problems?topic=sorting' },
  { name: 'Searching', route: '/problems?topic=searching' },
  { name: 'Greedy Algorithms', route: '/problems?topic=greedy-algorithms' },
];

const Explore: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Explore Topics
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(topic.route)}
            className="cursor-pointer p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-semibold">{topic.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">{topic.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
