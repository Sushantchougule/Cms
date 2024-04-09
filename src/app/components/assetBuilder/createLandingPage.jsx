import { campaignState } from "@/app/atoms/campaign";
import { downloadPageState } from "@/app/atoms/downloadpage";
import { landingPageState } from "@/app/atoms/landingpage";
import { useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import { LandingPreview } from "./previews/landingPagePreview";
import { LpmLandingPreview } from "./previews/LPM/LpmLandingPreview";
import { Button } from 'react-bootstrap';
import { useCreateUrl } from "@/app/hooks/useCreateUrl";
import { formDataTemplateString } from "@/app/data/formDataTemplate";
import { contentTemplate } from "@/app/data/landingPageContentTemplate";
import { optinTemplate } from "@/app/data/optinTemplate";

export default function CreateLandingPage({ nextTab, clear }) {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [headerLogo, setHeaderLogo] = useState("")
    const [headerLogoFile, setHeaderLogoFile] = useState(null);
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState("")
    const [logoPreview, setLogoPreview] = useState("")
    const [formdata, setFormData] = useState(formDataTemplateString)
    const [privacy, setPrivacy] = useState("")
    const [optin, setOptin] = useState(optinTemplate)
    const [content, setContent] = useState(contentTemplate)
    const [landingpage, setLandingPage] = useRecoilState(landingPageState)
    const [imageHeight, setImageHeight] = useState('auto')
    const [imageWidth, setImageWidth] = useState('auto')
    const [previewDisabled, setPreviewDisabled] = useState(true)
    const [showLandingPreview, setShowLandingPreview] = useState(false)
    const [showLpmLandingPreview, setShowLpmLandingPreview] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [alert, setAlert] = useState(false)
    const tempUrl=useCreateUrl({ type: 'landingpage', title: title })
    

    useEffect(()=>(
        setUrl(tempUrl)
    ),[title])
    const scrollToTop=()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    const closeModal = () => {
        setShowLandingPreview(false)
    }
    const showModal = () => {
        if (landingpage.title) {
            setShowLandingPreview(true)
        }
    }
    const closeModalLpm = () => {
        setShowLpmLandingPreview(false)

    }
    const showLpmModal = () => {
        if (landingpage.title) {
            setShowLpmLandingPreview(true)
        }
    }
    const handleHeaderLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setHeaderLogoFile(file);
            setHeaderLogo(file.name)
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setLandingPage({
            title: title,
            url: url,
            data: "",
            formdata: formdata,
            campaignCode: "",
            downloadpageurl: "",
            headerLogoFile: new Blob([headerLogoFile], { type: `${headerLogoFile.type}` }),
            content: content,
            imageUrl: headerLogo,
            imageHeight: imageHeight,
            imageWidth: imageWidth,
            privacy: privacy,
            optin: optin,
            headerBackgroundColor: headerBackgroundColor
        })
        scrollToTop()
        setPreviewDisabled(false) 
    };
    const handleClear = () => {
        setLandingPage({
            title: "",
            url: "",
            data: "",
            formdata: "",
            campaignCode: "",
            downloadpageurl: "",
            headerLogoFile: "",
            content: "",
            imageUrl: "",
            imageHeight: "",
            imageWidth: "",
            privacy: "",
            optin: "",
            headerBackgroundColor: ""
        })
        clear('landingpage')
        setSelectedTemplate("")
        setAlert(false)
        setPreviewDisabled(true)
    };

    const handleNext = () => {
        if (selectedTemplate==""){
            setAlert(true)
        }
        else{
            setLandingPage({...landingpage,template:selectedTemplate})
            nextTab('mailer')
        }
    }
    return (
        <>
            <div className="container">
                <div className="row  mb-3 justify-content-center" >
                    <div className="col-md-12">
                        <div className="text-center mb-4">
                            <h3 style={{ fontWeight: '900' }}>Create landing Page</h3>
                        </div>
                        <div>
                            {alert && (
                                <div><h4>Please select a template</h4></div>
                            )}
                            <div className="d-flex mb-3" >
                                <div className="row " >
                                    <div className="col-md-5" >
                                        <div className="row" style={{ margin: 0, padding: 0, backgroundColor: 'white', border: '1px solid grey' }}>
                                            <h4>JBW</h4>
                                            <div className="col-md-6">
                                                <div className="row" >
                                                    <div className="col-md-1 pt-1 " style={{ border: '0' }}>

                                                        <input className="" onChange={((e) => setSelectedTemplate('jbw'))} type="checkbox" label="Checkbox Label" disabled={previewDisabled} />

                                                    </div>
                                                    <div className="col" style={{ paddingTop: '0.3rem' }}>
                                                        <span > Select</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 text-start">
                                                <Button variant="light" onClick={showModal} disabled={previewDisabled}>
                                                    Preview
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row" style={{ margin: 0, padding: 0, backgroundColor: 'white', border: '1px solid grey' }}>
                                            <h4>LPM </h4>
                                            <div className="col-md-6">
                                                <div className="row" >
                                                    <div className="col-md-1 pt-1 " style={{ border: '0' }}>
                                                        <input className="" onChange={((e) => setSelectedTemplate('lpm'))} type="checkbox" label="Checkbox Label" disabled={previewDisabled} />
                                                    </div>
                                                    <div className="col" style={{ paddingTop: '0.3rem' }}>
                                                        <span > Select</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 text-start">
                                                <Button variant="light" onClick={showLpmModal} disabled={previewDisabled}>
                                                    Preview
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-danger" disabled={previewDisabled} onClick={handleClear}>ClearData</button>
                                    </div>
                                </div>

                            </div>
                            {
                                showLandingPreview && !previewDisabled && (
                                    <>
                                        <LandingPreview temp={landingpage} closeModal={closeModal} />
                                    </>
                                )
                            }
                            {
                                showLpmLandingPreview && !previewDisabled && (
                                    <>
                                        <LpmLandingPreview temp={landingpage} closeModal={closeModalLpm} />
                                    </>
                                )
                            }
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    URL:
                                </div>
                                <div className="col" >
                                    <input className="form-control" type="text" value={url} onChange={e => setUrl(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Title:
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Title Background Color
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={headerBackgroundColor} onChange={e => setHeaderBackgroundColor(e.target.value)} />
                                </div>
                            </div>
                            <div className="row  mb-2">
                                <div className="col-md-3">
                                    Header Logo:
                                </div>
                                <div className="col">
                                    <input type="file" className="form-control" accept="image/*" onChange={handleHeaderLogoChange} required />
                                    {logoPreview && <img src={logoPreview} alt="Banner Preview" style={{ maxWidth: '100%', marginTop: '10px', marginTop: '10px', width: `${imageWidth}`, height: `${imageHeight}` }} />}
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Logo Height:
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={imageHeight} onChange={e => setImageHeight(e.target.value)} />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Logo Width:
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={imageWidth} onChange={e => setImageWidth(e.target.value)} />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Form Data:
                                </div>
                                <div className="col">
                                    <textarea rows={15} value={formdata} className="form-control" onChange={e => setFormData(e.target.value)} placeholder="Use Json " />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Content:
                                </div>
                                <div className="col">
                                    <textarea rows={10} value={content} className="form-control" onChange={e => setContent(e.target.value)} placeholder="Use Html " />
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className="col-md-3">
                                    Optin
                                </div>
                                <div className="col">
                                    <textarea rows={5} value={optin} className="form-control" onChange={e => setOptin(e.target.value)} placeholder="Use Html " />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <button className="btn btn-primary" style={{ width: '120px' }} type="submit">Save</button>
                                </div>
                                <div className='ms-auto'>
                                    <button className="btn " style={{ width: '120px', backgroundColor: 'orangered', color: 'white' }} onClick={handleNext}>Next</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

