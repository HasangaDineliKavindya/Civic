import React from 'react';
import './AdminOperations.css';
import Navbar from './Navbar.jsx';
import AdminSidebar from './AdminSidebar';
import User from '../Images/User.png';

import AddUser from '../Images/AddUser.png';
import UpdateUser from '../Images/UpdateUser.png';
import DeleteUser from '../Images/DeleteUser.png';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AdminOperations() {
  const { authority } = useParams();

  return (
    <div>
      <Navbar />
      <div className="admin-operation-container">
        <div>
          <AdminSidebar authority={authority} />
        </div>
        <div>
          <div className="button-container">
            <div className="button-row">
              <Link to={`/AuthorityAccounts/${authority}`}>
                <button className="Abutton">
                  <img className="icon" src={User} alt="User accounts" />
                  <p className="paragraph">Registered Authority Accounts</p>
                </button>
              </Link>
              <Link to={`/CreateAuthAcc/${authority}`}>
                <button className="Abutton">
                  <img className="icon" src={AddUser} alt="Create accounts" />
                  <p className="paragraph">Create Authority Accounts</p>
                </button>
              </Link>
            </div>
            <div className="button-row">
              <Link to={`/AdminUCredential/${authority}`}>
                <button className="Abutton">
                  <img
                    className="icon"
                    src={UpdateUser}
                    alt="Update accounts"
                  />
                  <p className="paragraph">Update User Credentials</p>
                </button>
              </Link>
              <Link to={`/DeleteAccounts/${authority}`}>
                <button className="Abutton">
                  <img
                    className="icon"
                    src={DeleteUser}
                    alt="Delete accounts"
                  />
                  <p className="paragraph">Delete Authority Accounts</p>
                </button>
              </Link>
            </div>
          </div>
          <Link to="/AuthorityLogin" className=""></Link>
        </div>
      </div>
    </div>
  );
}
