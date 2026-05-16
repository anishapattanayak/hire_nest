import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-12 md:my-20 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#2c2415]">
        <span className="text-[#4a6741]">Latest & Top </span>
        Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 md:my-8">
        {allJobs.length <= 0 ? (
          <span className="text-[#6b5c45] font-serif">No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;