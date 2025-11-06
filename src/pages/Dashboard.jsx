import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  // Fallback user while loading
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored
      ? JSON.parse(stored)
      : { name: "User", avatar: "", profileCompletion: 0, role: "Job Seeker" };
  });

  const [stats, setStats] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;

      try {
        // Fetch stats and recommended jobs in parallel
        const [statsRes, jobsRes] = await Promise.all([
          axios.get("/api/dashboard/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/dashboard/jobs/recommended", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data || []);
        setJobs(jobsRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setStats([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Header user={user} />
      <div className="flex flex-1">
        <Sidebar user={user} stats={stats} />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-5xl flex flex-col gap-8">
            <div>
              <p className="text-3xl font-black">Welcome back, {user.name}!</p>
              <p className="mt-2 text-base text-text-secondary-light dark:text-text-secondary-dark">
                Here's your daily job search summary and recommendations.
              </p>
            </div>

            {/* Stats overview cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg bg-surface-light dark:bg-surface-dark p-4 shadow-sm flex justify-between"
                >
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {s.title}
                  </p>
                  <p className={`text-2xl font-bold ${s.color || ""}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Job cards */}
            <div className="flex flex-col gap-4">
              {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  No recommended jobs at the moment.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;