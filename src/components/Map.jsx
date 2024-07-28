import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import Popup from './Popup'

const Map = () => {
    const [scale, setScale] = useState(1)
    const [targetCoordinate, setTargetCoordinate] = useState([0.0, 0.0])
    const [country, setCountry] = useState('')
    //initialize the map
    useEffect(() => {
        var currentMarker = null
        var currentCircle = null
        var map = L.map('map').setView(targetCoordinate, scale); //coordinates for London

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
                radius: 10000
            }).addTo(map);

            newCircle.bindPopup(`
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img">
                        <path
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <hr/>
                    <div className="alert alert-primary" role="alert">
                        <h4 className="alert-heading">4/5</h4>
                        <p>yes</p>
                        <hr/>
                        <p className="mb-0">lol ratio image</p>
                    </div>
                </div>
            `).openPopup();

            const newMarker = L.marker([latitude, longitude]).addTo(map);
            currentMarker = newMarker
            currentCircle = newCircle
        }
        map.on('click', onMapClick)

        //cleanup map when component unmounts
        return () => {
        map.remove();
        };
    }, [scale, targetCoordinate]);

  return (
    <div className='w-5/6 flex min-h-screen p-10 bg-indigo-900 rounded-3xl space-x-8'>
        <form>
        <div className="mb-4">
            <label className="block font-bold mb-2 text-center text-white">
                Enter Country
            </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="ie. Canada"
                    required
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
            />
        </div>
            <div className="mb-4">
                <label htmlFor="type" className="block font-bold mb-2 text-white text-center items-center">Zoom Level</label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={scale}
                    onChange={(event) => setScale(event.target.value)}
                >
                    <option value={1}>Whole Map</option>
                    <option value={2}>2</option>
                    <option value={4}>3</option>
                    <option value={6}>4</option>
                    <option value={8}>5</option>
                    <option value={10}>6</option>
                    <option value={12}>7</option>
                    <option value={14}>8</option>
                </select>
            </div>
        </form>
        <div className='rounded-lg'
        id="map"
        style={{ width: '100%', boxShadow: 'none'}} 
        ></div>
    </div>
  );
};

export default Map;
