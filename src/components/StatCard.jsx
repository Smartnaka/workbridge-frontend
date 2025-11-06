import React from "react";

export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg shadow text-white ${color}`}>
      <h3 className="font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
} 
