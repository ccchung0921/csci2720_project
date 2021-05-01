import React,{useEffect,useState,useMemo} from 'react';
import {Button,Table,Form,Dropdown} from 'react-bootstrap'
import Map from '../components/Map'
import useWindowDimensions from '../hook/useWindowDimensions'
import {getPlaces,getAsc,getDesc,getFilter} from '../actions/place'
import {useDispatch,useSelector} from 'react-redux'
import {GoSearch} from 'react-icons/go'
import {MdFavoriteBorder,MdFavorite} from 'react-icons/md';
import {useHistory} from 'react-router-dom';

const MainPage = () =>{

    const [state,setState] = useState('');
    const history = useHistory();
   // const [filter,setFilter] = useState(null);
    const [desc,setDesc] = useState(null);
    const {height,width} = useWindowDimensions();
    const dispatch = useDispatch();
    const places = useSelector((state)=> state.places);
   
    useEffect(()=>{
        dispatch(getPlaces());
    },[dispatch])

    const getPlaceTable = () => {
        return places.map((place,i)=>
        (
            <tr key={place._id} onClick={()=>history.push(`/place/${place._id}`)}>
                        <td>{i+1}</td>
                        <td>{place.name}</td>
                        <td>{place.waiting_time}</td>
                        <td><MdFavoriteBorder className='logoButton' size={22} /></td>
            </tr>
        ) 
     )
    }
    
    const placeTable = useMemo(()=> getPlaceTable(),[places,desc,dispatch]);

    const onChangeHandler = (e) =>{
        const {value} = e.target;
        setState(value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(getFilter(state));
    }
    
    const asc = () =>{
        dispatch(getAsc())
        setDesc(false);
    }

    const descending = () =>{
        dispatch(getDesc())
        setDesc(true);
    }

    return( 
        <div style={{height:height}} className="d-flex flex-column align-items-center my-4">
            <Map places={places}/>
            <div className="d-flex my-4">
                <Form className='d-flex' onSubmit={onSubmitHandler}>
                    <Form.Control placeholder="Search..." type="text" onChange={onChangeHandler} />
                    <Button className="mx-2" variant="primary" type="submit"><GoSearch /></Button>
                </Form>
                <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Sort {desc != null ? desc ? 'Name Z-A' : 'Name A-Z' : ''}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={asc}>Name A-Z</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={descending}>Name Z-A</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div>
            <Table style={{width:width*0.7}} className="my-4" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hospital Name</th>
                        <th>Waiting Time</th>
                        <th>Favourite</th>
                    </tr>
                </thead>
                <tbody>
                    {placeTable}
                </tbody>
            </Table>
           <div>Last updated at {places.length > 0 ? places[0].updateTime : null}</div> 
       </div>
    )
}

export default MainPage;