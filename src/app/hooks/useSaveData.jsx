import React from 'react'
import { useRecoilState } from 'recoil';
import { downloadPageState } from '../atoms/downloadpage';
import { landingPageState } from '../atoms/landingpage';
import { mailerState } from '../atoms/mailer';

export const useSaveData = ({ type, data }) => {
    const [download, setDownload] = useRecoilState(downloadPageState)
    const [landingpage, setLandingPage] = useRecoilState(landingPageState)
    const [mailer, setMailer] = useRecoilState(mailerState)
    const saveData=(type,data)=>{
        switch(type){
            case 'download':
                setDownload(data)
                break;
            case 'landingpage':
                setLandingPage(data)
                break;
            case 'mailer':
                setMailer(data)
                break;
        }
    }
    return (
        <div>useSaveData</div>
    )
}



