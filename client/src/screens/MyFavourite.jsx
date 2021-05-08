import React,{useEffect,useMemo} from 'react';
import {Card,Row,Spinner} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getFavouritePlaces,RemoveFromFavourite} from '../actions/favourite'
import {FaTimes} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';

const MyFavourite = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector((state)=> state.favourite.loading);
    const places = useSelector((state)=> state.favourite.places);
    const userId = JSON.parse(localStorage.getItem('auth'))._id;
    
    useEffect(()=>{
        dispatch(getFavouritePlaces(userId));
    },[dispatch])

    const getPlaceTable = () =>{
        return places.map((place)=>
        (
            <Card className="p-3" key={place._id}>
                <Card.Title className="textButton" onClick={()=>history.push(`/place/${place._id}`, {favourite:true})} >
                    {place.name}
                </Card.Title>
                <Row className="d-flex justify-content-end mr-2" >
                       <FaTimes style={{color:'rgb(241, 196, 15)'}} className="logoButton" onClick={()=> dispatch(RemoveFromFavourite(userId,{'placeId': place._id}))} size={18} />
                </Row>
            </Card>
        ))
    }

    const isEmpty = useMemo(()=>places.length === 0);

    const placeList = useMemo(()=> getPlaceTable(),[places])

    return(
       <>
            {loading ?
            <Spinner animation="border" variant="warning"  role="status">
                            <span className="sr-only" >Loading...</span>
            </Spinner>
                :
            isEmpty?
            <p>No favourites</p>
            :
             placeList
            }
       </>
    )
}


export default MyFavourite;