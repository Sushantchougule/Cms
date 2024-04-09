import {getMailer } from "@/app/lib/mailer";
import { convertToJson } from "@/app/middleware/convertToJson";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req,{params}) => {
    try{
        const url=params.url
        const mailer=await getMailer(url)
        console.log(mailer)
        return NextResponse.json(mailer,{status:200})
    }
    catch(error){
          console.log(error)
          return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
};



