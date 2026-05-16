import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/Dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(",") || "",
        file: null,
        profilePhoto: ""
    });

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.join(",") || "",
                file: null,
                profilePhoto: ""
            });
        }
    }, [user]);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file instanceof File) formData.append("file", input.file);
        if (input.profilePhoto instanceof File) formData.append("profilePhoto", input.profilePhoto);

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers,
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[425px] bg-[#faf7f2] border border-[#d9cdb8]">
                    <DialogHeader>
                        <DialogTitle className="text-[#2c2415] font-serif">Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            {[
                                { label: "Name",    id: "name",    name: "fullname",    type: "text", value: input.fullname,    placeholder: "Your full name"                        },
                                { label: "Number",  id: "number",  name: "phoneNumber", type: "text", value: input.phoneNumber, placeholder: "10-digit mobile number"                },
                                { label: "Bio",     id: "bio",     name: "bio",         type: "text", value: input.bio,         placeholder: "e.g. Passionate React Developer"       },
                                { label: "Skills",  id: "skills",  name: "skills",      type: "text", value: input.skills,      placeholder: "e.g. React, Node.js, Python (comma-separated)" },
                            ].map(({ label, id, name, type, value, placeholder }) => (
                                <div key={id} className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-1.5 sm:gap-4'>
                                    <Label htmlFor={id} className="text-left sm:text-right text-[#6b5c45] text-sm">{label}</Label>
                                    <Input
                                        id={id}
                                        name={name}
                                        type={type}
                                        value={value}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        className="sm:col-span-3 border-[#d9cdb8] bg-white focus:border-[#4a6741] focus:ring-[#4a6741] text-[#2c2415] placeholder:text-[#b5a898]"
                                    />
                                </div>
                            ))}

                            <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-1.5 sm:gap-4'>
                                <Label htmlFor="profilePhoto" className="text-left sm:text-right text-[#6b5c45] text-sm">Photo</Label>
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setInput({ ...input, profilePhoto: e.target.files?.[0] })}
                                    className="sm:col-span-3 border-[#d9cdb8] bg-white text-[#6b5c45]"
                                />
                            </div>

                            <div className='flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-1.5 sm:gap-4'>
                                <Label htmlFor="file" className="text-left sm:text-right text-[#6b5c45] text-sm">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="sm:col-span-3 border-[#d9cdb8] bg-white text-[#6b5c45]"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            {loading
                                ? <Button disabled className="w-full my-4 bg-[#4a6741] text-white">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                  </Button>
                                : <Button type="submit" className="w-full my-4 bg-[#4a6741] hover:bg-[#3a5233] text-white">
                                    Update
                                  </Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog