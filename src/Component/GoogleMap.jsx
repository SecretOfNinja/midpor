// src/components/GoogleMap.jsx
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap = (props) => {
  return (
    <Map
      google={props.google}
      zoom={14}
      style={{ width: '100%', height: '400px' }}
      initialCenter={{
        lat: 37.7749,
        lng: -122.4194
      }}
    >
      <Marker
        title={'Marker Title'}
        name={'Marker Name'}
        position={{ lat: 37.7749, lng: -122.4194 }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDlDOjweyh0X7yy-iHWzBxQzY_FzoOhywI'
})(GoogleMap);
