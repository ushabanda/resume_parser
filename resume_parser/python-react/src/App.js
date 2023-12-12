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

            const response = await fetch('http://13.127.233.49:5000/resumeparse', {
                method: 'POST',
                body: formData,
                mode: 'cors',
            });
            

            if (response.ok) {
                const parsedData = await response.json();
                
                setParsedData(parsedData);
                console.log('Parsed Resume Data:', parsedData);
<<<<<<< HEAD
                if (parsedData.name) {
                    //textToSpeech(Hello ${parsedData.name}, AI fill all the details my name is saiprasad swain from odisha now i am working on truetalent internship my degree is bsc and now i am a frontend,and backend both fullstack developer with skills reactjs,php,nodejs,expressjs,mongodb,larabel and sql,python my father name is akshayaswain,he is from odisha now he is a teacher of truetalent.);
=======
                if (parsedData.first_name) {

                    textToSpeech(`Hello ${parsedData.first_name}, Welcome to truetalent indias no1 hairing platform thanks for your interest with our platform. Here are some details from your resume: Email: ${parsedData.email}, Phone: ${parsedData.phone}, Skills: ${parsedData.skills}, Profile Summary: ${parsedData.objective}. AI has filled in all your resume details.`);

                    // textToSpeech(`Hello ${parsedData.first_name}, Welcome to truetalent indias no1 job search platform thanks for your interest with our platform. Here are some details from your resume: Email: ${parsedData.email}, Phone: ${parsedData.phone}, Skills: ${parsedData.skills}, Profile Summary: ${parsedData.objective}. AI has filled in all your resume details.`);

        
>>>>>>> 53330e62fa587e7a3ee93ae3b26bc10405c2e4fc
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
                        <label>First name:</label>
                        <textarea id='nam' value={parsedData.first_name} readOnly />
                    </div>
                    <div>
                        <label>last name:</label>
                        <textarea id='nme' value={parsedData.last_name} readOnly />
                    </div>
                    <div>
                        <label>Email:</label>
                        <textarea id='email' value={parsedData.email} readOnly />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <textarea id='phone' value={parsedData.phone} readOnly />
                    </div>
                    <div>
                        <label>Profile summery</label>
                        <textarea id='uni' value={parsedData.objective} readOnly />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label>First name:</label>
                        <textarea id='name' value={parsedData.first_name} readOnly />
                    </div>
                    <div>
                        <label>last name:</label>
                        <textarea id='name' value={parsedData.last_name} readOnly />
=======
                        <label>Skills:</label>
                        <textarea id='ski' value={parsedData.skills} readOnly />
>>>>>>> 53330e62fa587e7a3ee93ae3b26bc10405c2e4fc
                    </div>
                    <div>
                        <label>Objective:</label>
                        <textarea id='des' value={parsedData.objective} readOnly />
                    </div>
                    <div>
<<<<<<< HEAD
                        <label>Skills:</label>
                        <textarea id='ski' value={parsedData.skills} readOnly />
                    </div>
=======
                        <label>Address:</label>
                        <textarea id='pro' value={parsedData.address_components} readOnly />
                    </div>
                    <div>
                        <label>University:</label>
                        <textarea id='uni' value={parsedData.university} readOnly />
                    </div> */}
                   
                    {/* <div>
                        <label>Designation:</label>
                        <textarea id='des' value={parsedData.designition} readOnly />
                    </div>
                    <div>
                        <label>Degree:</label>
                        <textarea id='deg' value={parsedData.degree} readOnly />
                    </div> */}
                    
                    {/* <div>
                        <label>Companies Worked At:</label>
                        <textarea id='com' value={parsedData.Companiesworkedat} readOnly />
                    </div>
                    <div>
                        <label>Projects:</label>
                        <textarea id='pro' value={parsedData.Projects} readOnly />
                    </div> */}
                    
>>>>>>> 53330e62fa587e7a3ee93ae3b26bc10405c2e4fc
                </div>
            )}

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default App;