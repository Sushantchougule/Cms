import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { CreateCampaign } from './createCampaign';
import CreateLandingPage from './createLandingPage';
import { CreateMailer } from './createMailer';
import { CreateDownloadPage } from './createDownloadPage';
import { UploadAsset } from './uploadAsset';
import { useRecoilState, useRecoilValue } from 'recoil'
import { campaignState } from '@/app/atoms/campaign';
import { downloadPageState } from '@/app/atoms/downloadpage';
import { mailerState } from '@/app/atoms/mailer';
import { landingPageState } from '@/app/atoms/landingpage';


export const Main = () => {
    const [key, setKey] = useState('campaign');
    const [campaign, setCampaign] = useRecoilState(campaignState)
    const [downloadpage, setDownloadPage] = useRecoilState(downloadPageState)
    const [mailer, setMailer] = useRecoilState(mailerState)
    const [landingpage, setLandingPage] = useRecoilState(landingPageState)
    const [downloadDisabled, setDownloadDisabled] = useState(true)
    const [landingPageDisabled, setLandingPageDisabled] = useState(true)
    const [mailerDisabled,setMailerDisabled]=useState(true)
    const [uploadDisabled,setUploadDisabled]=useState(true)

    const next = (tab) => {
        if (tab == "downloadpage") {
            setKey('downloadpage')
            setDownloadDisabled(false)
        }
        if (tab == "landingpage") {
            setKey('landingpage')
            setLandingPageDisabled(false)
        }
        if (tab=='mailer'){
            setKey('mailer')
            setMailerDisabled(false)
        }
        if (tab=="upload"){
            setKey("upload")
            setUploadDisabled(false)
            
        }
    }

    const cleared = (type) => {
        if (type == "campaign") {
            setDownloadDisabled(true)
            setLandingPageDisabled(true)
            setMailerDisabled(true)
            setUploadDisabled(true)
        }
        if (type == "downloadpage") {
            setLandingPageDisabled(true)
            setMailerDisabled(true)   
            setUploadDisabled(true)  
        }
        if (type == "landingpage") {
            console.log('landingpage cleared')
            setMailerDisabled(true)     
            setUploadDisabled(true)
        }
        if (type=="mailer"){
            setUploadDisabled(true)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className='text-center'>
                        <h3 className='mt-5 mb-3'>Asset Builder</h3>
                    </div>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3 justify-content-center"
                    >
                        <Tab eventKey="campaign" title={<span>Campaign<BsArrowRight className='ms-1' /></span>}  >
                            <CreateCampaign nextTab={next} clear={cleared} suppressHydrationWarning />
                        </Tab>

                        <Tab eventKey="downloadpage" title={<span>Download Page<BsArrowRight className='ms-1' /></span>} disabled={downloadDisabled}  suppressHydrationWarning>
                            <CreateDownloadPage nextTab={next} clear={cleared} />
                        </Tab>

                        <Tab eventKey="landingpage" title={<span>Landing Page<BsArrowRight className='ms-1' /></span>} disabled={landingPageDisabled}  suppressHydrationWarning >
                            <CreateLandingPage  nextTab={next} clear={cleared}/>
                        </Tab>


                        <Tab eventKey="mailer" title={<span>Mailer<BsArrowRight className='ms-1' /></span>} disabled={mailerDisabled}  suppressHydrationWarning >
                            <CreateMailer   nextTab={next} clear={cleared}/>
                        </Tab>

                        <Tab eventKey="upload"  title={<span>Upload<BsArrowUp className='ms-1'  /></span>} disabled={uploadDisabled} suppressHydrationWarning >
                            <UploadAsset />
                        </Tab>
                    </Tabs>

                </div>
            </div>


        </div>
    )
}
