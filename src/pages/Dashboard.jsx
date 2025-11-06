import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import ApplicationTable from "../components/ApplicationTable";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", avatar: "/default-avatar.png" });
  const [stats, setStats] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token"); // JWT from login

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchDashboardData = async () => {
      try {
        const [statsRes, jobsRes, appsRes] = await Promise.all([
          axios.get("https://workbridge-backend-api.onrender.com/api/dashboard/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://workbridge-backend-api.onrender.com/api/jobs/recommended", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://workbridge-backend-api.onrender.com/api/applications", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data);
        setRecommendedJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header user={user} />
        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>

          {/* Recommended Jobs */}
          <section>
            <h2 className="text-xl font-bold mb-4">Recommended Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.map((job, i) => <JobCard key={i} job={job} />)}
            </div>
          </section>

          {/* Applications */}
          <section>
            <h2 className="text-xl font-bold mb-4">Your Applications</h2>
            <ApplicationTable applications={applications} />
          </section>
        </main>
      </div>
    </div>
  );
}
