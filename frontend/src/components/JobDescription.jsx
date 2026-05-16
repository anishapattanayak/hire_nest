import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const pill = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
};

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div style={{ maxWidth: '860px', margin: '1.5rem auto', padding: '0 1rem' }}>

            {/* Top header card */}
            <div style={{
                backgroundColor: '#f5f0e6',
                border: '1px solid #d6cbaa',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.25rem',
            }}>
                {/* Title + Apply button — stacked on mobile, side-by-side on sm+ */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <h1 style={{
                            color: '#2c3e1f',
                            fontFamily: 'Georgia, serif',
                            fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
                            fontWeight: 700,
                            margin: 0,
                            flex: '1 1 auto',
                            minWidth: 0,
                        }}>
                            {singleJob?.title}
                        </h1>

                        <button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            style={{
                                flexShrink: 0,
                                padding: '9px 20px',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: isApplied ? 'not-allowed' : 'pointer',
                                border: 'none',
                                backgroundColor: isApplied ? '#c8c4b8' : '#3a5a1c',
                                color: isApplied ? '#7a7a6e' : '#f5f0e6',
                                transition: 'background-color 0.15s ease',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => { if (!isApplied) e.currentTarget.style.backgroundColor = '#2c4415'; }}
                            onMouseLeave={e => { if (!isApplied) e.currentTarget.style.backgroundColor = '#3a5a1c'; }}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </button>
                    </div>

                    {/* Pills */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ ...pill, backgroundColor: '#e8f0dc', color: '#3a5a1c', border: '1px solid #b5cc90' }}>
                            {singleJob?.position || singleJob?.postion} {(singleJob?.position || singleJob?.postion) === 1 ? 'Position' : 'Positions'}
                        </span>
                        <span style={{ ...pill, backgroundColor: '#fdf3e3', color: '#8a5e1a', border: '1px solid #e8c88a' }}>
                            {singleJob?.jobType}
                        </span>
                        <span style={{ ...pill, backgroundColor: '#e4ede0', color: '#3a5a1c', border: '1px solid #a8c48a' }}>
                            {singleJob?.salary ? `₹${singleJob.salary} LPA` : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Details card */}
            <div style={{
                backgroundColor: '#faf7f0',
                border: '1px solid #d6cbaa',
                borderRadius: '16px',
                padding: '1.5rem 1.25rem',
            }}>
                <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#4a6428',
                    margin: '0 0 1.25rem',
                }}>
                    Job Details
                </p>

                {/* Responsive 2-col grid — 1 col on mobile */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem 1.5rem',
                    marginBottom: '1.5rem',
                }}>
                    {[
                        { label: 'Role', value: singleJob?.title },
                        { label: 'Location', value: singleJob?.location },
                        { label: 'Experience', value: singleJob?.experienceLevel || '—' },
                        { label: 'Salary', value: singleJob?.salary ? `₹${singleJob.salary} LPA` : '—' },
                        { label: 'Total Applicants', value: singleJob?.applications?.length },
                        { label: 'Posted Date', value: singleJob?.createdAt?.split("T")[0] },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#7a8c5e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                {label}
                            </span>
                            <span style={{ fontSize: '0.92rem', color: '#2c3e1f', fontWeight: 500 }}>
                                {value ?? '—'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div style={{ borderTop: '1px solid #d6cbaa', paddingTop: '1.25rem' }}>
                    <span style={{
                        fontSize: '0.7rem', color: '#7a8c5e', fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        display: 'block', marginBottom: '0.5rem'
                    }}>
                        Description
                    </span>
                    <p style={{ fontSize: '0.92rem', color: '#3c3528', lineHeight: 1.75, margin: 0 }}>
                        {singleJob?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;