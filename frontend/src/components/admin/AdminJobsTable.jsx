import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, Trash2, MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteHandler = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAllAdminJobs(allAdminJobs.filter(j => j._id !== jobId)));
                toast.success('Job deleted successfully');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete job');
        }
    };

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <style>{`
                @media (max-width: 640px) {
                    .admin-jobs-table thead { display: none; }
                    .admin-jobs-table tbody tr {
                        display: block;
                        border: 1px solid #d6cbaa !important;
                        border-radius: 10px;
                        margin: 10px 10px;
                        padding: 10px 0;
                        background: #faf7f0 !important;
                    }
                    .admin-jobs-table tbody tr:hover { background: #eee8d8 !important; }
                    .admin-jobs-table td {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 14px !important;
                        font-size: 0.82rem;
                        border-bottom: 1px solid #f0ebe0;
                        text-align: left !important;
                    }
                    .admin-jobs-table td:last-child { border-bottom: none; }
                    .admin-jobs-table td::before {
                        content: attr(data-label);
                        font-size: 0.68rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.07em;
                        color: #7a8c5e;
                        min-width: 80px;
                        flex-shrink: 0;
                    }
                    .admin-jobs-table tfoot td { display: block; }
                }
            `}</style>
            <table className="admin-jobs-table" style={{ width: '100%', borderCollapse: 'collapse' }}>

                {/* Header */}
                <thead>
                    <tr style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa' }}>
                        {['Company Name', 'Role', 'Date', 'Action'].map((col, i) => (
                            <th
                                key={col}
                                style={{
                                    padding: '12px 20px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: '#4a6428',
                                    textAlign: i === 3 ? 'right' : 'left',
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {filterJobs?.length === 0 ? (
                        <tr>
                            <td colSpan={4} data-label="" style={{
                                padding: '2.5rem',
                                textAlign: 'center',
                                color: '#7a8c5e',
                                fontSize: '0.875rem',
                                fontStyle: 'italic',
                            }}>
                                No jobs found
                            </td>
                        </tr>
                    ) : (
                        filterJobs?.map((job, idx) => (
                            <tr
                                key={job._id}
                                style={{
                                    backgroundColor: idx % 2 === 0 ? '#faf7f0' : '#f5f0e6',
                                    borderBottom: '1px solid #e8e0cc',
                                    transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#faf7f0' : '#f5f0e6'}
                            >
                                {/* Company Name */}
                                <td data-label="Company" style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e1f' }}>
                                        {job?.company?.name}
                                    </span>
                                </td>

                                {/* Role */}
                                <td data-label="Role" style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.875rem', color: '#4a3f2f' }}>
                                        {job?.title}
                                    </span>
                                </td>

                                {/* Date */}
                                <td data-label="Date" style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#7a8c5e' }}>
                                        {job?.createdAt.split("T")[0]}
                                    </span>
                                </td>

                                {/* Action */}
                                <td data-label="Action" style={{ padding: '14px 20px', textAlign: 'right' }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button style={{
                                                background: 'none',
                                                border: '1px solid #d6cbaa',
                                                borderRadius: '6px',
                                                padding: '5px 7px',
                                                cursor: 'pointer',
                                                color: '#4a6428',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                transition: 'background-color 0.12s ease',
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-36"
                                            style={{
                                                backgroundColor: '#faf7f0',
                                                border: '1px solid #d6cbaa',
                                                borderRadius: '10px',
                                                padding: '6px',
                                                boxShadow: '0 4px 16px rgba(45,80,22,0.10)',
                                            }}
                                        >
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    padding: '8px 10px', borderRadius: '7px',
                                                    cursor: 'pointer', color: '#2c3e1f',
                                                    fontSize: '0.85rem', fontWeight: 500,
                                                    transition: 'background-color 0.12s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Edit2 size={14} color="#4a6428" />
                                                Edit
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    padding: '8px 10px', borderRadius: '7px',
                                                    cursor: 'pointer', color: '#2c3e1f',
                                                    fontSize: '0.85rem', fontWeight: 500,
                                                    transition: 'background-color 0.12s ease',
                                                    marginTop: '2px',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Eye size={14} color="#4a6428" />
                                                Applicants
                                            </div>
                                            <div
                                                onClick={() => deleteHandler(job._id)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    padding: '8px 10px', borderRadius: '7px',
                                                    cursor: 'pointer', color: '#8a3a1c',
                                                    fontSize: '0.85rem', fontWeight: 500,
                                                    transition: 'background-color 0.12s ease',
                                                    marginTop: '2px',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fdf0ee'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Trash2 size={14} color="#8a3a1c" />
                                                Delete
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

                {/* Caption */}
                <tfoot>
                    <tr>
                        <td colSpan={4} style={{
                            padding: '10px 20px',
                            fontSize: '0.75rem',
                            color: '#a09880',
                            textAlign: 'center',
                            borderTop: '1px solid #e8e0cc',
                            backgroundColor: '#f5f0e6',
                        }}>
                            A list of your recent posted jobs
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AdminJobsTable;