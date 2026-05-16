import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setCompanies } from '@/redux/companySlice'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filtered = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    const deleteHandler = async (companyId) => {
        if (!window.confirm('Are you sure you want to delete this company?')) return;
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setCompanies(companies.filter(c => c._id !== companyId)));
                toast.success('Company deleted successfully');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete company');
        }
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <style>{`
                @media (max-width: 640px) {
                    .companies-table thead { display: none; }
                    .companies-table tbody tr {
                        display: block;
                        border: 1px solid #d6cbaa !important;
                        border-radius: 10px;
                        margin: 10px 10px;
                        padding: 10px 0;
                        background: #faf7f0 !important;
                    }
                    .companies-table tbody tr:hover { background: #eee8d8 !important; }
                    .companies-table td {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 14px !important;
                        font-size: 0.82rem;
                        border-bottom: 1px solid #f0ebe0;
                        text-align: left !important;
                    }
                    .companies-table td:last-child { border-bottom: none; }
                    .companies-table td::before {
                        content: attr(data-label);
                        font-size: 0.68rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.07em;
                        color: #7a8c5e;
                        min-width: 70px;
                        flex-shrink: 0;
                    }
                    .companies-table tfoot td { display: block; }
                }
            `}</style>
            <table className="companies-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa' }}>
                        {['Logo', 'Name', 'Date', 'Action'].map((col, i) => (
                            <th key={col} style={{
                                padding: '12px 20px', fontSize: '0.7rem', fontWeight: 700,
                                textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4a6428',
                                textAlign: i === 3 ? 'right' : 'left',
                            }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filterCompany?.length === 0 ? (
                        <tr>
                            <td colSpan={4} data-label="" style={{ padding: '2.5rem', textAlign: 'center', color: '#7a8c5e', fontSize: '0.875rem', fontStyle: 'italic' }}>
                                No companies found
                            </td>
                        </tr>
                    ) : (
                        filterCompany?.map((company, idx) => (
                            <tr key={company._id}
                                style={{ backgroundColor: idx % 2 === 0 ? '#faf7f0' : '#f5f0e6', borderBottom: '1px solid #e8e0cc', transition: 'background-color 0.12s ease' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#faf7f0' : '#f5f0e6'}
                            >
                                <td data-label="Logo" style={{ padding: '14px 20px' }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d6cbaa', backgroundColor: '#eee8d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {company.logo
                                            ? <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            : <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4a6428' }}>{company.name?.[0]?.toUpperCase()}</span>
                                        }
                                    </div>
                                </td>
                                <td data-label="Name" style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e1f' }}>{company.name}</span>
                                </td>
                                <td data-label="Date" style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#7a8c5e' }}>{company.createdAt.split("T")[0]}</span>
                                </td>
                                <td data-label="Action" style={{ padding: '14px 20px', textAlign: 'right' }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button style={{ background: 'none', border: '1px solid #d6cbaa', borderRadius: '6px', padding: '5px 7px', cursor: 'pointer', color: '#4a6428', display: 'inline-flex', alignItems: 'center', transition: 'background-color 0.12s ease' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32" style={{ backgroundColor: '#faf7f0', border: '1px solid #d6cbaa', borderRadius: '10px', padding: '6px', boxShadow: '0 4px 16px rgba(45,80,22,0.10)' }}>
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '7px', cursor: 'pointer', color: '#2c3e1f', fontSize: '0.85rem', fontWeight: 500, transition: 'background-color 0.12s ease' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Edit2 size={14} color="#4a6428" /> Edit
                                            </div>
                                            <div onClick={() => deleteHandler(company._id)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '7px', cursor: 'pointer', color: '#8a3a1c', fontSize: '0.85rem', fontWeight: 500, transition: 'background-color 0.12s ease', marginTop: '2px' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fdf0ee'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Trash2 size={14} color="#8a3a1c" /> Delete
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4} style={{ padding: '10px 20px', fontSize: '0.75rem', color: '#a09880', textAlign: 'center', borderTop: '1px solid #e8e0cc', backgroundColor: '#f5f0e6' }}>
                            A list of your recent registered companies
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default CompaniesTable;