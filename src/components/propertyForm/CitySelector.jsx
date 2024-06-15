import React, { useState, useEffect } from 'react';

const CitySelector = () => {
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePinCodeChange = (e) => {
    const newPinCode = e.target.value;
    setPinCode(newPinCode);
  };

  useEffect(() => {
    const findCity = async () => {
      if (pinCode.length === 6) {
        setIsLoading(true);
        setError('');

        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data[0].Status === "Success") {
            setCity(data[0].PostOffice[0].District);
          } else {
            setCity('City not found');
          }
        } catch (e) {
          setError('Failed to fetch city. Please try again.');
          setCity('');
        } finally {
          setIsLoading(false);
        }
      } else {
        setCity('');
        setError('');
      }
    };

    findCity();
  }, [pinCode]);

  return (
    <div>
      <label htmlFor="pinCode">Enter Indian PIN Code:</label>
      <input
        type="text"
        id="pinCode"
        value={pinCode}
        onChange={handlePinCodeChange}
        placeholder="Enter 6-digit PIN code"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {city && !isLoading && !error && (
        <div>
          <p>City (District): {city}</p>
        </div>
      )}
    </div>
  );
};

export default CitySelector;