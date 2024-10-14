import React from 'react'
import '../Components/About.css'
import Bridge from '../Images/Bridge.jpg';
import Navbar from './Navbar';
import Profile from '../Images/Profile.jpg'

export default function About() {
  return (
    <div>
     <Navbar/>
          <div className='about-container'>
               <div className='about-title'>
                    <h1>
                         ABOUT CIVIC CONNECT
                    </h1>
               </div>
               <div className='row'>
                    <section className='section'>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Empowering Community, Enhancing Transparency
                                   </h1>
                              </span>
                              <span className='description'>
                                   Welcome to our online management system, a pioneering initiative aimed at fostering transparency and efficiency in addressing civic issues across Sri Lanka. Our platform serves as a bridge between citizens and relevant authorities, allowing for swift and effective problem resolution.
                              </span>
                         </section>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                   Our Vision: A Connected Community
                                   </h1>
                              </span>
                              <span className='description'>
                                   At the heart of our project is the vision of creating a connected community where citizens actively contribute to the betterment of their surroundings. By harnessing the power of technology, we aspire to streamline the process of reporting and resolving issues that impact the quality of life for all.
                              </span>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        How It Works: A Seamless User Experience
                                   </h1>
                              </span>
                              <span className='description'>
                                   Our web app and website provide a user-friendly interface designed to empower individuals to report issues such as potholes, damaged pipelines, and water drain problems effortlessly. Users can log in, capture images, provide location details, and submit complaints with ease. To ensure the accuracy of information, our system incorporates advanced algorithms, such as the "Variance of Laplacian," to detect and rectify blurry or unclear images.
                              </span>
                         </section>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                         Intelligent Categorization and Prioritization
                                   </h1>
                              </span>
                              <span className='description'>
                                   Once a complaint is submitted, our system employs cutting-edge technologies, including Google Lens API for image-type complaints and Natural Language Processing (NLP) for description-type complaints, to categorize issues accurately. The system then prioritizes complaints based on their frequency, ensuring that high-priority matters receive prompt attention.
                              </span>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Authority Dashboards: Streamlining Action
                                   </h1>
                              </span>
                              <span className='description'>
                                   For the authorities responsible for addressing these concerns, our platform offers specialized dashboards tailored to their areas of expertise. Road development authorities, water boards, and municipal councils each have access to a dashboard displaying prioritized complaints related to their domain.
                              </span>
                         </section>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Enhancing Accountability: User and Authority Interfaces
                                   </h1>
                              </span>
                              <span className='description'>
                                   Users can track their complaints' progress through the web app, from submission to resolution. Additionally, authority users are equipped with tools to efficiently manage incoming complaints, categorize ongoing tasks, and monitor the resolution status.
                              </span>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Additional Features for a Better Experience
                                   </h1>
                              </span>
                              <span className='description'>
                                   We understand that situations may change, and feedback is crucial. Therefore, users have the ability to edit complaints after submission, rectify incorrect details, or resubmit if information is lacking. In cases where categorization presents a challenge, users are prompted for additional details to ensure accurate routing to the appropriate authority.
                              </span>
                         </section>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Future-Ready: Predicting and Resolving
                                   </h1>
                              </span>
                              <span className='description'>
                                   Looking ahead, our system envisions predicting future complaints based on historical data, offering users the option to view previous complaints from the same location, and enhancing the overall prediction and resolution process.
                              </span>
                         </section>
                    </section>
               </div>

               <div className='row'>
                    <section className='section'>
                         <section className='inner-section'>
                              <span className='description-title'>
                                   <h1>
                                        Machine Learning Enhancements
                                   </h1>
                              </span>
                              <span className='description'>
                                   Our continuous commitment to improvement includes addressing issues such as identifying blurry images, robust image processing using Google Lens API, precise categorization, prioritization based on criticality, and a forward-looking approach to predict future concerns.
                              </span>
                         </section>
                         <section>
                              <img src={Bridge} alt='Bridge'/>
                         </section>
                    </section>
               </div>
               <div >
                    <section className='bottom-description'>
                    <span >
                         <h1>
                         Join us on this journey towards a more transparent, connected, and responsive community. Together, we can build a better Sri Lanka for all.
                         </h1>
                    </span>
                    </section>
               </div>
               <hr className='hr'/>
               <div>
                    <div >
                         <span className='our-team'>
                              <h1>
                                   Our Team
                              </h1>
                         </span>
                         <div className='team-details-row'>
                              <div className='profile-details'>
                                   <img src={Profile} alt="Profile"/>
                                   <span>
                                         Profile Name
                                   </span>
                              </div>
                              <div className='profile-details'>
                                   <img src={Profile} alt="Profile"/>
                                   <span>
                                        Profile Name
                                   </span>
                              </div>
                              <div className='profile-details'>
                                   <img src={Profile} alt="Profile"/>
                                   <span>
                                        Profile Name
                                   </span>
                              </div>
                              <div className='profile-details'>
                                   <img src={Profile} alt="Profile"/>
                                   <span>
                                        Profile Name
                                   </span>
                              </div>
                              <div className='profile-details'>
                                   <img src={Profile} alt="Profile"/>
                                   <span>
                                        Profile Name
                                   </span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div className='address-section'>
               <span>
                    <h1>Our Office Address</h1>
                    <p>123 Street, <br />Cityville, <br />Country</p>
               </span>
               <span>
                    <h1>
                         Reach Us
                    </h1>
                    <p>
                         Office Number <br /> 011-1234567
                    </p>
               </span>
               <span>
                    <h1>
                         Social Medias
                    </h1>
                    <p>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> <br /> 
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">X</a> <br /> 
                    <a href="https://www.Youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
                    </p>
               </span>
               <span>
                    <h1>
                         Email Us
                    </h1>
                    <p>
                         <a href="mailto:your-email@example.com">your-email@example.com</a>
                    </p>
               </span>

          </div>
          <footer className="footer">
               <p>&copy; 2024 Community Management System. All rights reserved.</p>
          </footer>
    </div>
  )
}
