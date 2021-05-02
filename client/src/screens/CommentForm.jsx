import React,{useEffect,useMemo,useState} from 'react'
import {Form,Button,Spinner} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {getComment,addComment} from '../actions/comment'


const CommentForm = ({placeId,width}) =>{

    const dispatch = useDispatch();
    const loading = useSelector((state)=> state.comment.loading);
    const isLoading = useMemo(()=> loading, [loading]);
    const userId = JSON.parse(localStorage.getItem('auth'))._id;
    const [form,setForm] = useState({
        content:'',
        creator: userId ,
        place: placeId,
    })

    useEffect(()=>{ 
        dispatch(getComment(placeId));
    },[dispatch])

    const onChangeHandler = (e) =>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]: value,
            createdAt: Date.now()
        })
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(addComment(form));
        setForm({
            ...form,
            content:'',
        })
    }

    return(
        <div className="mb-3" style={{width:width*0.7}}>
        <Form onSubmit={onSubmitHandler}>
            <Form.Control value={form.content} placeholder="Leave a comment..." name="content" as='textarea' row='4' onChange={onChangeHandler} />
            <Button className="my-3" style={{backgroundColor:'rgb(241, 196, 15)',borderColor:'rgb(241, 196, 15)'}} type="submit">
                {
                    isLoading ?
                    <Spinner animation="border" variant="primary"  role="status">
                        <span className="sr-only" >Loading...</span>
                    </Spinner>  
                    :
                    'Submit'
                }
            </Button>
        </Form>
        </div>
    )
}


export default CommentForm;