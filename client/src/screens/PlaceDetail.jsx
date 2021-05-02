import React,{useEffect} from 'react';
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


const PlaceDetail = ({location}) =>{
    const {id} = useParams();
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const places = useSelector((state)=> state.places);
    const hours = useSelector((state)=> state.historical.hours);
    const days = useSelector((state)=> state.historical.days);
    const filterPlace = places.filter((place)=> place._id === id);
    const place = filterPlace[0];

    useEffect(()=>{
       dispatch(fetchHistoricalTime(place.name));
    },[dispatch])

    useEffect(()=>{
      dispatch(fetchHistoricalDays(place.name));
    },[dispatch])

    return(
        <div className="d-flex flex-column align-items-center my-4" >
            <Map places={filterPlace} />
            <Card className="my-4 p-3" style={{width : width*0.6}}>
                <Card.Title>    
                    <div className="d-flex justify-content-between">
                        {place && place.name}
                        {location.state.favourite?
                        <MdFavorite className="logoButton mr-3" color="red" size={24} onClick={()=>console.log('yo')}/>
                            :
                        <MdFavoriteBorder className="logoButton mr-3" color="red" size={24} onClick={()=>console.log('yo')}/>
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