import React from 'react';
import './googlemapapp.css'; // Import the styling
import Googlemap from '../../Component/GoogleMap';

function App() {
  return (
    <div className="App">
      <h1>Google Maps App</h1>
      <div id="map-container">
        <Googlemap />
      </div>
    </div>
  );
}

export default App;
