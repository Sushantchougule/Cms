import React, { useEffect, useState } from 'react'

export const HtmlOptionToJson = () => {
    const [htmlOptions, setHtmlOptions] = useState("")
    const [options, setOptions] = useState({})
    const [jsonText, setJsonText] = useState("");

    const convertHtmlOptionsToJson = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlOptions, 'text/html');
        const optionElements = doc.querySelectorAll('option');
        const optionsTemp = Array.from(optionElements).map(option => ({
            value: option.getAttribute('value'),
            label: option.textContent.trim()
        }));
        setOptions(optionsTemp)
        setJsonText(JSON.stringify(optionsTemp, null, 2)); // Pretty print JSON
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsonText);
    };



    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <center>Html Options to Json</center>
                    <div className='row'>
                        <div className="col-md-11">
                            <textarea className='form-control' rows={10} value={jsonText} readOnly />
                        </div>
                        <div className="col-md-1">
                            <button onClick={copyToClipboard}>Cp</button>
                        </div>

                    </div>

                    <div className='row'>

                        <div className="col-md-11">
                            <textarea className='form-control' placeholder='html here' rows={10} onChange={((e) => (setHtmlOptions(e.target.value)))} />
                        </div>
                        <div className="col-md-1">
                            <button onClick={convertHtmlOptionsToJson}>Convert</button>
                        </div>


                    </div>

                </div>

            </div>


        </>
    )
}
