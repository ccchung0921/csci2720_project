import React,{useEffect,useMemo} from 'react';
import {Card} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {getUserComment} from '../actions/comment';
import moment from 'moment';
import {useHistory} from 'react-router-dom';


const UserComment = () =>{
    const dispatch = useDispatch();
    const comments = useSelector((state)=> state.comment.comments);
    const userId = JSON.parse(localStorage.getItem('auth'))._id;
    const history = useHistory();

    useEffect(()=>{
        dispatch(getUserComment(userId));
    },[])

    const getCommentList = () =>{
        return comments.map((comment)=>{
            return(
                <Card  onClick={()=> history.push(`/place/${comment.place._id}`)} className="p-3 textButton" key={comment}>
                    <Card.Title>
                        {comment.place.name}
                    </Card.Title>
                    <Card.Text>
                        {comment.content}
                    </Card.Text>
                    <Card.Text style={{fontSize:13}} className="text-muted d-flex justify-content-end">
                        {moment(comment.createdAt).fromNow()}
                    </Card.Text>
                </Card>
            )
        })
    }

    const commentList = useMemo(()=> getCommentList(),[comments])
   
    return(
        <>
        {commentList}
        </>
    )
}

export default UserComment;