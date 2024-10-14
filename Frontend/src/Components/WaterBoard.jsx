import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AuthoritySidebar from './AuthoritySidebar';
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
} from 'firebase/storage'; // Import getMetadata
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { auth, db } from './utils/firebase.js';
import './AuthorityTable.css';

const AuthorityTable = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // for selected authority and status
  const [authority, setAuthority] = useState('WATER');
  const [status, setStatus] = useState('PENDING');

  const fetchComplaints = async () => {
    //  have to filter the complaints by the type and status
    //  type ['WATER','ROAD','URBAN']
    // status ['ONGOING','PENDING','RESOLVED']
    try {
      const q = query(
        collection(db, 'complaints'),
        where('status', '==', `${status}`),
        where('authority', '==', `${authority}`)
      );
      const querySnapshot = await getDocs(q);
      const fetchedComplaints = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      console.log('fetched complaints', fetchedComplaints);
      setComplaints(fetchedComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [authority, status]);

  return (
    <div>
      <Navbar />
      <div className="center-text">
        <p className="big-font">Water Board</p>
      </div>

      <div className="authority-table-container">
        <div>
          <AuthoritySidebar route={'/WaterBoard'} />
        </div>

        <div>
          <div className="button-row">
            <button
              className={`button ${activeButton === 1 ? 'active' : ''}`}
              onClick={() => {
                setStatus('PENDING');
                setActiveButton(1);
              }}
            >
              Complaints
            </button>
            <button
              className={`button ${activeButton === 2 ? 'active' : ''}`}
              onClick={() => {
                setStatus('ONGOING');

                setActiveButton(2);
              }}
            >
              Assigned Complaints
            </button>
            <button
              className={`button ${activeButton === 3 ? 'active' : ''}`}
              onClick={() => {
                setStatus('RESOLVED');
                setActiveButton(3);
              }}
            >
              Complaints History
            </button>
          </div>

          <div className="glass-container">
            {activeButton === 1 && (
              <Table1
                complaints={complaints}
                selectedComplaints={selectedComplaints}
                setSelectedComplaints={setSelectedComplaints}
                loadAll={fetchComplaints}
              />
            )}
            {activeButton === 2 && (
              <Table2
                complaints={complaints}
                selectedComplaints={selectedComplaints}
                setSelectedComplaints={setSelectedComplaints}
                loadAll={fetchComplaints}
              />
            )}
            {activeButton === 3 && (
              <Table3
                complaints={complaints}
                selectedComplaints={selectedComplaints}
                setSelectedComplaints={setSelectedComplaints}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Table1 = ({
  complaints,
  selectedComplaints,
  setSelectedComplaints,
  loadAll,
}) => {
  const [filesData, setFilesData] = useState([]);

  const assignComplaints = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('User not authenticated.'); // Handle case where user is not authenticated
      return;
    }

    try {
      await updateAuthorityUserComplaints(
        auth.currentUser.uid,
        selectedComplaints
      );

      setSelectedComplaints([]);
      console.log('Selected complaints assigned successfully.');
    } catch (error) {
      console.error('Error assigning complaints:', error);
    }
  };

  // Function to update the complaints for an authority user
  const updateAuthorityUserComplaints = async (userId, newComplaints) => {
    console.log('updating new complaints', newComplaints);
    try {
      for (const complaintId of newComplaints) {
        try {
          const q = query(
            collection(db, 'complaints'),
            where('id', '==', complaintId)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];

            const documentRef = doc.ref;
            await updateDoc(documentRef, {
              status: 'ONGOING',
              assignedAuthority: userId,
            });
            console.log(`Document with ID ${doc.id} updated successfully.`);
            loadAll();
          } else {
            console.error('No documents found matching the query criteria.');
          }
          console.log(`Complaint ${complaintId} status updated to 'ONGOING'`);
        } catch (error) {
          console.error(`Error updating complaint ${complaintId}:`, error);
        }
      }

      console.log('Selected complaints assigned successfully.');
    } catch (error) {
      console.error('Error assigning complaints:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchFilesForComplaints = async (complaints) => {
      const storage = getStorage();
      const allFilesData = [];

      for (const complaint of complaints) {
        const folderRef = ref(storage, `complaints/${complaint.id}`);
        const items = await listAll(folderRef);
        const fileURLsWithDates = await Promise.all(
          items.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            const metadata = await getMetadata(fileRef);
            const createdDate = metadata.timeCreated;
            return { url: downloadURL, name: fileRef.name, createdDate };
          })
        );

        allFilesData.push({
          complaintId: complaint.id,
          files: fileURLsWithDates,
        });
      }
      setFilesData(allFilesData);
    };

    fetchFilesForComplaints(complaints);
  }, [complaints]);

  const toggleComplaintSelection = (id) => {
    if (selectedComplaints.includes(id)) {
      setSelectedComplaints(
        selectedComplaints.filter((complaintId) => complaintId !== id)
      );
    } else {
      setSelectedComplaints([...selectedComplaints, id]);
    }
  };

  return (
    <div>
      <button onClick={assignComplaints}>Assign Selected Complaints</button>
      <table className="complaint-table">
        <thead>
          <tr>
            <th style={{ width: '30px' }}>Select</th>

            <th>Reference Number</th>
            <th>Description</th>
            <th>Attachment</th>
            <th>Location</th>
            <th>Date</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedComplaints.includes(complaint.id)}
                  onChange={() => toggleComplaintSelection(complaint.id)}
                />
              </td>
              <td>{complaint.id}</td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('description')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('image')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
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
              <td>{complaint.date}</td>
              <td>{complaint.complaintsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table2 = ({
  complaints,
  selectedComplaints,
  setSelectedComplaints,
  loadAll,
}) => {
  const [filesData, setFilesData] = useState([]);

  // Function to update the complaints for an authority user
  const updateAuthorityUserComplaints = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert('User not authenticated.'); // Handle case where user is not authenticated
        return;
      }

      for (const complaintId of selectedComplaints) {
        try {
          const q = query(
            collection(db, 'complaints'),
            where('id', '==', complaintId)
          );

          // Step 2: Retrieve the document that matches the query
          const querySnapshot = await getDocs(q);

          // Step 3: Check if a document exists in the querySnapshot
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];

            // Step 5: Update the document with the desired data
            const documentRef = doc.ref;
            await updateDoc(documentRef, {
              status: 'RESOLVED',
            });
            console.log(`Document with ID ${doc.id} updated successfully.`);
            loadAll();
          } else {
            console.error('No documents found matching the query criteria.');
          }
          console.log(`Complaint ${complaintId} status updated to 'ONGOING'`);
        } catch (error) {
          console.error(`Error updating complaint ${complaintId}:`, error);
        }
      }

      console.log('Selected complaints assigned successfully.');
    } catch (error) {
      console.error('Error assigning complaints:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchFilesForComplaints = async (complaints) => {
      const storage = getStorage();
      const allFilesData = [];

      for (const complaint of complaints) {
        const folderRef = ref(storage, `complaints/${complaint.id}`);
        const items = await listAll(folderRef);
        const fileURLsWithDates = await Promise.all(
          items.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            const metadata = await getMetadata(fileRef);
            const createdDate = metadata.timeCreated;
            return { url: downloadURL, name: fileRef.name, createdDate };
          })
        );

        allFilesData.push({
          complaintId: complaint.id,
          files: fileURLsWithDates,
        });
      }
      setFilesData(allFilesData);
    };

    fetchFilesForComplaints(complaints);
  }, [complaints]);

  const toggleComplaintSelection = (id) => {
    if (selectedComplaints.includes(id)) {
      setSelectedComplaints(
        selectedComplaints.filter((complaintId) => complaintId !== id)
      );
    } else {
      setSelectedComplaints([...selectedComplaints, id]);
    }
  };

  return (
    <div>
      <button onClick={updateAuthorityUserComplaints}>
        Resolve Selected Complaints
      </button>
      <table className="complaint-table">
        <thead>
          <tr>
            <th style={{ width: '30px' }}>Select</th>

            <th>Reference Number</th>
            <th>Description</th>
            <th>Attachment</th>
            <th>Location</th>
            <th>Date</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedComplaints.includes(complaint.id)}
                  onChange={() => toggleComplaintSelection(complaint.id)}
                />
              </td>
              <td>{complaint.id}</td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('description')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('image')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
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
              <td>{complaint.date}</td>
              <td>{complaint.complaintsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table3 = ({ complaints, selectedComplaints, setSelectedComplaints }) => {
  const [filesData, setFilesData] = useState([]);

  useEffect(() => {
    const fetchFilesForComplaints = async (complaints) => {
      const storage = getStorage();
      const allFilesData = [];

      for (const complaint of complaints) {
        const folderRef = ref(storage, `complaints/${complaint.id}`);
        const items = await listAll(folderRef);
        const fileURLsWithDates = await Promise.all(
          items.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            const metadata = await getMetadata(fileRef);
            const createdDate = metadata.timeCreated;
            return { url: downloadURL, name: fileRef.name, createdDate };
          })
        );

        allFilesData.push({
          complaintId: complaint.id,
          files: fileURLsWithDates,
        });
      }
      setFilesData(allFilesData);
    };

    fetchFilesForComplaints(complaints);
  }, [complaints]);

  const toggleComplaintSelection = (id) => {
    if (selectedComplaints.includes(id)) {
      setSelectedComplaints(
        selectedComplaints.filter((complaintId) => complaintId !== id)
      );
    } else {
      setSelectedComplaints([...selectedComplaints, id]);
    }
  };

  return (
    <div>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Reference Number</th>
            <th>Description</th>
            <th>Attachment</th>
            <th>Location</th>
            <th>Date</th>
            <th>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.id}</td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('description')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </td>
              <td>
                {filesData.map((data, dataIndex) => {
                  if (data.complaintId === complaint.id) {
                    return data.files.map((file, fileIndex) => {
                      if (file.name.includes('image')) {
                        return (
                          <div key={fileIndex}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        );
                      }
                      return null;
                    });
                  }
                  return null;
                })}
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
              <td>{complaint.date}</td>
              <td>{complaint.complaintsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorityTable;
