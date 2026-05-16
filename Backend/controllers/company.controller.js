import {Company} from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const registerCompany = async(req,res)=>{
    try{
        const {companyName} =req.body;
        if(!companyName){
            return res.status(400).json({
                message:"company name is required",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register same company",
                success:false
            })
        };
        company = await Company.create({
            name:companyName,
            userId:req.id

        });
        return res.status(200).json({
            message:"company registered successfully",
            company,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

//get company
export const getCompany = async(req,res)=>{
    try{
        const userId = req.id;//logged in user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(484).json({
                message:"companies not found",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(484).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

//update company information
export const updateCompany = async(req,res)=>{
    try{
        const {name,description,website,location} = req.body;
        let updateData = {name,description,website,location};
        const file = req.file;
        if(file){  // ✅ check first add from cld
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }
        //cloudinary

        
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"comapny not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company information updated",
            company,
            success:true
        })

    }catch(error){
        console.log(error);

    }
}

export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ message: "Company not found", success: false });
        return res.status(200).json({ message: "Company deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};