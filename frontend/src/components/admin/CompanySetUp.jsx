import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    fontSize: '0.875rem',
    borderRadius: '8px',
    border: '1px solid #c8bc96',
    backgroundColor: '#f5f0e6',
    color: '#2c3e1f',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
}

const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#7a8c5e',
    marginBottom: '6px',
}

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "", description: "", website: "", location: "", file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!singleCompany) return;
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null
        });
    }, [singleCompany]);

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 640px) {
                    .company-setup-wrapper { padding: 1.25rem 0.75rem !important; }
                    .company-setup-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
                    .company-setup-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
            <Navbar />
            <div className="company-setup-wrapper" style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1rem' }}>

                {/* Back + title */}
                <div className="company-setup-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
                    <button
                        onClick={() => navigate("/admin/companies")}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '8px',
                            border: '1px solid #c8bc96', backgroundColor: 'transparent',
                            color: '#4a3f2f', fontSize: '0.85rem', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.15s ease',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <ArrowLeft size={15} /> Back
                    </button>
                    <div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 700, color: '#2c3e1f', margin: 0 }}>
                            Company Setup
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: '#7a8c5e', margin: 0 }}>Update your company details</p>
                    </div>
                </div>

                {/* Card */}
                <div style={{ backgroundColor: '#faf7f0', border: '1px solid #d6cbaa', borderRadius: '16px', overflow: 'hidden' }}>

                    {/* Header strip */}
                    <div style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa', padding: '1.25rem 1.75rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#7a8c5e', margin: 0 }}>
                            Fill in the details below to update your company profile
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} style={{ padding: '1.75rem' }}>
                        <div className="company-setup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem', marginBottom: '1.1rem' }}>

                            {[
                                { label: 'Company Name', name: 'name',        type: 'text', required: true,  hint: '',                   placeholder: 'e.g. Infosys Pvt Ltd'           },
                                { label: 'Description',  name: 'description', type: 'text', required: false, hint: 'tagline or summary', placeholder: 'e.g. Building great careers...'  },
                                { label: 'Website',      name: 'website',     type: 'text', required: false, hint: 'full URL',           placeholder: 'https://yourcompany.com'         },
                                { label: 'Location',     name: 'location',    type: 'text', required: false, hint: '',                   placeholder: 'e.g. Bangalore or Remote'        },
                            ].map(({ label, name, type, required, hint, placeholder }) => (
                                <div key={name}>
                                    <label style={labelStyle}>
                                        {label}
                                        {hint && <span style={{ color: '#9a8c6a', fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: '5px', fontSize: '0.68rem' }}>({hint})</span>}
                                        {required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        style={inputStyle}
                                        onFocus={e => e.currentTarget.style.borderColor = '#3a5a1c'}
                                        onBlur={e => e.currentTarget.style.borderColor = '#c8bc96'}
                                    />
                                </div>
                            ))}

                            {/* Logo upload */}
                            <div>
                                <label style={labelStyle}>Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    style={{ ...inputStyle, padding: '6px 12px', cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '11px', borderRadius: '8px', border: 'none',
                                backgroundColor: loading ? '#c8c4b8' : '#3a5a1c',
                                color: loading ? '#7a7a6e' : '#f5f0e6',
                                fontSize: '0.9rem', fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                transition: 'background-color 0.15s ease',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2c4415'; }}
                            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#3a5a1c'; }}
                        >
                            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Please wait…</> : 'Update Company'}
                        </button>
                    </form>
                </div>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default CompanySetup;