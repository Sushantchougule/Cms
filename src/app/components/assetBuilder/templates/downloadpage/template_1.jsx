import React, { use, useEffect } from 'react'

import Link from 'next/link';
import { useState } from 'react';

export const DownloadPageTemplate_1 = ({ temp }) => {
    const [data, setData] = useState(temp)
    const [pdfSrc, setPdfSrc] = useState("")
    const [link, setLink] = useState("")

    useEffect(() => {
        setData(temp)
        if (data.pdfSrc != "") {
            setPdfSrc(data.pdfSrc)
        }
        else {
            setLink(data.link)
        }

    }, [temp, data])

    return (
        <>
            <div>               
                    <div className=''>
                        <div className="row justify-content-center mt-4 mb-5">
                            <div className="col-md-6 pb-5" style={{backgroundColor:'white'}}>
                                <div className=''>
                                    <center>
                                        {
                                          pdfSrc!="" && (
                                            <>
                                               <a href={`/campaign/whitepapers/${pdfSrc}`}  download={`${pdfSrc}`}>
                                                <img src={`/campaign/downloadbanners/${data.imageUrl}`} style={{ maxWidth: '100%', marginTop: '10px', width: `${data.imageWidth}`, height: `${data.imageHeight}` }} />
                                                </a>
                                            </>
                                          )  
                                        }
                                        {
                                            link!="" && (
                                                <a href={link} ><img src={`/campaign/downloadbanners/${data.imageUrl}`} style={{ maxWidth: '100%', marginTop: '10px', width: `${data.imageWidth}`, height: `${data.imageHeight}` }} /></a>
                                            )
                                        }
                                        
                                        </center>
                                </div>
                            </div>
                        </div>
                    </div>
            
              

            </div >

        </>
    );
}

