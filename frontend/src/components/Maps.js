import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "./styles/Maps.css";

const Maps = ({ donorlocation, requests }) => {
  const [viewport, setViewport] = useState({
    latitude: donorlocation.lat !== 0 ? donorlocation.lat : 17.385,
    longitude: donorlocation.long !== 0 ? donorlocation.long : 78.4867,
    zoom: 12.6,
    width: "100%",
    height: "100%",
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  setMarkers([donorlocation, ...requests]);

  const handleClick = async (e) => {
    const { lng, lat } = e.lngLat;
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
        { params: { access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN } }
      );
      const place = response.data.features[0];
      setSelectedPlace({
        longitude: lng,
        latitude: lat,
        placeName: place.place_name,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const validMarkers = Array.isArray(markers) ? markers : [donorlocation];

  return (
    <div className="page-container">
      <div className="map-container">
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          mapStyle="mapbox://styles/avadootharajeshnetha/clxyegkjt000z01nw8sc1fzym"
          onDblClick={() =>
            setViewport({ ...viewport, zoom: viewport.zoom + 1 })
          }
          doubleClickZoom={false}
          onClick={handleClick}
          className="react-map-gl"
        >
          {selectedPlace && (
            <Popup
              latitude={selectedPlace.latitude}
              longitude={selectedPlace.longitude}
              onClose={() => setSelectedPlace(null)}
              closeOnClick={true}
              anchor="top"
              className="map-popup"
            >
              <div>
                <h4>Place Details</h4>
                <p>{selectedPlace.placeName}</p>
              </div>
            </Popup>
          )}
          {validMarkers.map((marker, index) => (
            <Marker
              key={index}
              latitude={marker.latitude}
              longitude={marker.longitude}
            >
              {index === 0 ? (
                <div
                  className="donor-marker"
                  style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}
                >
                  🏠
                </div>
              ) : (
                <div
                  className="request-marker"
                  style={{
                    color: "blue",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  📍
                </div>
              )}
            </Marker>
          ))}

          <NavigationControl position="bottom-right" />
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Maps;
