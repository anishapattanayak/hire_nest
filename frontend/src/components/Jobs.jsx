import React, { useMemo, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { applyFilters } from "./Filterutils.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

const getFilteredJobs = (allJobs, searchedQuery) => {
  if (!searchedQuery) return allJobs;
  try {
    const parsed = JSON.parse(searchedQuery);
    const selected = {};
    Object.entries(parsed).forEach(([k, v]) => { selected[k] = new Set(v); });
    return applyFilters(allJobs, selected);
  } catch (_) {}
  const words = searchedQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return allJobs;
  return allJobs.filter(job => {
    const searchable = [job.title, job.company?.name, job.location, job.jobType, job.description]
      .filter(Boolean).join(' ').toLowerCase();
    return words.every(w => searchable.includes(w));
  });
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const filterJobs = useMemo(() => getFilteredJobs(allJobs, searchedQuery), [allJobs, searchedQuery]);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-4 md:mt-6 px-4 sm:px-6">

        {/* Mobile filter toggle button */}
        <div className="flex md:hidden items-center justify-between mb-3">
          <p className="text-sm text-[#6b5c45] font-medium">
            {filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''} found
          </p>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#d9cdb8] bg-[#fdfaf4] text-sm font-semibold text-[#4a3f2f]"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Mobile filter drawer overlay */}
        {filterOpen && (
          <div
            className="fixed inset-0 z-50 flex md:hidden"
            style={{ backgroundColor: 'rgba(44, 36, 21, 0.4)' }}
            onClick={() => setFilterOpen(false)}
          >
            <div
              className="w-4/5 max-w-xs h-full bg-[#f5f0e8] overflow-y-auto shadow-xl"
              onClick={e => e.stopPropagation()}
              style={{ padding: '1rem' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-[#2c2415] font-serif text-base">Filters</span>
                <button onClick={() => setFilterOpen(false)} className="p-1 rounded-full hover:bg-[#e0d5c0]">
                  <X size={18} className="text-[#4a3f2f]" />
                </button>
              </div>
              <FilterCard onApply={() => setFilterOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex gap-5">

          {/* Sidebar — desktop only */}
          <div className="hidden md:block w-[260px] lg:w-[280px] flex-shrink-0">
            <FilterCard />
          </div>

          {/* Job grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[60vh]">
              <span className="text-[#6b5c45] text-lg font-medium font-serif">No jobs found</span>
            </div>
          ) : (
            <div className="flex-1 min-w-0 md:h-[88vh] md:overflow-y-auto pb-5 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div key={job?._id}
                    initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;