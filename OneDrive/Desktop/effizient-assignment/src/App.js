import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    age: '',
    highestEducation: '',
    institute: '',
    fieldOfStudy: '',
    workExperience: 'None',
    jobTitle: '',
    companyName: '',
    jobDuties: '',
    canadaAdmissionInstitute: '',
    programInCanada: '',
    applyingCountry: '',
    futureGoals: '',
    englishListening: '',
    englishReading: '',
    englishSpeaking: '',
    englishWriting: '',
    paidFirstYearTuition: 'No',
    tuitionFeeAmount: '',
    didGIC: 'No',
    gicAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container">
      <div className="logo">EFFIZIENT</div>
      <div className="header-box">
      <h1>Customized SOP Generator</h1>
      <p>
        Fill this questionnaire for the student. After submitting, you will
        receive an email at the email address that you have provided with a
        Statement of Purpose customized for you. You can use and modify that as
        per your needs.
      </p>
      <p>* Indicates required field</p>
      </div>
      <form onSubmit={handleSubmit} className="google-form">
        <div className="question-box">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="question-box">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="question-box">
          <label>Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="question-box">
          <label>Highest Level of Education *</label>
          <select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            required
          >
            <option value="">Select one</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            {/* We can Add more options as needed */}
          </select>
        </div>
        <div className="question-box">
          <label>
            Institute where you completed your highest level of education *
          </label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            required
          />
        </div>
        <div className="question-box">
          <label>What did you study *</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="question-box">
          <label>Do you have any relevant work experience?</label>
          <select
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.workExperience === 'Yes' && (
          <div className="question-box">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.workExperience === 'Yes' && (
          <div className="question-box">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.workExperience === 'Yes' && (
          <div className="question-box">
            <label>Job Duties</label>
            <textarea
              name="jobDuties"
              value={formData.jobDuties}
              onChange={handleChange}
            ></textarea>
          </div>
        )}
        <div className="question-box">
          <label>What institute did you get admitted to in Canada?</label>
          <input
            type="text"
            name="canadaAdmissionInstitute"
            value={formData.canadaAdmissionInstitute}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>What is your program of study in Canada?</label>
          <input
            type="text"
            name="programInCanada"
            value={formData.programInCanada}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>Which country are you applying from?</label>
          <input
            type="text"
            name="applyingCountry"
            value={formData.applyingCountry}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>What are your future goals?</label>
          <textarea
            name="futureGoals"
            value={formData.futureGoals}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="question-box">
          <label>English Scores - Listening</label>
          <input
            type="text"
            name="englishListening"
            value={formData.englishListening}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>English Scores - Reading</label>
          <input
            type="text"
            name="englishReading"
            value={formData.englishReading}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>English Scores - Speaking</label>
          <input
            type="text"
            name="englishSpeaking"
            value={formData.englishSpeaking}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>English Scores - Writing</label>
          <input
            type="text"
            name="englishWriting"
            value={formData.englishWriting}
            onChange={handleChange}
          />
        </div>
        <div className="question-box">
          <label>Did you pay your first year tuition?</label>
          <select
            name="paidFirstYearTuition"
            value={formData.paidFirstYearTuition}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.paidFirstYearTuition === 'Yes' && (
          <div className="question-box">
            <label>How much tuition fee did you pay?</label>
            <input
              type="number"
              name="tuitionFeeAmount"
              value={formData.tuitionFeeAmount}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="question-box">
          <label>Did you do a GIC?</label>
          <select
            name="didGIC"
            value={formData.didGIC}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.didGIC === 'Yes' && (
          <div className="question-box">
            <label>How much did you pay towards GIC?</label>
            <input
              type="number"
              name="gicAmount"
              value={formData.gicAmount}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

