import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import './Home.css'
import Logo from '../Images/Logo.png'


export default function Home() {
    /*useEffect(() => {
        fetchData()
    
    }, [])

    const fetchData = async ()  => {
        const querySnapshot = await getDocs(collection(db, "data"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);
        });
    }*/
  return ( 
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='home-container'>
            <div className='logo-image'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className='welcome'>
                <span>Welcome</span>
            </div>
            <div className='civic-connect'>
                <span>CIVIC CONNECT</span>
            </div>
            <div className='slogan'>
                <span>Reporting Made Easy, Solutions Made Simple</span>
            </div>
            {/* <div className='home-description'>
                <span>
                    <p>
                        This is for description paragraph.Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph.
                    </p>
                </span>
            </div> */}
            <div className='start-button-div'>
                <Link to="/user-selection">
                    <button className='start-button'>
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}