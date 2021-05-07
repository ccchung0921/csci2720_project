import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import {adminAddPlaces} from '../actions/place'

const PlaceForm = () =>{
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        name:'',
        latitude: null,
        longitude: null,
    })

    const onChangeHandler = (e) =>{
        const {value,name} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(adminAddPlaces(form));
        setForm({
            name:'',
            latitude: null,
            longitude: null,
        })
    }

    return(
        <div className="d-flex flex-column align-items-center">
        <h3>Add Place</h3>
        <Form className="ml-5 " onSubmit={onSubmitHandler}>
            <Form.Control className="mt-2" placeholder="name..." name="name"  onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="latitude" step="0.00000001" type="number" name="latitude"  onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="longitude" step="0.00000001" type="number" name="longitude"  onChange={onChangeHandler} />
            <Button className="mt-3" type="submit" variant="primary">Create</Button>
        </Form>
        </div>
    )
}

export default PlaceForm;