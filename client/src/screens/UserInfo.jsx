import React,{useEffect} from 'react';
import {Card,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {getUserInfo} from '../actions/auth'

const UserInfo = ({width}) =>{
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem('auth'))._id;
    const userInfo = useSelector((state)=> state.auth.userInfo);

   
    useEffect(()=>{
        dispatch(getUserInfo(userId));
    },[dispatch])

    return(
        <>
            <Card style={{width: width*0.7}} className="p-3">
                <Card.Title>{userInfo && userInfo.username}</Card.Title>
                <Row>
                    <Col sm={8}>
                        <Card.Text>full name</Card.Text>
                    </Col>
                    <Col sm={4}>
                        <Card.Text>{userInfo && userInfo.fullName}</Card.Text>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default UserInfo