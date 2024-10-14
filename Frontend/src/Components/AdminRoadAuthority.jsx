import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AuthoritySidebar from './AuthoritySidebar';
import { imageDb } from './utils/firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

const AdminRoadAuthority = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Storage
    const fetchData = async () => {
      try {
        const imagesRef = ref(imageDb, 'files'); // Update the path to your storage
        const imageList = await listAll(imagesRef);
        const urls = await Promise.all(
          imageList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, name: item.name };
          })
        );
        setImageURLs(urls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="center-text">
        <p className="big-font">Road Development Authority</p>
      </div>

      <div className="authority-table-container">
        <div>
          <AuthoritySidebar />
        </div>

        <div>
          {/* Buttons */}
          <div className="button-row">
            <button
              className={`button ${activeButton === 1 ? 'active' : ''}`}
              onClick={() => handleButtonClick(1)}
            >
              Complaints
            </button>
            <button
              className={`button ${activeButton === 2 ? 'active' : ''}`}
              onClick={() => handleButtonClick(2)}
            >
              Assigned Complaints
            </button>
          </div>

          {/* Content for AuthorityTable */}
          <div className="glass-container">
            {/* Render different tables based on the active button */}
            {activeButton === 1 && <Table1 imageURLs={imageURLs} />}
            {activeButton === 2 && <Table2 />}
          </div>
        </div>
      </div>
    </div>
  );
};

const Table1 = ({ imageURLs }) => {
  return (
    <div>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Reference Number</th>
            <th>User Details</th>
            <th>Complaint Details</th>
            <th>Attachment</th>
            <th>Date</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {imageURLs.map((image, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>User Details</td>
              <td>Complaint Details</td>

              <td>
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  Attachment {index + 1}
                </a>
              </td>
              <td>2022-02-01</td>
              {/* <td>{complaint.complaintsCount}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table2 = () => {
  return (
    <div>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Reference Number</th>
            <th>User Details</th>
            <th>Complaint Details</th>
            <th>Location</th>
            <th>Attachment</th>
            <th>Appointed Authority Member</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default AdminRoadAuthority;
