import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const Map = () => {
  //initialize the map
  useEffect(() => {
    var currentMarker = null
    var currentCircle = null
    const map = L.map('map').setView([51.505, -0.09], 13); //coordinates for London

    //add a tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //get coordinates on click 
    function onMapClick(e) {
      if (currentMarker && currentCircle) {
        currentMarker.remove();
        currentCircle.remove();
      }
      
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      const newCircle = L.circle([latitude, longitude], {
        color: '#4b734e',
        fillColor: '#1c5721',
        fillOpacity: 0.5,
        radius: 1000
      }).addTo(map);

      const newMarker = L.marker([latitude, longitude]).addTo(map);
      currentMarker = newMarker
      currentCircle = newCircle
    }
    map.on('click', onMapClick)

    //cleanup map when component unmounts
    return () => {
      map.remove();
    };

  }, []);

  return (
    <div className='w-3/4 flex min-h-screen p-6 bg-indigo-950'>
        <div
        id="map"
        style={{ width: '100%', boxShadow: 'none'}} 
        ></div>
    </div>
  );
};

export default Map;
