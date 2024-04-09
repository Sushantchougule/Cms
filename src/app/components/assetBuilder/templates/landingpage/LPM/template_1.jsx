import React, { useEffect } from 'react'
import { Navigation } from '@/app/components/navigation';
import { Newfooter } from '@/app/components/newfooter';
import { useState } from 'react';
import DynamicFormNew from '@/app/components/dynamicForm/dynamicFormNew';

export const LpmLandingPageTemplate_1 = ({ temp }) => {
    const [data, setData] = useState(temp)
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#8596b0")
    useEffect(() => {
        if (data.headerBackgroundColor != "") setHeaderBackgroundColor(data.headerBackgroundColor);
    }, [data.headerBackgroundColor])
    return (
        <>
            <div className="d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: '#ffffff', boxShadow: '' }}> 
                <main className="flex-grow-1" style={{ backgroundColor: '#f3f4f6' }}>
                    <div className="row justify-content-center mt-5 mb-5">
                        <div className="col-md-10">
                            <div className="text-center">
                                <img src={`/campaign/logos/${data.logoSrc}`} style={{ height: data.logoHeight, width: data.logoWidth }} />

                            </div>
                            <div
                                className="mb-4"
                                style={{ backgroundColor: headerBackgroundColor, padding: "1em", margin: "1em 0" }}
                            >
                                <h3
                                    className="pt-2 pb-2 text-center"
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 40,
                                        fontWeight: 500,
                                        marginBottom: "0.5rem",
                                        fontFamily:
                                            'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                                    }}
                                >
                                    {data.title}
                                </h3>
                            </div>
                            <div
                                className="row "
                                style={{ letterSpacing: "normal", wordSpacing: "normal" }}
                            >
                                <div className="col-md-6">
                                    <div className="m-3" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
                                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4
                                        className="mb-2"
                                        style={{
                                            fontSize: 28,
                                            color: "#000000",
                                            fontWeight: 500,
                                            letterSpacing: "normal",
                                            wordSpacing: "normal",
                                            paddingBottom: 10,
                                            lineHeight: "33.6px",
                                            fontFamily:
                                                'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                                        }}
                                    >
                                        Please fill out the form below to download.
                                    </h4>
                                    <p
                                        className="mb-3"
                                        style={{
                                            color: "#000000",
                                            fontSize: "12.8px",
                                            paddingBottom: 10,
                                            lineHeight: "19.2px",
                                            fontFamily:
                                                'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                                        }}
                                    >
                                        *Required fields
                                    </p>
                                    <DynamicFormNew landingpageurl={data.url} downloadpageurl={data.downloadpageurl}  data={JSON.parse(data.formdata)} optin={data.optin} buttonBgColor={headerBackgroundColor} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
              
            </div>

        </>
    );
}




