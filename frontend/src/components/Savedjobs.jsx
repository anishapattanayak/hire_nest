import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Bookmark, Clock } from "lucide-react";

const SavedJobs = () => {
  const { bookmarked, savedForLater } = useSelector((store) => store.savedJobs);
  const [activeTab, setActiveTab] = useState("bookmarked"); // "bookmarked" | "savedForLater"

  const jobs = activeTab === "bookmarked" ? bookmarked : savedForLater;

  const tabs = [
    { id: "bookmarked",    label: "Bookmarked",     icon: Bookmark, count: bookmarked.length    },
    { id: "savedForLater", label: "Saved For Later", icon: Clock,    count: savedForLater.length },
  ];

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#2c2415]">
            <span className="text-[#4a6741]">Saved </span>Jobs
          </h1>
          <p className="text-sm text-[#7a6a52] mt-1">
            All the jobs you've bookmarked or saved for later
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b border-[#e0d5c0] overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 text-xs sm:text-sm font-semibold transition-all duration-150 border-b-2 -mb-px whitespace-nowrap ${
                activeTab === id
                  ? "border-[#4a6741] text-[#4a6741]"
                  : "border-transparent text-[#7a6a52] hover:text-[#4a3f2f]"
              }`}
            >
              <Icon size={14} />
              {label}
              <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                activeTab === id
                  ? "bg-[#eaf2e4] text-[#4a6741]"
                  : "bg-[#f0ebe0] text-[#9a8a6a]"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Job grid */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            {activeTab === "bookmarked"
              ? <Bookmark size={40} className="text-[#c8b99a]" />
              : <Clock size={40} className="text-[#c8b99a]" />}
            <p className="text-[#7a6a52] font-medium font-serif text-lg text-center">
              {activeTab === "bookmarked"
                ? "No bookmarked jobs yet"
                : "No jobs saved for later"}
            </p>
            <p className="text-[#9a8a6a] text-sm text-center px-4">
              {activeTab === "bookmarked"
                ? "Click the bookmark icon on any job card to save it here."
                : 'Click "Save For Later" on any job card to save it here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SavedJobs;