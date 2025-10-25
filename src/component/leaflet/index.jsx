import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Fix default marker icon (otherwise blank in some setups)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ PropTypes validation
// LocationPicker.propTypes = {
//   onLocationSelect: PropTypes.func.isRequired,
// };

function LocationPicker({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
}

export default function AddressToLatLong() {
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [marker, setMarker] = useState(null);
    const [sessionToken, setSessionToken] = useState(
        "11320556-145d-44f4-9fd0-9679128e5783"
    );
    const [coords, setCoords] = useState({ lat: 20.5937, lng: 78.9629 }); // default India center

    const fetchSuggestions = async () => {
        if (!address) {
            setSuggestions([]);
            return;
        }
        // const token = uuidv4();
        // setSessionToken(token);

        try {
            const res = await axios.get(
                "https://api.mapbox.com/search/searchbox/v1/suggest",
                {
                    params: {
                        q: address,
                        session_token: sessionToken,
                        access_token: process.env.REACT_APP_MAPBOX,
                        language: "en",
                        limit: 5,
                    },
                }
            );

            setSuggestions(res.data.suggestions || []);
        } catch (err) {
            console.error("Suggest API error:", err);
        }
    };

    const fetchPlaceDetails = async (suggestionId) => {
        try {
            const res = await axios.get(
                `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestionId}`,
                {
                    params: {
                        session_token: sessionToken,
                        access_token: process.env.REACT_APP_MAPBOX,
                    },
                }
            );

            console.log("res >>", res);

            const feature = res.data.features[0];
            if (feature) {
                const [lng, lat] = feature.geometry.coordinates;
                setCoords({ lat, lng });
                // setQuery(feature.properties.name);
            }
            setSuggestions([]);
        } catch (err) {
            console.error("Retrieve API error:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Find Latitude & Longitude</h2>

            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address..."
                    style={{ padding: "8px", width: "250px" }}
                />
                <button
                    onClick={fetchSuggestions}
                    style={{ marginLeft: "10px", padding: "8px" }}
                >
                    Search
                </button>
            </div>

            <div>
                {suggestions.length > 0 && (
                    <ul
                        style={{
                            background: "white",
                            border: "1px solid #ccc",
                            width: "300px",
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        {suggestions.map((sug) => (
                            <li
                                key={sug.mapbox_id}
                                onClick={() => fetchPlaceDetails(sug.mapbox_id)}
                                style={{
                                    padding: "8px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee",
                                    color: "black",
                                }}
                            >
                                {sug.name}
                                {sug.full_address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* <MapContainer
        center={coords}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationPicker
          onLocationSelect={(latlng) => {
            setMarker(latlng);
            setCoords(latlng);
          }}
        />
        {marker && <Marker position={marker} />}
      </MapContainer> */}

            <div style={{ marginTop: "20px" }}>
                <p>
                    <b>Latitude:</b> {coords.lat}
                </p>
                <p>
                    <b>Longitude:</b> {coords.lng}
                </p>
            </div>
        </div>
    );
}
