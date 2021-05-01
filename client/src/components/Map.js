import React,{useState,useCallback,memo} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import useWindowDimensions from '../hook/useWindowDimensions'
import {Spinner} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

const center = {
  lat: 22.2988,
  lng: 114.1722
};

const Map = ({places}) => {
  const history = useHistory();
  const {width,height} = useWindowDimensions();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBIW-Q2Cse-ggQ7xHJnbQqScUxBQMyIcqM"
  })

  const containerStyle = {
    width: width * 0.5,
    height: height * 0.5
  };

  const [map, setMap] = useState(null)
  const [infoWindow,setInfoWindow] = useState(null)

  const mouseOverHandler = (id) =>{
    setInfoWindow(id)
  }

  const mouseExitHandler = () =>{
    setInfoWindow(null)
  }
  
  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onUnmount={onUnmount}
      >
       { places.map((place)=>(
         <Marker
          onMouseOver = {()=>mouseOverHandler(place._id)}
          onMouseOut = {mouseExitHandler}
          key={place._id}
          position={{lat: place.latitude, lng:place.longitude}}
          onClick={()=>history.push(`/place/${place._id}`)}
           >
          { infoWindow === place._id?
          <InfoWindow position={{lat: place.latitude, lng:place.longitude}}>
           <div className="font-weight-bold">{place.name}</div>
           </InfoWindow>
           :
           null
          }
        </Marker>
           ))}
      </GoogleMap>
  ) :  
  <Spinner animation="border" variant="info"  role="status">
    <span className="sr-only" >Loading...</span>
  </Spinner>
}


export default memo(Map);