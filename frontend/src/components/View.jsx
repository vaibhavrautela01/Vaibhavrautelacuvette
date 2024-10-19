import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header2';
import Sidebar from './Sidebar';
function View() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interviews'); // Ensure the URL is correct
        setInterviews(response.data);
      } catch (err) {
        console.error('Error fetching interviews:', err);
        setError('Failed to load interviews');
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <Header/>
        <Sidebar/>
       <div style={{position:"absolute",left:"90px",top:"140px"}}> 
      <h1>Interviews List</h1>
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id}>
            <h2>{interview.jobTitle}</h2>
            <p>{interview.jobDescription}</p>
            <p>Experience Level: {interview.experienceLevel}</p>
            <p>Course Level: {interview.courseLevel}</p>
            <p>End Date: {new Date(interview.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default View;
