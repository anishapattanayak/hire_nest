import React, { useMemo } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { applyFilters } from './Filterutils.jsx';

const getFilteredJobs = (allJobs, searchedQuery) => {
    if (!allJobs.length) return [];
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
        const searchable = [job.title, job.company?.name, job.location, job.description, job.jobType]
            .filter(Boolean).join(' ').toLowerCase();
        return words.every(w => searchable.includes(w));
    });
};

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const filterJobs = useMemo(() => getFilteredJobs(allJobs, searchedQuery), [allJobs, searchedQuery]);
    const isLoading = allJobs.length === 0 && searchedQuery;

    return (
        <div className="bg-[#f5f0e8] min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto my-6 md:my-10 px-4 sm:px-6'>
                <h1 className='font-bold text-lg md:text-xl my-4 md:my-6 font-serif text-[#2c2415]'>
                    {searchedQuery
                        ? `Results for "${searchedQuery}" (${filterJobs.length})`
                        : `All Jobs (${filterJobs.length})`
                    }
                </h1>
                {isLoading ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <span className="text-[#6b5c45] text-lg font-medium font-serif">Loading...</span>
                    </div>
                ) : filterJobs.length === 0 ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <span className="text-[#6b5c45] text-lg font-medium font-serif">
                            No jobs found{searchedQuery ? ` for "${searchedQuery}"` : ''}
                        </span>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filterJobs.map((job) => <Job key={job._id} job={job} />)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse;