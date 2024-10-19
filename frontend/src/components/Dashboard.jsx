import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import './Dashboard.css';
import Header from './Header2';
import Sidebar from './Sidebar'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [courseLevel, setCourseLevel] = useState(''); // Changed to courseLevel
  const [endDate, setEndDate] = useState('');

  const handleCreateButtonClick = () => {
    setShowForm(true);  // Show the form when the button is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const interviewData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      courseLevel, // Changed to courseLevel
      endDate,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/interviews', interviewData); // Use localhost for local development
      console.log('Interview created:', response.data);
      // Optionally, reset form fields and hide form after submission
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setCourseLevel(''); // Reset courseLevel
      setEndDate('');
      setShowForm(false);  // Hide the form after submission
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  return (
    <div className="app-container">
      <Header/>
      <div className="main-content">
        <Sidebar/>
        <div className="content">
          {!showForm && (
            <button className="create-button" onClick={handleCreateButtonClick}>
              Create Interview
            </button>
          )}
          {showForm && (
            <form className="form-container" onSubmit={handleSubmit}>
              <h2>Create Interview</h2>
              <div className="form-group">
                <label className='title'>Job Title</label>
                <input
                  type="text"
                  className='title2'
                  placeholder="Enter Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className='title'>Job Description</label>
                <textarea
                  className='title2'
                  placeholder="Enter Job Description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label className='title'>Experience Level</label>
                <select
                  className='title2'
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div className="form-group">
                <label className='title'>Course Level</label> {/* Changed label */}
                <input
                  type="text" // Changed to text input for course level
                  className='title2'
                  placeholder="Enter Course Level"
                  value={courseLevel} // Changed to courseLevel
                  onChange={(e) => setCourseLevel(e.target.value)} // Changed to courseLevel
                  required
                />
              </div>
              <div className="form-group">
                <label className='title'>End Date</label>
                <input
                  type="date"
                  className='title2'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="send-button">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
