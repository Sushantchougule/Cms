const formDataTemplate={
    "normalFields":
        [{ "id": "firstname", "type": "text", "label": "First Name" },
        { "id": "lastname", "type": "text", "label": "Last Name" },
        { "id": "email", "type": "text", "label": "Email" },
        { "id": "phonumber", "type": "text", "label": "Phonenumber" },
        { "id": "address", "type": "text", "label": "Address" },
        { "id": "city", "type": "text", "label": "City" },
        { "id": "postcode", "type": "text", "label": "Postalcode" },
        { "id": "company name", "type": "text", "label": "Company Name" },
        { "id": "job title", "type": "text", "label": "Job Title" },
        {
            "id": "country", "type": "select", "label": "Country", "options": [{ "value": "us", "label": "United States" },
            { "value": "ca", "label": "Canada" }, { "value": "uk", "label": "United Kingdom" }]
        },
        { "id": "industry", "type": "select", "label": "Industry", "options": [{ "value": "finance", "label": "Banking, Accounting, and Financial" }, { "value": "healthcare", "label": "Healthcare Services" }, { "value": "insurance", "label": "Insurance" }] },
        { "id": "subscribe", "type": "checkbox", "label": "Subscribe to newsletter" },
        { "id": "question", "type": "select", "label": "Pick any three", "options": [{ "value": "1", "label": "1" }, { "value": "2", "label": "2" }, { "value": "3", "label": "3" }] }],
    "specialFields":
        [{ "id": "question2", "type": "select", "label": "Pick any two", "options": [{ "value": "1", "label": "1" }, { "value": "2", "label": "2" }] }],
    "privacy":{
       "link":"",
       "companyName":""
    }
}

export const formDataTemplateString = JSON.stringify(formDataTemplate, null, 4);