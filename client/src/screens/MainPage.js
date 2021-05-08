import React,{useEffect,useState,useMemo,useCallback} from 'react';
import {Button,Table,Form,Dropdown,Spinner} from 'react-bootstrap'
import Map from '../components/Map'
import useWindowDimensions from '../hook/useWindowDimensions'
import {getPlaces,getAsc,getDesc,getFilter} from '../actions/place'
import {useDispatch,useSelector} from 'react-redux'
import {GoSearch} from 'react-icons/go'
import {MdFavoriteBorder,MdFavorite} from 'react-icons/md';
import {useHistory} from 'react-router-dom';
import {getFavouritePlaces,AddToFavourite,RemoveFromFavourite} from '../actions/favourite'
import RecordPagination from '../components/Pagination';

const MainPage = () =>{

    const [state,setState] = useState('');
    const history = useHistory();
    const [desc,setDesc] = useState(null);
    const [refresh,setRefresh] = useState(0)
    const {height,width} = useWindowDimensions();
    const dispatch = useDispatch();
    const places = useSelector((state)=> state.places);
    const favourite = useSelector((state)=>state.favourite);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const userId = auth?._id;
    const isAdmin = useMemo(()=> auth != null && auth?.isAdmin);
    const [field,setField] = useState('name');
    const [currentPage,setCurrentPage] = useState(1);
    const recordPerPage = 3;
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentPlaces = places.slice(indexOfFirstRecord,indexOfLastRecord);
    
    useEffect(()=>{
        dispatch(getPlaces());
    },[dispatch,refresh])

    useEffect(()=>{
        dispatch(getFavouritePlaces(userId));
    },[dispatch])

    const matchFavourite = useCallback((id)=> favourite.places.filter((place)=>place._id === id).length > 0,[favourite.places]);

    const getPlaceTable = () => {
        return currentPlaces.map((place,i)=>
         (
            <tr key={place._id} >
                        <td>{i+1}</td>
                        <td className="textButton" onClick={()=>history.push(`/place/${place._id}`, {favourite:matchFavourite(place._id)})}>{place.name}</td>
                        <td>{place.waiting_time}</td>
                        {   favourite.loading ?
                            <Spinner animation="border" variant="info"  role="status">
                                <span className="sr-only" >Loading...</span>
                            </Spinner>
                            :
                            matchFavourite(place._id)?
                            <td><MdFavorite className='logoButton' color="red" onClick={()=> dispatch(RemoveFromFavourite(userId,{'placeId': place._id}))} size={22} /></td>
                            :
                            <td><MdFavoriteBorder className='logoButton' color="red" onClick={()=> dispatch(AddToFavourite(userId,{'placeId': place._id}))}size={22} /></td>
                        }
            </tr>
        )
     )
    }

    const numOfRecords = useMemo(()=> places.length,[currentPlaces]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const placeTable = useMemo(()=> getPlaceTable(),[places,desc,dispatch,favourite.places,currentPlaces]);

    const refreshHandler = () =>{
        setRefresh((prev) => prev + 1)
    }

    const onChangeHandler = (e) =>{ 
        const {value} = e.target;
        setState(value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(getFilter(field, state));
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
                    <Form.Control className="mr-3" as="select" onChange={(e)=> setField(e.target.value)}>
                    <option value="name" selected>Name</option>
                    <option value="waiting_time">Waiting Time</option>
                    </Form.Control>
                    <Form.Control placeholder="Search..." type="text" onChange={onChangeHandler} />
                    <Button className="mx-2" style={{backgroundColor:'rgb(241, 196, 15)',borderColor:'rgb(241, 196, 15)'}} type="submit"><GoSearch /></Button>
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
            <div className="ml-auto mr-auto">Total: {numOfRecords} {numOfRecords > 1 ? 'hospitals':'hospital'}</div>
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
            <RecordPagination totalRecords={places.length} recordPerPage={recordPerPage} paginate={paginate} />
           <div>Last updated at {places.length > 0 ? places[0].updateTime : null}</div> 
          { isAdmin && <Button variant="success" className="my-4 mb-4" onClick={refreshHandler} >Refresh</Button> }
       </div>
    )
}

export default MainPage;