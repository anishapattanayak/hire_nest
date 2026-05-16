import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 600px) {
                    .company-create-wrapper { padding: 1.5rem 0.75rem !important; }
                    .company-create-actions { flex-direction: column !important; }
                    .company-create-actions button { width: 100% !important; }
                }
            `}</style>
            <Navbar />
            <div className="company-create-wrapper" style={{ maxWidth: '560px', margin: '0 auto', padding: '3rem 1rem' }}>

                {/* Card */}
                <div style={{
                    backgroundColor: '#faf7f0',
                    border: '1px solid #d6cbaa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>

                    {/* Card header strip */}
                    <div style={{
                        backgroundColor: '#eee8d8',
                        borderBottom: '1px solid #d6cbaa',
                        padding: '1.25rem 1.75rem',
                    }}>
                        <h1 style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#2c3e1f',
                            margin: '0 0 0.3rem',
                        }}>
                            Your Company Name
                        </h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#7a8c5e',
                            margin: 0,
                            lineHeight: 1.5,
                        }}>
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    {/* Form body */}
                    <div style={{ padding: '1.75rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            color: '#7a8c5e',
                            marginBottom: '6px',
                        }}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            placeholder="JobHunt, Microsoft etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 13px',
                                fontSize: '0.9rem',
                                borderRadius: '8px',
                                border: '1px solid #c8bc96',
                                backgroundColor: '#f5f0e6',
                                color: '#2c3e1f',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.15s ease',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = '#3a5a1c'}
                            onBlur={e => e.currentTarget.style.borderColor = '#c8bc96'}
                        />

                        {/* Actions */}
                        <div className="company-create-actions" style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => navigate("/admin/companies")}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #c8bc96',
                                    backgroundColor: 'transparent',
                                    color: '#4a6428',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={registerNewCompany}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#3a5a1c',
                                    color: '#f5f0e6',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.15s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2c4415'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3a5a1c'}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;