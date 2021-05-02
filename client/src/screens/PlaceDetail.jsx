import React,{useEffect,useCallback} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Map from '../components/Map'
import {Card,Row,Col} from 'react-bootstrap';
import useWindowDimensions from '../hook/useWindowDimensions'
import {MdFavoriteBorder,MdFavorite} from 'react-icons/md'
import {fetchHistoricalTime,fetchHistoricalDays} from '../actions/historical'
import Chart from './Chart'
import DayChart from './DayChart'
import CommentSection from './CommentSection';
import {getFavouritePlaces,AddToFavourite,RemoveFromFavourite} from '../actions/favourite'

const PlaceDetail = () =>{
    const {id} = useParams();
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const places = useSelector((state)=> state.places);
    const hours = useSelector((state)=> state.historical.hours);
    const days = useSelector((state)=> state.historical.days);
    const favourite = useSelector((state)=>state.favourite);
    const filterPlace = places.filter((place)=> place._id === id);
    const place = filterPlace[0];
    const userId = JSON.parse(localStorage.getItem('auth'))._id;

    
    useEffect(()=>{
       dispatch(fetchHistoricalTime(place.name));
    },[dispatch])

    useEffect(()=>{
      dispatch(fetchHistoricalDays(place.name));
    },[dispatch])

    useEffect(()=>{
        dispatch(getFavouritePlaces(userId));
    },[dispatch])

    const matchFavourite = useCallback((id)=> favourite.places.filter((place)=>place._id === id).length > 0,[favourite.places]);

    return(
        <div className="d-flex flex-column align-items-center my-4" >
            <Map places={filterPlace} />
            <Card className="my-4 p-3" style={{width : width*0.6}}>
                <Card.Title>    
                    <div className="d-flex justify-content-between">
                        {place && place.name}
                        {
                        matchFavourite(place._id)?
                        <MdFavorite className="logoButton mr-3" color="red" size={24} onClick={()=>dispatch(RemoveFromFavourite(userId,{'placeId': place._id}))}/>
                            :
                        <MdFavoriteBorder className="logoButton mr-3" color="red" size={24} onClick={()=>dispatch(AddToFavourite(userId,{'placeId': place._id}))}/>
                        }
                    </div>
                </Card.Title>
                <Card.Body>
                    <Row>
                        <Col sm={7}>
                            <Card.Text className="font-weight-bold">
                               Waiting Time
                            </Card.Text>
                        </Col>
                        <Col sm={5}>
                            <Card.Text className="d-flex justify-content-end">
                                {place && place.waiting_time}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                            <Card.Text className="font-weight-bold">
                               Update Time
                            </Card.Text>
                        </Col>
                        <Col sm={5}>
                            <Card.Text className="d-flex justify-content-end">
                                {place && place.updateTime}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Chart graphData={hours} title="Waiting time in the past 10 hours"/>
            <DayChart graphData={days} title="Waiting time in this hour of past 7 days"/>
            <CommentSection placeId={place._id} width={width}/>
        </div>
    )
}

export default PlaceDetail;