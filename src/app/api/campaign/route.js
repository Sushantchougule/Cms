import { NextResponse,NextRequest } from "next/server";
import { getCampaignCodesWithLabels,getCampaigns,updateCampaign,addCampaign } from "@/app/lib/campaign";

export const GET = async (req, res) => {
    try {
        const campaigns = await getCampaignCodesWithLabels()
        return  NextResponse.json({campaigns:campaigns} ,{ status: 200 })
    }
    catch (error) {
        console.log(error)
        return  NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
};

export const POST = async (req, res) => {
    try{
        const requestBody = await req.text();
        const data=JSON.parse(requestBody)
        console.log(data)
        const newCampaign=await addCampaign(data)
        return  NextResponse.json({message:"New Campaign"},{status:201})
    }
    catch(error){
        console.log(error)
        return  NextResponse.json({message:"Internal server error"},{status:500})
    }
};
