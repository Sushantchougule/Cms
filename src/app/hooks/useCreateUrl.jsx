import React, { useState } from 'react'

export const useCreateUrl = ({ type, title }) => {
    const [url, setUrl] = useState('')
    const replaceAndStrip = (sentence) => {
        const strippedSentence = sentence.replace(/[\s\-_:;]/g, '-');
        return strippedSentence.toLowerCase();
    }
    const createUrl=()=>{
        switch(type){
            case "mailer":
                return replaceAndStrip(title)+'-mailer'
                break;
            case 'landingpage':
                return replaceAndStrip(title)+'-landing-page'
                break
            case 'downloadpage':
                return replaceAndStrip(title)+'-download-page'
                break
        }
    }
    const urlValue = createUrl();
    return urlValue;
}
