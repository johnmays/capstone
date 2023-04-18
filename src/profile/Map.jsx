import { useEffect, useRef } from 'react';

function Map({ zip, city, state }) {
  const mapRef = useRef(null);
  const circleRef = useRef(null);

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
        const circle = new window.google.maps.Circle({
          map,
          center: results[0].geometry.location,
          radius: 800, // 1 mile in meters
          fillColor: '#FF0000',
          fillOpacity: 0.2,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 2
        });
        circleRef.current = circle;
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [zip, city, state]);

  return <div ref={mapRef} style={{ borderRadius: '10px', width: '400px', height: '300px' }} />;
}

export default Map;