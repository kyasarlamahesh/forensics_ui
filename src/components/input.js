import React, { useState } from 'react';
import SSHTerminal from './SSHTerminal';

const InputIP = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null); // Track connection status
  const [isRunning, setIsRunning] = useState(false); // State for Start/Stop toggle

  // Filter States
  const [sourceIP, setSourceIP] = useState('');
  const [destinationIP, setDestinationIP] = useState('');
  const [port, setPort] = useState('');
  const [isSourceIPSelected, setIsSourceIPSelected] = useState(false);
  const [isDestinationIPSelected, setIsDestinationIPSelected] = useState(false);
  const [isPortSelected, setIsPortSelected] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ipAddress.trim() === '') {
      setError('Please enter a valid IP address.');
      return;
    }

    setError('');
    setConnectionStatus('connecting'); // Set status to connecting

    // Simulate network connection process
    setTimeout(() => {
      if (ipAddress === '192.168.1.1') {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('failed');
      }
    }, 2000); // Simulate 2 seconds delay
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
    console.log(isRunning ? 'Stopping...' : 'Starting...');
  };

  const handleSave = () => {
    console.log('Save button clicked');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }} className='text-end'>
      {/* Left Side: Filter Component (aligned to the left) */}
      <div
        style={{
          width: '250px',
          padding: '20px',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <h4>Filters</h4>

        {/* Source IP Selection */}
        <div>
          <label>
            <input
              type="checkbox"
              name="sourceIP"
              onChange={(e) => setIsSourceIPSelected(e.target.checked)}
            />
            Source IP
          </label>
        </div>
        {isSourceIPSelected && (
          <div>
            <label htmlFor="sourceIPInput">Enter Source IP:</label>
            <input
              type="text"
              id="sourceIPInput"
              className="form-control"
              placeholder="Enter Source IP"
              value={sourceIP}
              onChange={(e) => setSourceIP(e.target.value)}
            />
          </div>
        )}

        {/* Destination IP Selection */}
        <div>
          <label>
            <input
              type="checkbox"
              name="destinationIP"
              onChange={(e) => setIsDestinationIPSelected(e.target.checked)}
            />
            Destination IP
          </label>
        </div>
        {isDestinationIPSelected && (
          <div>
            <label htmlFor="destinationIPInput">Enter Destination IP:</label>
            <input
              type="text"
              id="destinationIPInput"
              className="form-control"
              placeholder="Enter Destination IP"
              value={destinationIP}
              onChange={(e) => setDestinationIP(e.target.value)}
            />
          </div>
        )}

        {/* Port Selection */}
        <div>
          <label>
            <input
              type="checkbox"
              name="port"
              onChange={(e) => setIsPortSelected(e.target.checked)}
            />
            Port
          </label>
        </div>
        {isPortSelected && (
          <div>
            <label htmlFor="portInput">Enter Port:</label>
            <input
              type="text"
              id="portInput"
              className="form-control"
              placeholder="Enter Port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Right Side: Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
        {/* IP Input Form with Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <form
            className="d-flex"
            role="search"
            onSubmit={handleSubmit}
            style={{ flex: 1, marginRight: '20px' }}
          >
            <label htmlFor="ipInput" className="visually-hidden">
              IP Address
            </label>
            <input
              id="ipInput"
              className="form-control me-2"
              type="text"
              placeholder="Enter Source IP Address"
              aria-label="IP Address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button className="btn btn-outline-success" type="submit">
              Connect
            </button>
          </form>

          {/* Start/Stop and Save Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${isRunning ? 'btn-outline-danger' : 'btn-outline-primary'
                }`}
              type="button"
              onClick={toggleStartStop}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button className="btn btn-outline-info" type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="text-danger mt-2">{error}</div>}

        {/* SSH Terminal */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>SSH Terminal Simulation</h1>
          <SSHTerminal connectionStatus={connectionStatus} ipAddress={ipAddress} />
        </div>
      </div>
    </div>
  );
};

export default InputIP;
