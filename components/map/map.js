import React, { useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Marker,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 43.6532,
  lng: -79.3832,
}

const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
  ],
}

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
}

function Map({ onError }) {
  const [dailyStats, setDailyStats] = useState([])

  function createKey(location) {
    return location.lat + location.lon
  }

  function createLocation(location) {
    return { lat: location.lat, lng: location.lon }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(
    function callback(map) {
      fetch(process.env.NEXT_PUBLIC_API_URL + '/poi')
        .then((res) => res.json())
        .then((result) => {
          setDailyStats(result)
          if (result.error) onError(result.error)

          if (result.length) {
            const bounds = new window.google.maps.LatLngBounds()

            result.forEach((location) => {
              bounds.extend(createLocation(location))
            })

            map.fitBounds(bounds)
          }
          setMap(map)
        })
    },
    [onError]
  )

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {dailyStats.length ? (
        <MarkerClusterer options={options}>
          {(clusterer) =>
            dailyStats.map((location) => (
              <Marker
                key={createKey(location)}
                position={createLocation(location)}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      ) : (
        <></>
      )}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
