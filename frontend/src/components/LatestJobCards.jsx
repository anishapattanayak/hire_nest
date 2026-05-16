import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-4 sm:p-5 rounded-xl shadow-sm bg-[#fdfaf4] border border-[#e0d5c0] cursor-pointer hover:shadow-md hover:border-[#c8b878] transition-all duration-200 flex flex-col h-full'
        >
            {/* Logo + Company Name */}
            <div className='flex items-center gap-3 mb-3'>
                <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border border-[#e0d5c0] flex-shrink-0">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
                <div className="min-w-0">
                    <h1 className='font-semibold text-[#2c2415] text-sm sm:text-base truncate'>{job?.company?.name}</h1>
                    <p className='text-xs text-[#9a8a6a]'>India</p>
                </div>
            </div>

            <div className="flex-1">
                <h1 className='font-bold text-[#2c2415] font-serif text-sm sm:text-base my-1.5 leading-snug'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-[#6b5c45] leading-relaxed line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            <div className='flex items-center gap-1.5 mt-4 flex-wrap'>
                <Badge className='text-[#4a6741] bg-[#eaf2e4] border-0 font-semibold text-xs'>{job?.position} Positions</Badge>
                <Badge className='text-[#8a4a20] bg-[#f5ece3] border-0 font-semibold text-xs'>{job?.jobType}</Badge>
                <Badge className='text-[#2c2415] bg-[#e8e0cc] border-0 font-semibold text-xs'>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;