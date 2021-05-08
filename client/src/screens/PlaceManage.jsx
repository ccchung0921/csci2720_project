import React,{useEffect,useMemo,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Card,Row,Col} from 'react-bootstrap';
import {adminGetPlaces,adminDeletePlace} from '../actions/place';
import {IoTrashBinSharp} from 'react-icons/io5';
import {GrUpdate} from 'react-icons/gr';
import {MdAddCircle} from 'react-icons/md';
import PlaceForm from './PlaceForm';
import PlaceUpdate from './PlaceUpdate';
import useWindowDimensions from '../hook/useWindowDimensions'

const PlaceManage = () =>{
    const [currentId,setCurrentId] = useState(null);
    const {width} = useWindowDimensions();
    const [visible,setVisible] = useState(false)
    const dispatch = useDispatch();
    const places = useSelector((state)=> state.places);

    useEffect(()=>{
        dispatch(adminGetPlaces());
    },[dispatch])


    const getPlaceTable = () =>{
        return places.map((place)=>(
            <Card className="p-3" style={{minWidth:width*0.25}} key={place._id}>
                <Card.Title className="font-weight-bold">
                    {place.name}
                </Card.Title>
                <Card.Body>
                    <Row>
                        <Col className="font-weight-bold" sm={5}>
                            latitude
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                        {place.latitude}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="font-weight-bold" sm={5}>
                            longitude
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                        {place.longitude}
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end mr-2" >
                       <GrUpdate className="logoButton mr-3" onClick={()=>setCurrentId(place._id)} size={24}  />
                       <IoTrashBinSharp className="logoButton" onClick={()=>dispatch(adminDeletePlace(place._id))} size={24} color='orange' />
                    </Row>
                </Card.Body>
            </Card>
        ))
    }

    const placeTable = useMemo(()=> getPlaceTable(),[places]);

    return(
        <>
        <div style={{width:width*0.65}} className="d-flex justify-content-around">
        <div>
        <MdAddCircle color='rgb(241, 196, 15)' size={30} className="logoButton mb-3" onClick={()=> setVisible(!visible)}/>
       {placeTable}
       </div>
             <div className="d-flex flex-column">
                {visible ? <PlaceForm /> : null}
                {currentId && <PlaceUpdate  currentId={currentId} />}
            </div>
       </div>
       </>
    )
}

export default PlaceManage