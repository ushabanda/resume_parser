// App.js

import React, { useState } from 'react';
import "./App.css"
const App = () => {
    const [error, setError] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const textToSpeech = (text) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speechSynthesis.speak(speech);
    };
    const handleParseResume = async (e) => {
        e.preventDefault();
        
        try {
            const resumeFileInput = document.getElementById('resumeFile');
            const resumeFile = resumeFileInput.files[0];

            const formData = new FormData();
            formData.append('resume', resumeFile);

            const response = await fetch('http://127.0.0.1:5000/resumeparse', {
                method: 'POST',
                body: formData,
            });
            

            if (response.ok) {
                const parsedData = await response.json();
                
                setParsedData(parsedData);
                console.log('Parsed Resume Data:', parsedData);
                if (parsedData.name) {
                    textToSpeech(`Hello ${parsedData.name}, AI fill all the details my name is saiprasad swain from odisha now i am working on truetalent internship my degree is bsc and now i am a frontend,and backend both fullstack developer with skills reactjs,php,nodejs,expressjs,mongodb,larabel and sql,python my father name is akshayaswain,he is from odisha now he is a teacher of truetalent.`);
                }
            } else {
                setError('Failed to parse resume');
            }
        } catch (error) {
            console.error('Error parsing resume:', error);
            setError('An error occurred while parsing the resume');
        }
    };

    return (
        <div>
            <form onSubmit={handleParseResume}>
                <label htmlFor="resumeFile">Upload Resume:</label>
                <input type="file" id="resumeFile" accept=".pdf,.doc,.docx" required />
                <button type="submit">Parse Resume</button>
            </form>

            {parsedData && (
                <div>
                    <h2>Contact Information:</h2>
                    <div>
                        <label>Email:</label>
                        <textarea id='email' value={parsedData.email} readOnly />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <textarea id='phone' value={parsedData.phone} readOnly />
                    </div>
                    <div>
                        <label>Name:</label>
                        <textarea id='name' value={parsedData.name} readOnly />
                    </div>
                    <div>
                        <label>Total Experience:</label>
                        <textarea id='exp' value={parsedData.total_exp} readOnly />
                    </div>
                    <div>
                        <label>University:</label>
                        <textarea id='uni' value={parsedData.university} readOnly />
                    </div>
                    <div>
                        <label>Designation:</label>
                        <textarea id='des' value={parsedData.designition} readOnly />
                    </div>
                    <div>
                        <label>Degree:</label>
                        <textarea id='deg' value={parsedData.degree} readOnly />
                    </div>
                    <div>
                        <label>Skills:</label>
                        <textarea id='ski' value={parsedData.skills} readOnly />
                    </div>
                    <div>
                        <label>Companies Worked At:</label>
                        <textarea id='com' value={parsedData.Companiesworkedat} readOnly />
                    </div>
                    <div>
                        <label>Projects:</label>
                        <textarea id='pro' value={parsedData.Projects} readOnly />
                    </div>
                    {/* <div id='email'>Email: {parsedData.email}</div>
                    <div id='phone'>Phone: {parsedData.phone}</div>
                   <div id='name'>Name:{parsedData.name}</div>
                   <div id='exp'>total_exp:{parsedData.total_exp}</div>
                   <div id='uni'>university:{parsedData.university}</div>
                   <div id='des'>designition:{parsedData.designition}</div>
                   <div id='deg'>degree:{parsedData.degree}</div>
                   <div id='ski'>skills:{parsedData.skills}</div>
                   <div id='com'>Companies worked at:{parsedData.Companiesworkedat}</div>
                   <div id='pro'>Projects:{parsedData.Projects}</div> */}
                </div>
            )}

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default App;

