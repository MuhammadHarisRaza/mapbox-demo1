import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
 
mapboxgl.accessToken = 'pk.eyJ1IjoicmF6YWhhcmlzMTMyIiwiYSI6ImNrcjg1N3ZyMTN3OGgzMWwzd25uZ2IwdWQifQ.PaxDSpsvN4umPjzocmELtw';
 
export default function App() {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);
 
useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/mapbox/streets-v11',
center: [lng, lat],
zoom: zoom
});
});
 
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
});

useEffect(()=> {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
})
 
return (
<div>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" />
</div>
);
}


// import "./app.css";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import { useEffect, useState } from "react";
// import { Room, Star, StarBorder } from "@material-ui/icons";
// import axios from "axios";
// import { format } from "timeago.js";
// import Register from "./components/Register";
// import Login from "./components/Login";

// function App() {
//   const myStorage = window.localStorage;
//   const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
//   const [pins, setPins] = useState([]);
//   const [currentPlaceId, setCurrentPlaceId] = useState(null);
//   const [newPlace, setNewPlace] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [desc, setDesc] = useState(null);
//   const [star, setStar] = useState(0);
//   const [viewport, setViewport] = useState({
//     latitude: 47.040182,
//     longitude: 17.071727,
//     zoom: 4,
//   });
//   const [showRegister, setShowRegister] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const handleMarkerClick = (id, lat, long) => {
//     setCurrentPlaceId(id);
//     setViewport({ ...viewport, latitude: lat, longitude: long });
//   };

//   const handleAddClick = (e) => {
//     const [longitude, latitude] = e.lngLat;
//     setNewPlace({
//       lat: latitude,
//       long: longitude,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newPin = {
//       username: currentUsername,
//       title,
//       desc,
//       rating: star,
//       lat: newPlace.lat,
//       long: newPlace.long,
//     };

//     try {
//       const res = await axios.post("/pins", newPin);
//       setPins([...pins, res.data]);
//       setNewPlace(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const getPins = async () => {
//       try {
//         const allPins = await axios.get("/pins");
//         setPins(allPins.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getPins();
//   }, []);

//   const handleLogout = () => {
//     setCurrentUsername(null);
//     myStorage.removeItem("user");
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken="pk.eyJ1IjoicmF6YWhhcmlzMTMyIiwiYSI6ImNrcjg1N3ZyMTN3OGgzMWwzd25uZ2IwdWQifQ.PaxDSpsvN4umPjzocmELtw"
//         width="100%"
//         height="100%"
//         transitionDuration="200"
//         mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
//         onViewportChange={(viewport) => setViewport(viewport)}
//         onDblClick={currentUsername && handleAddClick}
//       >
//         {pins.map((p) => (
//           <>
//             <Marker
//               latitude={p.lat}
//               longitude={p.long}
//               offsetLeft={-3.5 * viewport.zoom}
//               offsetTop={-7 * viewport.zoom}
//             >
//               <Room
//                 style={{
//                   fontSize: 7 * viewport.zoom,
//                   color:
//                     currentUsername === p.username ? "tomato" : "slateblue",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
//               />
//             </Marker>
//             {p._id === currentPlaceId && (
//               <Popup
//                 key={p._id}
//                 latitude={p.lat}
//                 longitude={p.long}
//                 closeButton={true}
//                 closeOnClick={false}
//                 onClose={() => setCurrentPlaceId(null)}
//                 anchor="left"
//               >
//                 <div className="card">
//                   <label>Place</label>
//                   <h4 className="place">{p.title}</h4>
//                   <label>Review</label>
//                   <p className="desc">{p.desc}</p>
//                   <label>Rating</label>
//                   <div className="stars">
//                     {Array(p.rating).fill(<Star className="star" />)}
//                   </div>
                  
//                   <span className="date">{format(p.createdAt)}</span>
//                 </div>
//               </Popup>
//             )}
//           </>
//         ))}
//         {newPlace && (
//           <>
//             <Marker
//               latitude={newPlace.lat}
//               longitude={newPlace.long}
//               offsetLeft={-3.5 * viewport.zoom}
//               offsetTop={-7 * viewport.zoom}
//             >
//               <Room
//                 style={{
//                   fontSize: 7 * viewport.zoom,
//                   color: "tomato",
//                   cursor: "pointer",
//                 }}
//               />
//             </Marker>
//             <Popup
//               latitude={newPlace.lat}
//               longitude={newPlace.long}
//               closeButton={true}
//               closeOnClick={false}
//               onClose={() => setNewPlace(null)}
//               anchor="left"
//             >
//               <div>
//                 <form onSubmit={handleSubmit}>
//                   <label>Title</label>
//                   <input
//                     placeholder="Enter a title"
//                     autoFocus
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <label>Description</label>
//                   <textarea
//                     placeholder="Say us something about this place."
//                     onChange={(e) => setDesc(e.target.value)}
//                   />
//                   <label>Rating</label>
//                   <select onChange={(e) => setStar(e.target.value)}>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                   </select>
//                   <button type="submit" className="submitButton">
//                     Add Pin
//                   </button>
//                 </form>
//               </div>
//             </Popup>
//           </>
//         )}
//         {currentUsername ? (
//           <button className="button logout" onClick={handleLogout}>
//             Log out
//           </button>
//         ) : (
//           <div className="buttons">
//             <button className="button login" onClick={() => setShowLogin(true)}>
//               Log in
//             </button>
//             <button
//               className="button register"
//               onClick={() => setShowRegister(true)}
//             >
//               Register
//             </button>
//           </div>
//         )}
//         {showRegister && <Register setShowRegister={setShowRegister} />}
//         {showLogin && (
//           <Login
//             setShowLogin={setShowLogin}
//             setCurrentUsername={setCurrentUsername}
//             myStorage={myStorage}
//           />
//         )}
//       </ReactMapGL>
//     </div>
//   );
// }

// export default App;
