import React from "react";

const JobCard = ({ job }) => (
  <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex w-12 h-12 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark text-2xl">🚀</div>
        <div>
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {job.company} · {job.location} · {job.type || "Full-time"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
          <span className="material-symbols-outlined text-base">bookmark_border</span>
        </button>
        <button className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-white">View Details</button>
      </div>
    </div>
  </div>
);

export default JobCard;