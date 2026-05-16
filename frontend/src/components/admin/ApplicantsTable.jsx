import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const statusColors = {
    accepted: { bg: '#e8f0dc', color: '#3a5a1c', border: '#b5cc90', dot: '#3a5a1c' },
    rejected: { bg: '#fdf0ee', color: '#8a3a1c', border: '#e8b0a0', dot: '#8a3a1c' },
};

const StatusBadge = ({ status }) => {
    if (!status) return <span style={{ fontSize: '0.78rem', color: '#a09880', fontStyle: 'italic' }}>Pending</span>;
    const s = statusColors[status.toLowerCase()] || { bg: '#f0ebe0', color: '#7a6a52', border: '#d9cdb8' };
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '3px 10px', borderRadius: '999px',
            backgroundColor: s.bg, color: s.color,
            border: `1px solid ${s.border}`,
            fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'capitalize',
        }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.color }} />
            {status}
        </span>
    );
};

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                const updated = {
                    ...applicants,
                    applications: applicants.applications.map(app =>
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    )
                };
                dispatch(setAllApplicants(updated));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update status');
        }
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <style>{`
                @media (max-width: 768px) {
                    .applicants-table thead { display: none; }
                    .applicants-table tbody tr {
                        display: block;
                        border: 1px solid #d6cbaa !important;
                        border-radius: 10px;
                        margin: 10px 10px;
                        padding: 10px 0;
                        background: #faf7f0 !important;
                    }
                    .applicants-table tbody tr:hover { background: #eee8d8 !important; }
                    .applicants-table td {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 7px 14px !important;
                        font-size: 0.82rem;
                        border-bottom: 1px solid #f0ebe0;
                        text-align: left !important;
                    }
                    .applicants-table td:last-child { border-bottom: none; }
                    .applicants-table td::before {
                        content: attr(data-label);
                        font-size: 0.68rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.07em;
                        color: #7a8c5e;
                        min-width: 90px;
                        flex-shrink: 0;
                    }
                    .applicants-table tfoot td { display: block; }
                }
            `}</style>
            <table className="applicants-table" style={{ width: '100%', borderCollapse: 'collapse' }}>

                {/* Header */}
                <thead>
                    <tr style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa' }}>
                        {['Full Name', 'Email', 'Contact', 'Resume', 'Date', 'Status', 'Action'].map((col, i) => (
                            <th key={col} style={{
                                padding: '12px 18px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#4a6428',
                                textAlign: i === 6 ? 'right' : 'left',
                                whiteSpace: 'nowrap',
                            }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {!applicants?.applications?.length ? (
                        <tr>
                            <td colSpan={7} data-label="" style={{
                                padding: '2.5rem', textAlign: 'center',
                                color: '#7a8c5e', fontSize: '0.875rem', fontStyle: 'italic',
                            }}>
                                No applicants yet
                            </td>
                        </tr>
                    ) : (
                        applicants.applications.map((item, idx) => {
                            const currentStatus = item?.status?.toLowerCase();
                            return (
                                <tr
                                    key={item._id}
                                    style={{
                                        backgroundColor: idx % 2 === 0 ? '#faf7f0' : '#f5f0e6',
                                        borderBottom: '1px solid #e8e0cc',
                                        transition: 'background-color 0.12s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#faf7f0' : '#f5f0e6'}
                                >
                                    <td data-label="Full Name" style={{ padding: '13px 18px' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e1f' }}>
                                            {item?.applicant?.fullname}
                                        </span>
                                    </td>
                                    <td data-label="Email" style={{ padding: '13px 18px' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#3c3528' }}>{item?.applicant?.email}</span>
                                    </td>
                                    <td data-label="Contact" style={{ padding: '13px 18px' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#3c3528' }}>{item?.applicant?.phoneNumber}</span>
                                    </td>
                                    <td data-label="Resume" style={{ padding: '13px 18px' }}>
                                        {item.applicant?.profile?.resume ? (
                                            <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer"
                                                style={{ fontSize: '0.85rem', color: '#3a5a1c', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                                                {item.applicant.profile.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <span style={{ fontSize: '0.85rem', color: '#a09880', fontStyle: 'italic' }}>NA</span>
                                        )}
                                    </td>
                                    <td data-label="Date" style={{ padding: '13px 18px' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#7a8c5e' }}>
                                            {item?.applicant?.createdAt?.split("T")[0]}
                                        </span>
                                    </td>

                                    {/* Status badge column */}
                                    <td data-label="Status" style={{ padding: '13px 18px' }}>
                                        <StatusBadge status={item?.status} />
                                    </td>

                                    {/* Action */}
                                    <td data-label="Action" style={{ padding: '13px 18px', textAlign: 'right' }}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button style={{
                                                    background: 'none', border: '1px solid #d6cbaa',
                                                    borderRadius: '6px', padding: '5px 7px', cursor: 'pointer',
                                                    color: '#4a6428', display: 'inline-flex', alignItems: 'center',
                                                    transition: 'background-color 0.12s ease',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent style={{
                                                backgroundColor: '#faf7f0', border: '1px solid #d6cbaa',
                                                borderRadius: '10px', padding: '6px',
                                                boxShadow: '0 4px 16px rgba(45,80,22,0.10)', width: '140px',
                                            }}>
                                                <p style={{ fontSize: '0.68rem', color: '#a09880', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 10px 6px', margin: 0 }}>
                                                    Set Status
                                                </p>
                                                {shortlistingStatus.map((status) => {
                                                    const s = statusColors[status.toLowerCase()];
                                                    const isActive = currentStatus === status.toLowerCase();
                                                    return (
                                                        <div
                                                            key={status}
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            style={{
                                                                display: 'flex', alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                gap: '8px', padding: '7px 10px',
                                                                borderRadius: '7px', cursor: 'pointer',
                                                                fontSize: '0.85rem', fontWeight: isActive ? 700 : 500,
                                                                color: s.color,
                                                                backgroundColor: isActive ? s.bg : 'transparent',
                                                                border: isActive ? `1px solid ${s.border}` : '1px solid transparent',
                                                                transition: 'all 0.12s ease',
                                                                marginBottom: '2px',
                                                            }}
                                                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = s.bg; }}
                                                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: s.color, flexShrink: 0 }} />
                                                                {status}
                                                            </div>
                                                            {isActive && <Check size={13} color={s.color} />}
                                                        </div>
                                                    );
                                                })}
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={7} style={{
                            padding: '10px 18px', fontSize: '0.75rem', color: '#a09880',
                            textAlign: 'center', borderTop: '1px solid #e8e0cc', backgroundColor: '#f5f0e6',
                        }}>
                            A list of your recent applied users
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ApplicantsTable;