import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const FindLibraries = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
        },
        () => {
          setError("Failed to get your location.");
        }
      );
    } else {
      setError("Your browser does not support GPS.");
    }
  }, []);

  const handleOpenMap = () => {
    if (location) {
      const { lat, lng } = location;
      window.open(`https://www.google.com/maps/search/libraries/@${lat},${lng},15z`, "_blank");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Find Nearby Libraries</h2>
      {error && <p className="text-danger">{error}</p>}
      {!error && !location && <p>Getting your location...</p>}
      {location && (
        <Button color="primary" onClick={handleOpenMap}>
          Show Libraries Near Me
        </Button>
      )}
    </div>
  );
};

export default FindLibraries;
