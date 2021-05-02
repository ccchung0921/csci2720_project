import React,{useEffect,useMemo} from 'react'
import {Accordion,Card,Spinner,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {getComment} from '../actions/comment'
import CommentForm from './CommentForm'
import moment from 'moment';

const CommentSection = ({placeId,width}) =>{

    const dispatch = useDispatch();
    const comments = useSelector((state)=> state.comment.comments);

    useEffect(()=>{ 
        dispatch(getComment(placeId));
    },[dispatch])

    const getCommentList = () =>{
        return comments.map((comment)=>{
            return (
                <Card className="p-3" key={comment._id}>
                    <Card.Text style={{fontSize:14}} className="text-muted" >{comment.creator.fullName}</Card.Text>
                    <Card.Title style={{fontSize:16}} >{comment.content}</Card.Title>
                    <Card.Text style={{fontSize:14}} className="d-flex justify-content-end text-muted">{moment(comment.createdAt).fromNow()}</Card.Text>

                </Card>
            )
        })
    }

    const numOfComment = useMemo(()=> comments.length,[comments]);

    const commentList = useMemo(()=> getCommentList(),[comments]);

    return(
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Comments ({numOfComment})
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {commentList}
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
            <CommentForm placeId={placeId} width={width} />
        </div>
    )
}


export default CommentSection;