import React, { useState, useEffect } from 'react';
import './ComplaintHistory.css';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, imageDb } from './utils/firebase';
import { db } from './utils/firebase.js';
import { getDownloadURL, ref } from 'firebase/storage';

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const q = query(
          collection(db, 'complaints'),
          where('uid', '==', auth.currentUser.uid),
          where('status', 'in', ['PENDING', 'ONGOING'])
        );
        const querySnapshot = await getDocs(q);
        const fetchedComplaints = [];

        console.log('fetched complaints', querySnapshot.docs);

        // Fetch the download URLs for each complaint's image and description
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          console.log('doc data', data);
          const imageRef = ref(imageDb, data.image);
          const descriptionRef = ref(imageDb, data.text);
          const [imageUrl, descriptionUrl] = await Promise.all([
            getDownloadURL(imageRef),
            getDownloadURL(descriptionRef),
          ]);
          const complaintWithUrls = { ...data, imageUrl, descriptionUrl };
          fetchedComplaints.push(complaintWithUrls);
        }

        setComplaints(fetchedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="complaint-history-container">
        <div>
          <Sidebar />
        </div>

        <div>
          <div className="complaintHistory">
            <div className="complaints-heading">
              <h1 style={{ color: 'black' }}>Complaint Status</h1>
            </div>

            <div className="complaints-content">
              <div className="blurred-box">
                {complaints.length === 0 ? (
                  <p className="outlined-para">No active complaints found!</p>
                ) : (
                  <table className="complaints-table">
                    <thead>
                      <tr>
                        <th>Reference Number</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Location</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint, index) => (
                        <tr key={index}>
                          <td>{complaint.id}</td>
                          <td>{complaint.date}</td>
                          <td>{complaint.status}</td>
                          <td>
                            <a
                              href={complaint.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Download Image
                            </a>
                          </td>
                          <td>
                            <div>
                              <a
                                href={complaint.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Click here
                              </a>
                            </div>
                          </td>
                          <td>
                            <a
                              href={complaint.descriptionUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Download Description
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            {/* <div>
              <p className="seeComplaints">See All Complaints</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
