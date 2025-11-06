import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="font-bold">{job.title}</h3>
      <p>{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
        Apply
      </button>
    </div>
  );
}
