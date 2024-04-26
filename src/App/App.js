import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostcodeForm from '../components/PostcodeForm/PostcodeForm';
import PostcodeDetails from '../components/PostcodeDetails/PostcodeDetails';
import PostcodeHistory from '../components/PostcodeHistory/PostcodeHistory';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);
  const [selectedPostcode, setSelectedPostcode] = useState(null);
  const [postcodeDetails, setPostcodeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedPostcode) {
      fetchPostcodeDetails(selectedPostcode);
    }
  }, [selectedPostcode]);

  const fetchPostcodeDetails = async (postcode) => {
    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const { country, longitude, latitude, admin_district } = response.data.result;
      setPostcodeDetails({ country, longitude, latitude, admin_district });
      setError(null);
    } catch (error) {
      setError('Error fetching postcode details. Please try again.');
    }
  };

  const handleSubmit = async (postcode) => {
    if (!postcode.trim()) return;
    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const { country, longitude, latitude, admin_district } = response.data.result;
      setPostcodeDetails({ country, longitude, latitude, admin_district });
      setSelectedPostcode(postcode);
      setHistory([...history, postcode]);
      setError(null);
    } catch (error) {
      setError('Invalid postcode. Please try again.');
    }
  };

  const handleRemove = (postcodeToRemove) => {
    const updatedHistory = history.filter((p) => p !== postcodeToRemove);
    setHistory(updatedHistory);
  
    // if the last postcode was removed
    if (updatedHistory.length === 0) {
      // Delay resetting the selectedPostcode and postcodeDetails states
      setTimeout(() => {
        setSelectedPostcode(null);
        setPostcodeDetails(null);
      }, 100);
    } else if (selectedPostcode === postcodeToRemove) {
      setSelectedPostcode(null);
      setPostcodeDetails(null);
    }
  };
  
  const handleSelect = (postcode) => {
    setSelectedPostcode(postcode);
  };

  return (
    <div className="container mt-4">
      <h1 className="custom-heading">UK Postcode Lookup</h1>
      <PostcodeForm onSubmit={handleSubmit} />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <PostcodeHistory history={history} onRemove={handleRemove} onSelect={handleSelect} />
      {postcodeDetails && <PostcodeDetails details={postcodeDetails} postcode={selectedPostcode} />}
    </div>
  );
}

export default App;