import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import './Load.css'

export default function Load() {
  return (
    <div className='report-complaint-container'>
       <div><Navbar/></div>
       <div className="content-containers">
        <Sidebar />
      <div className='Preview-image'>
            <h1>
              Preview image
            </h1>
        </div>
        
        <div className='load'>
            <textarea name="load" id="load" cols="50" rows="9"></textarea>
        </div>

        <div className='load-btn'>
            <button>
               upload
            </button>
        </div>
        </div>
    </div>
  )
}