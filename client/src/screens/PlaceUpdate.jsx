import React,{useState,useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {adminUpdatePlace} from '../actions/place'

const PlaceUpdate = ({currentId}) =>{
    const dispatch = useDispatch();
    const place = useSelector((state)=> state.places.find((place)=> place._id === currentId));
    const [form,setForm] = useState({
        name:'',
        latitude: null,
        longitude: null,
    })

    useEffect(()=>{
        setForm({
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
        })
    },[currentId])

    const onChangeHandler = (e) =>{
        const {value,name} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(adminUpdatePlace(currentId,form));
    }

    return(
        <div className="d-flex flex-column align-items-center">
        <h3>Update Place</h3>
        <Form className="ml-5 " onSubmit={onSubmitHandler}>
            <Form.Control className="mt-2" placeholder="name..." name="name" value={form.name}  onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="latitude" step="0.00000001" value={form.latitude}type="number" name="latitude"  onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="longitude" step="0.00000001" value={form.longitude} type="number" name="longitude"  onChange={onChangeHandler} />
            <Button className="mt-3" type="submit" variant="primary">Update</Button>
        </Form>
        </div>
    )
}

export default PlaceUpdate;