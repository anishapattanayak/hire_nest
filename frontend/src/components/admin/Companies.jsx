import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 600px) {
                    .companies-wrapper { padding: 1.25rem 0.75rem !important; }
                    .companies-heading { font-size: 1.2rem !important; }
                    .companies-toolbar { flex-direction: column !important; align-items: stretch !important; }
                    .companies-search-wrap { width: 100% !important; }
                    .companies-search-wrap input { width: 100% !important; box-sizing: border-box; }
                    .companies-toolbar button { width: 100% !important; justify-content: center; }
                }
            `}</style>
            <Navbar />
            <div className="companies-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1rem' }}>

                {/* Page heading */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <h1 className="companies-heading" style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#2c3e1f',
                        margin: '0 0 0.25rem',
                    }}>
                        Companies
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: '#7a8c5e', margin: 0 }}>
                        Manage and browse registered companies
                    </p>
                </div>

                {/* Toolbar */}
                <div className="companies-toolbar" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                }}>
                    {/* Search input */}
                    <div className="companies-search-wrap" style={{ position: 'relative', flexShrink: 0 }}>
                        <svg
                            style={{
                                position: 'absolute', left: '10px', top: '50%',
                                transform: 'translateY(-50%)',
                                width: '15px', height: '15px',
                                color: '#7a8c5e', pointerEvents: 'none',
                            }}
                            xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Filter by name…"
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                paddingLeft: '32px',
                                paddingRight: '14px',
                                paddingTop: '9px',
                                paddingBottom: '9px',
                                fontSize: '0.875rem',
                                borderRadius: '8px',
                                border: '1px solid #c8bc96',
                                backgroundColor: '#faf7f0',
                                color: '#2c3e1f',
                                outline: 'none',
                                width: '220px',
                                transition: 'border-color 0.15s ease',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#3a5a1c'}
                            onBlur={e => e.currentTarget.style.borderColor = '#c8bc96'}
                        />
                    </div>

                    {/* New Company button */}
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '9px 20px',
                            backgroundColor: '#3a5a1c',
                            color: '#f5f0e6',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2c4415'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3a5a1c'}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        New Company
                    </button>
                </div>

                {/* Table container */}
                <div style={{
                    backgroundColor: '#faf7f0',
                    border: '1px solid #d6cbaa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;