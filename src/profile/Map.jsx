import { useEffect, useRef } from 'react';

function Map({ zip, city, state }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    const address = `${zip}, ${city}, ${state}`;

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const map = new window.google.maps.Map(mapRef.current, {
          center: results[0].geometry.location,
          zoom: 12
        });
        const marker = new window.google.maps.Marker({
          map,
          position: results[0].geometry.location
        });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [zip, city, state]);

  return <div ref={mapRef} style={{ borderRadius: '10px', width: '400px', height: '300px' }} />;
}

export default Map;