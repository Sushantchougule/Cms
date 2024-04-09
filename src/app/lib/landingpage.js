import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// Get a single blog by ID
export const getLandingPage = async (url) => {
  try {
    const data = await prisma.landingpage.findFirst({
      where: { url: url },
      include:{
        campaign:true
      }
    });
    if (!data) {
      throw new Error("Blog not found");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch the blog");
  }
};

export const addLandingPageData = async (url, data) => {
  try {

    const landingpage = await prisma.landingpage.findFirst({
      where: { url: url },
      include: {
        campaign: true
      }
    });

    const jsonData = JSON.parse(data)
    // Parse existing JSON data or initialize an empty array if it doesn't exist yet
    const existingData = landingpage.data ? JSON.parse(landingpage.data) : [];

    // Append new JSON data to the existing array
    existingData.push(jsonData);

    // Stringify the updated array
    const updatedData = JSON.stringify(existingData);

    // Update the landing page record with the new data
    const updatedLandingPage = await prisma.landingpage.update({
      where: {
        id: landingpage.id,
        url: url
      },
      data: {
        data: updatedData
      }
    });
    return updatedLandingPage
  } catch (error) {
    throw new(error)
    console.error('Error appending data to landing page:', error);
  }
}

export const addLandingPage=async (data)=>{
 
  try{
    const landingpage = await prisma.landingpage.create({
      data:data
    });

    return landingpage;

  }
  catch(e){
    console.log(e,'error adding landingpage')
    
  }


}



export const imageExist=async(imageSrc)=>{
    try{
      const image=await prisma.landingpage.findFirst({
        where:{
          imageUrl:imageSrc
        }
      })
      return image ? true :false
    }
    catch(e){   
      console.log(e)
      return false;
    }
}