import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './ImageComplaint.css';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';
import { auth } from './utils/firebase';
import { saveComplaint } from './utils/handler';

const googleMapsApiKey = 'AIzaSyDhuEKCfGEKDf98YAu5EdbPab141nbH2DY'; // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key

const ImageComplaint = () => {
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      setMapUrl(mapUrl);
      console.log('Map URL:', mapUrl);
    }
  }, [latitude, longitude]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    console.log('stting file', file);
  };

  const handleDescriptionChange = (e) => {
    console.log('description changed');

    setDescription(e.target.value);
  };

  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleSubmit = async () => {
    if (!img || !description) {
      alert('Please select an image and provide a description.');
      return;
    }

    try {
      const uniqueId = v4();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert('User not authenticated.'); // Handle case where user is not authenticated
        return;
      }

      console.log('image data', img);

      // first get the model prediction
      var formData = new FormData();
      formData.append('file', img);

      let response = await axios.post(
        'http://localhost:8000/analyze-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);

      let authority = response.data.authority;

      await saveComplaint(
        uniqueId,
        img,
        description,
        mapUrl,
        isAnonymous,
        authority,
        contactNumber,
        currentUser
      );

      // clear the form

      navigate(0);
      alert('Complaint submitted successfully!');
    } catch (error) {
      alert('Image cannot be processed');
      console.error('Error submitting complaint:', error);
    }
  };

  function initMap() {
    const { google } = window;
    const { Map, InfoWindow, Marker } = google.maps;

    let map;
    let marker;
    const infoWindow = new InfoWindow();

    const initializeMap = () => {
      try {
        // Get user's current position
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          // Initialize map at user's current position
          map = new Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 14,
            mapId: 'YOUR_MAP_ID',
          });

          // Initialize marker at user's current position
          marker = new Marker({
            map,
            position: { lat: latitude, lng: longitude },
            draggable: true,
            title: 'This marker is draggable.',
          });

          // Add listener for marker drag
          marker.addListener('dragend', handleMarkerDrag);

          // Add listener for map click
          map.addListener('click', handleMapClick);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const handleMarkerDrag = (event) => {
      const position = marker.getPosition();
      infoWindow.close();
      infoWindow.setContent(
        `Pin dropped at: ${position.lat()}, ${position.lng()}`
      );
      infoWindow.open(map, marker);
      setLatitude(position.lat());
      setLongitude(position.lng());
      document.getElementById(
        'map-id'
      ).value = `Latitude: ${position.lat()}, Longitude: ${position.lng()}`;
    };

    const handleMapClick = (event) => {
      const clickedLatLng = event.latLng;

      // Remove existing marker if any
      if (marker) {
        marker.setMap(null);
      }

      // Place a new marker at the clicked position
      marker = new Marker({
        position: clickedLatLng,
        map,
        draggable: true,
        title: 'This marker is draggable.',
      });

      // Add listener for new marker drag
      marker.addListener('dragend', handleMarkerDrag);

      // Update latitude and longitude
      setLatitude(clickedLatLng.lat());
      setLongitude(clickedLatLng.lng());

      // Close info window
      infoWindow.close();
    };

    initializeMap();
  }

  return (
    <div className="report-complaint-containers">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="report-complaint-content">
          <h1>Report a Complaint</h1>
          <div className="choose-an-option">
            <h1>Choose an Option</h1>
          </div>
          {/* <div className="complaint-type">
            <button className="text-complaint">
              <Link to="/report-complaint">Text Complaint</Link>
            </button>
            <button className="image-complaint">
              <Link to="/ImageComplaint">Image Complaint</Link>
            </button>
          </div> */}
          <div className="Upload-Image">
            <span>Upload Image</span>
          </div>
          <div className="Select-Option">
            <div className="select"></div>
          </div>
          <input type="file" onChange={handleImageChange} />
          <div className="Description">
            <span>Description</span>
          </div>
          <div className="description">
            <textarea
              name="description-area"
              id="description"
              cols="50"
              rows="9"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe your problem...."
            ></textarea>
          </div>

          <div className="checkbox">
            <span>
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                value="anonymous"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
              />
              <label htmlFor="anonymous"> Report Anonymously?</label>
              <br />
            </span>
            {!isAnonymous && (
              <span>
                <input
                  type="checkbox"
                  id="contact"
                  name="contact"
                  value="contact"
                  checked={!isAnonymous}
                  onChange={handleAnonymousChange}
                />
                <label htmlFor="contact">
                  {' '}
                  Add your contact number(For additional details, the government
                  authority may contact you directly)
                </label>
              </span>
            )}
          </div>
          {!isAnonymous && (
            <div className="contact-number">
              <input
                type="text"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={handleContactNumberChange}
              />
            </div>
          )}

          <div id="map" style={{ width: '100%', height: '400px' }}></div>
          <br />

          <div id="map-id">
            <textarea
              name="coordinates"
              id="coordinates"
              cols="50"
              rows="2"
              value={`Latitude: ${latitude || ''}, Longitude: ${
                longitude || ''
              }`}
              readOnly
            ></textarea>
          </div>

          <div className="map-url">
            <span>
              Map URL:{' '}
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                {mapUrl}
              </a>
            </span>
          </div>

          <div className="submit">
            <button onClick={handleSubmit}>Submit Complaint</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComplaint;
