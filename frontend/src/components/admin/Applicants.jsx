import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <style>{`
                @media (max-width: 600px) {
                    .applicants-heading { font-size: 1.2rem !important; }
                    .applicants-wrapper { padding: 1.25rem 0.75rem !important; }
                }
            `}</style>
            <Navbar />
            <div className="applicants-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1rem' }}>

                {/* Page heading */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <h1 className="applicants-heading" style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#2c3e1f',
                        margin: '0 0 0.25rem',
                    }}>
                        Applicants
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: '#7a8c5e', margin: 0 }}>
                        {applicants?.applications?.length ?? 0} application{applicants?.applications?.length !== 1 ? 's' : ''} received
                    </p>
                </div>

                {/* Table container */}
                <div style={{
                    backgroundColor: '#faf7f0',
                    border: '1px solid #d6cbaa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>
                    <ApplicantsTable />
                </div>

            </div>
        </div>
    );
}

export default Applicants;