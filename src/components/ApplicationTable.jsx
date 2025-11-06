import React from "react";

export default function ApplicationTable({ applications }) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="border p-2">Job</th>
          <th className="border p-2">Company</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Applied On</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, idx) => (
          <tr key={idx} className="hover:bg-gray-100">
            <td className="border p-2">{app.title}</td>
            <td className="border p-2">{app.company}</td>
            <td className="border p-2">{app.status}</td>
            <td className="border p-2">{new Date(app.appliedOn).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
