import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const DynamicFormNew = ({ data, landingpageurl, downloadpageurl, optin,buttonBgColor }) => {
    const router = useRouter();
    const [buttonBackgroundColor,setButtonBackgroundColor]=useState('#8596b0')
    const [formData, setFormData] = useState(data);
    const [formValues, setFormValues] = useState({});
    const handleInputChange = (fieldName, value) => {
        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    useEffect(()=>{
         setButtonBackgroundColor(buttonBgColor)
    },[])


    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/landingpage/${landingpageurl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            console.log(response)
            if (response.status == 200) {
                router.push(`/dp/${downloadpageurl}`);
                setFormValues({});
            } else {
                console.error('Form submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <div className='col'>

            <form onSubmit={(e) => postData(e)} style={{
                fontSize: '16px', fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
            }}>
                {formData.normalFields && formData.normalFields.map(field => (
                    <div key={field.id} className='mb-2'>
                        <div className="">

                            {field.type === 'text' && (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label style={{
                                                fontSize: '16px', fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                            }} htmlFor={field.id}>{field.label}</label>
                                        </div>

                                        <div className="col">
                                            <input
                                                type="text"
                                                id={field.id}
                                                name={field.id}
                                                value={formValues[field.id] || ''}
                                                className='form-control'
                                                required
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {field.type === 'checkbox' && (
                                <>
                                    <div className="row">


                                        <div className="col-md-3">
                                            <label style={{
                                                fontSize: '16px', fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                            }} htmlFor={field.id}>{field.label}</label>
                                        </div>

                                        <div className="col">
                                            <input
                                                type="checkbox"
                                                id={field.id}
                                                name={field.id}
                                                className='form-check-input'
                                                required
                                                checked={formValues[field.id] || false}
                                                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {field.type === 'select' && (
                                <>
                                    <div className="row">

                                        <div className="col-md-3">
                                            <label style={{
                                                fontSize: '16px', fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                            }} htmlFor={field.id}>{field.label}</label>
                                        </div>
                                        <div className="col">


                                            <select
                                                id={field.id}
                                                name={field.id}
                                                className='form-select'
                                                value={formValues[field.id] || ''}
                                                required
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            >
                                                <option value="">Select an option</option>
                                                {field.options.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}


                {formData.specialFields && formData.specialFields.map(field => (
                    <>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div key={field.id} className='mb-2'>
                            <div className="">

                                {field.type === 'text' && (
                                    <>
                                        <div className="">
                                            <div className="mb-2">
                                                <label style={{
                                                    fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                                }} htmlFor={field.id}>{field.label}</label>
                                            </div>

                                            <div className="">
                                                <input
                                                    type="text"
                                                    id={field.id}
                                                    name={field.id}
                                                    value={formValues[field.id] || ''}
                                                    className='form-control'
                                                    required
                                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {field.type === 'checkbox' && (
                                    <>
                                        <div className="">
                                            <div className="mb-2">
                                                <label style={{
                                                    fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                                }} htmlFor={field.id}>{field.label}</label>
                                            </div>

                                            <div className="">
                                                <input
                                                    type="checkbox"
                                                    id={field.id}
                                                    name={field.id}
                                                    className='form-check-input'
                                                    required
                                                    checked={formValues[field.id] || false}
                                                    onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {field.type === 'select' && (
                                    <>
                                        <div className="">

                                            <div className="mb-2">
                                                <label style={{
                                                    fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '500'
                                                }} htmlFor={field.id}>{field.label}</label>
                                            </div>
                                            <div className="">


                                                <select
                                                    id={field.id}
                                                    name={field.id}
                                                    className='form-select'
                                                    value={formValues[field.id] || ''}
                                                    required
                                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                >
                                                    <option value="">Select an option</option>
                                                    {field.options.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    </>
                ))}
                <br></br>
                <hr></hr>
                <br></br>

                <div
                    className="form-control mb-4"
                    style={{ display: "flex", flexDirection: "column", backgroundColor: 'transparent', border: '0', fontSize: '16px', fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                >
                    <p style={{ backgroundColor: 'transparent', border: '0', fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                        By submitting, person agrees to {data.privacy.companyName} processing their info and
                        contacting them with regards to the event. You may unsubscribe at any time.
                        {data.privacy.companyName} web sites and communications are subject to their
                        <a href={data.privacy.link} style={{ textDecoration: "None" }}> Privacy Notice</a>.
                        <br /> <br />
                        To comply with the new GDPR regulations and ensure you continue to receive
                        relevant communications from {data.privacy.companyName} on our offerings and future events,
                        we are updating our communication preferences.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'  }}>
                        <input
                            style={{ width: "fit-content", margin: "revert" }}
                            type="checkbox"
                            name="authorize_check_me"
                            required=""
                            id="email-me-check"
                        />
                        <p style={{ marginLeft: 10, marginTop: 20, marginBottom: 0 , fontSize: '16px', fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
                            Yes, I agree to the data protection declaration of {data.privacy.companyName} and
                            or/it's affiliates.
                        </p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: optin }}></div>
                </div>




                <button className='btn ' style={{ backgroundColor:buttonBackgroundColor, width: '140px', color: 'white' }} type='submit' >Download</button>
            </form>
        </div>
    );
}

export default DynamicFormNew;

