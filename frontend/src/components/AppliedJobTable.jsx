import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusClass = (status) =>
        status === "rejected" ? 'bg-red-800' : status === 'pending' ? 'bg-gray-600' : 'bg-green-800';

    if (allAppliedJobs.length === 0) {
        return (
            <p className="text-center text-gray-500 py-6 text-sm">
                You haven't applied to any job yet.
            </p>
        );
    }

    return (
        <>
            {/* ── Desktop table (md+) ── */}
            <div className="hidden md:block w-full overflow-x-auto">
                <Table>
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">Date</TableHead>
                            <TableHead className="whitespace-nowrap">Job Role</TableHead>
                            <TableHead className="whitespace-nowrap">Company</TableHead>
                            <TableHead className="text-right whitespace-nowrap">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="whitespace-nowrap">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={getStatusClass(appliedJob?.status)}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ── Mobile cards (below md) ── */}
            <div className="flex flex-col gap-3 md:hidden">
                {allAppliedJobs.map((appliedJob) => (
                    <div
                        key={appliedJob._id}
                        className="border border-[#d9cdb8] rounded-xl p-4 bg-[#fdfaf4] flex flex-col gap-2"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-[#2c2415] text-sm leading-snug">
                                {appliedJob.job?.title || "—"}
                            </p>
                            <Badge className={`${getStatusClass(appliedJob?.status)} shrink-0 text-xs`}>
                                {appliedJob.status.toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-[#6b5c45] text-sm">{appliedJob.job?.company?.name || "—"}</p>
                        <p className="text-[#9a8a6a] text-xs">{appliedJob?.createdAt?.split("T")[0]}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AppliedJobTable;