import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import {adminAddUsers} from '../actions/user'

const UserForm = () =>{
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        fullName:'',
        username: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
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
        dispatch(adminAddUsers(form));
        setForm({
            fullName:'',
            username: '',
            password: '',
            confirmPassword: '',
            isAdmin: false,
        })
    }

    return(
        <div className="d-flex flex-column align-items-center">
        <h3>Add User</h3>
        <Form className="ml-5 " onSubmit={onSubmitHandler}>
            <Form.Control className="mt-2" placeholder="your full name" type="text" name="fullName"  value={form.fullName} onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="username"  type="text" name="username"  value={form.username} onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="password"  type="password" name="password"  value={form.password} onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="confirm Password"  type="password" name="confirmPassword"  value={form.confirmPassword} onChange={onChangeHandler} />
            <Form.Check 
                className="my-3"
                name="switch"
                type="switch"
                id="custom-switch"
                label="Admin"
                checked ={form.isAdmin}
                onChange={()=> setForm({...form, isAdmin: !form.isAdmin})}
            />
            <Button className="mt-3" type="submit" variant="primary">Create</Button>
        </Form>
        </div>
    )
}

export default UserForm;