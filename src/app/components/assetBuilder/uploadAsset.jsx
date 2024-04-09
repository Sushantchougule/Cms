import { campaignState } from '@/app/atoms/campaign'
import { downloadPageState } from '@/app/atoms/downloadpage'
import { landingPageState } from '@/app/atoms/landingpage'
import { mailerState } from '@/app/atoms/mailer'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'



export const UploadAsset = () => {
  const [mailer, setMailer] = useRecoilState(mailerState)
  const [downloadPage, setDownloadPage] = useRecoilState(downloadPageState)
  const [landingPage, setLandingPage] = useRecoilState(landingPageState)
  const [campaign, setCampaign] = useRecoilState(campaignState)
  const [mailerData, setMailerData] = useState({})
  const [landingPageData, setLandingPageData] = useState({})
  const [downloadPageData, setDownloadPageData] = useState({})
  const [logo, setLogo] = useState(null)
  const [mailerBanner, setMailerBanner] = useState(null)
  const [downloadBanner, setDownloadBanner] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [alert, setAlert] = useState("")

  useEffect(() => {
    parseMailerData();
    parseDownloadPageData();
    parseLandingPageData();
    setPdfFile(downloadPage.pdf)
    setDownloadBanner(downloadPage.banner)
    setMailerBanner(mailer.banner)
    setLogo(landingPage.headerLogoFile)
  }, [mailer, downloadPage, landingPage])

  const parseMailerData = () => {
    const temp = {
      url: mailer.url,
      title: mailer.title,
      campaignCode: campaign.code,
      content: mailer.content,
      landingpageurl: landingPage.url,
      imageUrl: mailer.imageUrl,
      imageHeight: mailer.imageHeight,
      logoSrc: landingPage.imageUrl,
      logoHeight: landingPage.imageHeight,
      logoWidth: landingPage.imageWidth,
      template: mailer.template,
      unsubscribe: mailer.unsubscribe,
      privacy: mailer.privacyLink,
      updateProfile: mailer.updateProfile,
      footer: mailer.footer,
    }
    setMailerData(temp)
  }
  const parseLandingPageData = () => {
    const temp = {
      url: landingPage.url,
      title: landingPage.title,
      campaignCode: campaign.code,
      data: "",
      formdata: landingPage.formdata,
      downloadpageurl: downloadPage.url,
      content: landingPage.content,
      logoSrc: landingPage.imageUrl,
      logoHeight: landingPage.imageHeight,
      logoWidth: landingPage.imageWidth,
      template: landingPage.template,
      headerBackgroundColor:landingPage.headerBackgroundColor,
      optin:landingPage.optin,

    }
    setLandingPageData(temp)
  }
  const parseDownloadPageData = () => {
    const temp = {
      url: downloadPage.url,
      title: downloadPage.title,
      campaignCode: campaign.code,
      imageUrl: downloadPage.imageUrl,
      imageHeight: downloadPage.imageHeight,
      imageWidth: downloadPage.imageWidth,
      logoSrc: landingPage.imageUrl,
      logoHeight: landingPage.imageHeight,
      logoWidth: landingPage.imageWidth,
      link: downloadPage.link,
      pdfSrc: downloadPage.pdfSrc
    }
    setDownloadPageData(temp)
  }
  const uploadFunction = async (file, type) => {
    console.log('file', file)
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`/api/upload/${type}`, {
      method: 'POST',
      body: formData,
    });
    return response;
  }
  const postData = async (data, type) => {
    try {
      const response = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return response;
    } catch (e) {
      setAlert(`error uploading ${type}`)
    }
  }
  const uploadCampaign = async () => {
    console.log(campaign.code, campaign.name)
    try {
      if (campaign.name === "" && campaign.code === "") return;
      if (campaign.code !== "" && campaign.name == "") { campaignUploadStatus.current = true }
      else {
        let temp = {
          name: campaign.name,
          code: campaign.code,
        }
        const uploadCampaignResponse = await postData(temp, 'campaign')
      }
    }
    catch (e) {
      console.log(e)
      setAlert("error uploading campaign")
    }
  }
  const uploadLogo = async () => {
    const fileExtension = landingPage.imageUrl.split('.').pop();
    if (logo instanceof Blob) {
      const file = new File([logo], landingPage.imageUrl);
      const logoUploadResponse = await uploadFunction(file, 'logos')
      if (logoUploadResponse.ok) {
        setAlert("Logo uploaded")
      }
    }
    else {
      setAlert("please upload logo again in landing page ")
    }
  }
  const uploadDownloadBanner = async () => {
    if (downloadBanner instanceof Blob) {
      const file = new File([downloadBanner], downloadPage.imageUrl);
      console.log(file); // Verify the File object
      const downloadBannerUploadResponse = await uploadFunction(file, 'downloadbanners')

      if (downloadBannerUploadResponse.ok) {
        setAlert("Download banner uploaded")
      }
    }
    else {
      setAlert("please upload Download Banner  ")
    }
  }
  const uploadPdf = async () => {
    if (pdfFile instanceof Blob) {
      const file = new File([pdfFile], downloadPage.pdfSrc);
      console.log(file); // Verify the File object
      const downloadPdfUploadResponse = await uploadFunction(file, 'whitepapers')
      if (downloadPdfUploadResponse.ok) {
        setAlert("pdf uploaded")
      }
    }
    else {
      setAlert("Error uploading pdf")
    }
  }
  const uploadMailerBanner = async () => {
    if (mailerBanner instanceof Blob) {
      const file = new File([mailerBanner], mailer.imageUrl);
      const mailerUploadResponse = await uploadFunction(file, 'mailerbanners')
      if (mailerUploadResponse.ok) {
        setAlert('mailer banner uploaded')
      }
    }
    else {
      setAlert("Error uploading mailer banner ")
    }
  }
  const uploadLandingPage = async () => {
    const uploadLandingPageResponse = await postData(landingPageData, 'landingpage')
    if (uploadLandingPageResponse.ok) {
      setAlert("landing page uploaded")
    }
  }
  const uploadDownloadPage = async () => {
    const uploadDownloadDataResponse = await postData(downloadPageData, 'downloadpage')
    if (uploadDownloadDataResponse.ok) {
      setAlert("download page uploaded")
    }
  }
  const uploadMailer = async () => {
    const uploadMailerResponse = await postData(mailerData, 'mailer')
    if (uploadMailerResponse.ok) {
      setAlert("mailer uploaded")
    }
  }
  const uploadAll = async () => {
    await uploadCampaign()
    await uploadLogo()
    await uploadDownloadBanner()
    if (pdfFile != "") {
      await uploadPdf()
    }
    await uploadMailerBanner()
    await uploadDownloadPage()
    await uploadLandingPage()
    await uploadMailer()
    setAlert("Asset uploaded")
  }
  return (
    <div>
      {alert && (
        <>{alert}</>
      )}
      <div className='row justify-content-center'>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-10">
              Upload Asset(Download Page,Landing Page,Mailer)
            </div>
            <div className='col-md-2'>
              <button className="btn btn-primary" style={{ width: '140px' }} onClick={uploadAll}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}
