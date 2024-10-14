import React, { useState } from 'react';
import Axios from 'axios';
import './ReportComplaint.css';
import Map from '../Images/Map.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
export default function ReportComplaint() {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleShareLiveLocation = () => {
    // Open Google Maps URL for sharing live location
    window.open('https://www.google.com/maps');
  };

  const handleChooseLocationOnMap = () => {
    // Open Google Maps URL for choosing location on map
    window.open('https://www.google.com/maps');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to report the complaint
      const response = await Axios.post('http://localhost:8080/analyze-image', {
        type,
        location,
        description,
        image,
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error reporting complaint:', error);
      // Handle error response
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="content-container">
          <Sidebar />
          <div className="main-content">
            <h1>Report a Complaint</h1>
            <div className="complaint-type">
              <button className="text-complaint">Text Complaint</button>
              <button className="image-complaint">
                <Link to="/ImageComplaint">Image Complaint</Link>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="problem">
                <span>Problem</span>
              </div>
              <div className="description">
                <textarea
                  name="description-area"
                  id="description"
                  cols="50"
                  rows="9"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="location-type">
                <span>
                  <button onClick={handleShareLiveLocation}>
                    Share live location
                  </button>
                  <button onClick={handleChooseLocationOnMap}>
                    Choose location on map
                  </button>
                </span>
              </div>
              <div className="map">
                <img src={Map} alt="Map image" />
              </div>
              <div className="checkbox">
                <span>
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    value="anonymous"
                  />
                  <label htmlFor="anonymous"> Report Anonymously?</label>
                  <br />
                </span>
                <span>
                  <input
                    type="checkbox"
                    id="contact"
                    name="contact"
                    value="contact"
                  />
                  <label htmlFor="contact">
                    {' '}
                    Add your contact number(For additional details, the
                    government authority may contact you directly)
                  </label>
                </span>
              </div>
              <div className="submit">
                <button type="submit">Submit Complaint</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
