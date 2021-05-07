import React,{useState,useEffect} from 'react';
import {Form,Button, Alert} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {adminUpdateUser} from '../actions/user'

const UserUpdate = ({currentId}) =>{
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.users.find((user)=> user._id === currentId));
    const [form,setForm] = useState({
        fullName:'',
        username: '',
        isAdmin: false,
    })

    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState(null);

    useEffect(()=>{
        setForm({
            ...form,
            fullName: user.fullName,
            username: user.username,
            isAdmin: user.isAdmin,
        })
    },[currentId])

    const onChangeHandler = (e) =>{
        const {value,name} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const passwordHandler = (e) =>{
        const {value} = e.target;
        setPassword(value);
     }

    const confirmPasswordHandler = (e) =>{
       const {value} = e.target;
       setConfirmPassword(value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if (confirmPassword.length > 0 && confirmPassword !== password){
            setError('Password does not match');
            return;
        }
        dispatch(adminUpdateUser(currentId, password.length > 0 ? {...form, password} : form));
        setError(null);
        setPassword('');
        setConfirmPassword('');
    }

    return(
        <div className="d-flex flex-column align-items-center">
        <h3>Update User</h3>
        <Form className="ml-5 " onSubmit={onSubmitHandler}>
        <Form.Control className="mt-2" placeholder="your full name" type="text" name="fullName"  value={form.fullName} onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="username"  type="text" name="username"  value={form.username} onChange={onChangeHandler} />
            <Form.Control className="mt-2" placeholder="password"  type="password" name="password"  value={password} onChange={passwordHandler} />
            <Form.Control className="mt-2" placeholder="confirm Password"  type="password" name="confirmPassword"  value={confirmPassword} onChange={confirmPasswordHandler} />
            <Form.Check 
                className="my-3"
                name="switch"
                type="switch"
                id="custom-switch"
                label="Admin"
                checked ={form.isAdmin}
                onChange={()=> setForm({...form, isAdmin: !form.isAdmin})}
            />
            <Button className="mt-3" type="submit" variant="primary">Update</Button>
        </Form>
        {error != null? <Alert variant="danger">{error}</Alert>: null}
        </div>
    )
}

export default UserUpdate;